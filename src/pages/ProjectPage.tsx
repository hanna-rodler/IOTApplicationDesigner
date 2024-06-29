import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Controls,
    NodeTypes,
    ReactFlowProvider,
    useReactFlow
} from "reactflow";
import {useNavigate, useParams} from 'react-router-dom';
import EdgeInput from "../edges/EdgeInput.tsx";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";

import {
    addSubcollectionItem,
    getJsonProject,
    getProjectById,
    getProjects,
    getSubcollectionItem, updateProjectScreenshot
} from "../services/api.ts";
import {ThreeDot} from "react-loading-indicators";
import Sidebar from "../components/Sidebar";
import {generateId} from "../utils/utils.ts";
import {downloadJsonFile} from '../utils/download.ts';
import html2canvas from "html2canvas";

const nodeTypes: NodeTypes = {
    mapping: MappingNode,
    topic: TopicNode
};

const edgeTypes = {
    'edge-input': EdgeInput,
};

const ProjectPageWithoutReactFlowProvider = () => {
    const {projectId} = useParams<{ projectId: string }>();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {screenToFlowPosition} = useReactFlow();

    const navigate = useNavigate();

    const nodesRef = useRef(nodes);
    const edgesRef = useRef(edges);

    useEffect(() => {
        nodesRef.current = nodes;
    }, [nodes]);

    useEffect(() => {
        edgesRef.current = edges;
    }, [edges]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const project = await getProjectById(projectId);
                console.log('project ', project)
                setSelectedProject(project);
            } catch (error) {
                console.error(`Error fetching project with ID ${projectId}:`, error);
            }
        };
        fetchProject();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects();
                setProjects(projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const fetchNodes = async () => {
                try {
                    const topics = await getSubcollectionItem(selectedProject._id, 'topics');
                    const mappings = await getSubcollectionItem(selectedProject._id, 'mappings');
                    const edges = await getSubcollectionItem(selectedProject._id, 'edges');

                    setNodes(transformAndCombine(topics, mappings));
                    setEdges(transformObject(edges));
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching nodes:', error);
                }
            };
            fetchNodes();
        }
    }, [selectedProject]);

    const transformAndCombine = (topics, mappings) => {
        const transformedTopics = transformObject(topics);
        const transformedMappings = transformObject(mappings);
        return [...transformedTopics, ...transformedMappings];
    };

    const transformObject = (obj) => {
        return Object.keys(obj)
            .filter(key => key !== '_id')
            .map(key => {
                const {width, height, ...rest} = obj[key];
                return rest;
            });
    };

    const updateNodeCollection = async () => {
        if (!selectedProject) {
            console.error('No selected project to update');
            return;
        }
        try {
            const topics = [];
            const mappings = [];

            for (const key in nodesRef.current) {
                if (nodesRef.current[key].type === "topic") {
                    topics.push(nodesRef.current[key]);
                }
            }
            for (const key in nodesRef.current) {
                if (nodesRef.current[key].type === "mapping") {
                    mappings.push(nodesRef.current[key]);
                }
            }
            const addedTopics = await addSubcollectionItem(selectedProject._id, 'topics', topics);
            const addedMappings = await addSubcollectionItem(selectedProject._id, 'mappings', mappings);

            const updatedProjects = projects.map(p => {
                if (p._id === selectedProject._id) {
                    return {
                        ...p,
                        "topics": addedTopics,
                        "mappings": addedMappings
                    };
                }
                return p;
            });
            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error adding subcollection item:', error);
        }
    };

    const updateEdgeCollection = async () => {
        if (!selectedProject) {
            console.error('No selected project to update');
            return;
        }
        try {
            await addSubcollectionItem(selectedProject._id, 'edges', edgesRef.current);
        } catch (error) {
            console.error('Error adding subcollection item:', error);
        }
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({...connection, type: 'smoothstep'}, eds)),
        []
    );

    useEffect(() => {
        const handleDelete = (event) => {
            setNodes(prevNodes => {
                return prevNodes.filter(node => node.id !== event.detail.id);
            });
            saveItems();
        };
        window.addEventListener('deleteNode', handleDelete);
        return () => {
            window.removeEventListener('deleteNode', handleDelete);
        };
    }, [selectedProject, nodes, projects]);

    useEffect(() => {
        const handleUpdate = (event) => {
            setNodes(prevNodes => {
                return prevNodes.map(node => {
                    if (node.id === event.detail.id) {
                        return {
                            ...node,
                            ...event.detail
                        };
                    }
                    return node;
                });
            });
            saveItems();
        };
        window.addEventListener('updateNode', handleUpdate);
        return () => {
            window.removeEventListener('updateNode', handleUpdate);
        };
    }, [nodes]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const nodeType = event.dataTransfer.getData("nodeType");
            const nodeName = event.dataTransfer.getData("nodeName");
            const type = event.dataTransfer.getData("type");

            if (!type || typeof type === 'undefined') return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: generateId(type, nodeType),
                data: {},
                type: type,
                position: position
            };

            if (type === 'mapping') {
                if (nodeType === 'value' || nodeType === 'json') {
                    newNode.data = {
                        nodeType: nodeType,
                        mapping: '',
                        qos: 0,
                        retain: false
                    }
                } else if (nodeType === 'static') {
                    newNode.data = {
                        nodeType: 'static',
                        message: '',
                        mapping: '',
                        qos: 0,
                        retain: false
                    }
                }
            } else if (type === 'topic') {
                newNode.data = {
                    nodeName: nodeName,
                    commandTopic: [''],
                    reportTopic: '',
                    subscriptionTopic: '',
                    qos: 0
                }
            }
            setNodes((nds) => [...nds, newNode]);
            saveItems();
        },
        [screenToFlowPosition]
    );

    function saveItems() {
        updateNodeCollection();
        updateEdgeCollection();
    }

    useEffect(() => {
        saveItems()
    }, [nodes, edges]);
    async function exportProject() {
        console.log('export ', projectId);
        const exportData = await getJsonProject(projectId);
        console.log('export content ', exportData);
        downloadJsonFile(exportData.file, exportData.fileName);
    }

    const addNewTab = () => {
        navigate("/setup");
    };

    const openProject = async () => {
        const element = document.querySelector(".react-flow-container");

        if (element) {
            const screenshot = await html2canvas(element);
            const screenshotDataUrl = screenshot.toDataURL("image/png");

            try {
                await updateProjectScreenshot(projectId, screenshotDataUrl);
                navigate("/projects");
            } catch (error) {
                console.error("Error updating project screenshot URL:", error);
            }
        } else {
            console.error("Element with class 'react-flow-container' not found");
        }
    };

    const editProject = () => {
        navigate(`/setup/${projectId}`);
    }

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Delete') {
            setEdges((eds) => eds.filter(edge => edge.id !== selectedEdgeId));
            saveItems();
        }
    }, [saveItems]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleEdgeClick = (event, edge) => {
        event.stopPropagation();
        setSelectedEdgeId(edge.id);
    };
    return (
        <div className="project-page-container">
            <TopBar onAddTab={addNewTab} onOpenProject={openProject} onEditProject={editProject}
                    addButtons={true} onSaveProject={saveItems} onExportProject={exportProject}/>
            <div className="react-flow-container" ref={reactFlowWrapper}>
                {isLoading &&
                    <div className="flex justify-center mt-20">
                        <ThreeDot color="#038C8C" size="medium" text="Loading data" textColor=""/>
                    </div>}
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    fitView
                    edgesUpdatable={true}
                    onEdgeClick={handleEdgeClick}
                >
                    <Controls/>
                </ReactFlow>
            </div>
            <Sidebar/>
        </div>
    );
}


export default function ProjectPage() {
    return (
        <ReactFlowProvider>
            <ProjectPageWithoutReactFlowProvider/>
        </ReactFlowProvider>
    )
}