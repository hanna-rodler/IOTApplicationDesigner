import React, {useCallback, useEffect, useState, useRef} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Controls, NodeTypes, ReactFlowProvider, useReactFlow} from "reactflow";
import { useParams } from 'react-router-dom';
import EdgeInput from "../edges/EdgeInput.tsx";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";
import {addSubcollectionItem, getProjects, getSubcollectionItem, getProjectById, getJsonProject } from "../services/api.ts";
import {ThreeDot} from "react-loading-indicators";
import Sidebar from "../components/Sidebar";
import "../styles/project-page.css";
import {generateId} from "../utils/utils.ts";
import {downloadJsonFile} from '../utils/download.ts';

const initialNodes = [
    // Topic Nodes
    {
        id: 'fridgeNode',
        data: {
            nodeName: 'Fridge',
            commandTopic: 'fridge/temperature/set',
            reportTopic: 'fridge/temperature',
            subscriptionTopic: 'test',
            qos: 2,
        },
        type: 'topic',
        position: {x: 200, y: 200},
    },
    {
        id: 'switchNode',
        data: {
            nodeName: 'Switch 1',
            commandTopic: '',
            reportTopic: '',
            subscriptionTopic: '',
            qos: '',
        },
        type: 'topic',
        position: {x: 250, y: 250},
    },
    // Mapping Nodes
    {
        id: 'staticMapping',
        data: {
            nodeType: 'static',
            message: 'released',
            mapping: '0',
            qos: 2,
            retain: true
        },
        type: 'mapping',
        position: {x: 100, y: 100},
    },
    {
        id: 'valueMapping',
        data: {
            nodeType: 'value',
            mapping: '',
            qos: 0,
            retain: false,
        },
        type: 'mapping',
        position: {x: 100, y: 100},
    },
    {
        id: 'jsonMapping',
        data: {
            nodeType: 'json',
            mapping: '',
            qos: 0,
            retain: false,
        },
        type: 'mapping',
        position: {x: 100, y: 100},
    }

];

const initialEdges = [
    {id: '1-2', source: '1', target: '2', label: 'to the', type: 'step'},
    {id: 'test', type: 'edge-input', source: '2', target: 'multiple_Node'},
    {id: 'test2', source: 'node-1', target: 'multiple_Node', targetHandle: "temperatureFridge", sourceHandle: "b"},
];

const nodeTypes: NodeTypes = {
    mapping: MappingNode,
    topic: TopicNode
};

const edgeTypes = {
    'edge-input': EdgeInput,
};

const ProjectPageWithoutReactFlowProvider = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [tabs, setTabs] = useState([{name: 'Tab 1', nodes: initialNodes, edges: initialEdges}]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects(); // TODO: brauchen wir das am Ende noch?
                if(projects.length > 0) {
                    setProjects(projects);
                }
                const project = await getProjectById(projectId);
                console.log('project ', project)
                setSelectedProject(project);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const fetchNodes = async () => {
                console.log("Fetching nodes for project:", selectedProject);
                try {
                    const topics = await getSubcollectionItem(selectedProject._id, 'topics');
                    const mappings = await getSubcollectionItem(selectedProject._id, 'mappings');
                    const edges = await getSubcollectionItem(selectedProject._id, 'edges');

                    setNodes(transformAndCombine(topics, mappings))
                    setEdges(transformObject(edges))
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
                const { width, height, ...rest } = obj[key];
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

            for (const key in nodes) {
                if (nodes[key].type === "topic") {
                    topics.push(nodes[key]);
                }
            }
            for (const key in nodes) {
                if (nodes[key].type === "mapping") {
                    mappings.push(nodes[key]);
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
            await addSubcollectionItem(selectedProject._id, 'edges', edges);

        } catch (error) {
            console.error('Error adding subcollection item:', error);
        }
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const addNewTab = () => {
        const newTabName = prompt("Enter name for the new Cofiguration-Tab:");
        if (newTabName) {
            setTabs((prevTabs) => [...prevTabs, {name: newTabName, nodes: initialNodes, edges: initialEdges}]);
            setActiveTab(tabs.length);
        }
    };

    useEffect(() => {
        const handleDelete = (event) => {
            setNodes(prevNodes => {
                return prevNodes.filter(node => node.id !== event.detail.id);
            });
        };

        window.addEventListener('deleteNode', handleDelete);

        return () => {
            window.removeEventListener('deleteNode', handleDelete);
        };
    }, [selectedProject, nodes, projects]);

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
        
        if(type === 'mapping') {
            if(nodeType === 'value' || nodeType === 'json') {
                newNode.data = {
                    nodeType: nodeType,
                    mapping: '',
                    qos: 0,
                    retain: false
                }
            }
            else if(nodeType === 'static') {
                newNode.data =  {
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
                commandTopic: '',
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

    async function exportProject() {
        console.log('export ', projectId);
        const exportData = await getJsonProject(projectId);
        console.log('export content ', exportData);
        downloadJsonFile(exportData.file, exportData.fileName);
    }

    return (
        <div className="project-page-container">
            <TopBar onAddTab={addNewTab} addButtons={true} onSaveProject={saveItems} onExportProject={exportProject}/>
            <div className="react-flow-container" ref={reactFlowWrapper}>
                {isLoading &&
                    <div className="flex justify-center mt-20">
                        <ThreeDot  color="#038C8C" size="medium" text="Loading data" textColor="" />
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
                >
                    <Controls/>
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    );
}

export default function ProjectPage() {
    return (
        <ReactFlowProvider>
            <ProjectPageWithoutReactFlowProvider />
        </ReactFlowProvider>
    )
}