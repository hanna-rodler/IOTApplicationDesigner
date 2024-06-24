import React, {useCallback, useEffect, useState, useRef} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Controls, NodeTypes} from "reactflow";
import EdgeInput from "../edges/EdgeInput.tsx";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";
import {addSubcollectionItem, getProjects, getSubcollectionItem} from "../services/api.ts";
import {ThreeDot} from "react-loading-indicators";

const nodeTypes: NodeTypes = {
    mapping: MappingNode,
    topic: TopicNode
};

const edgeTypes = {
    'edge-input': EdgeInput,
};

export const ProjectPage = () => {
    // const [tabs, setTabs] = useState([{name: 'Tab 1', nodes: initialNodes, edges: initialEdges}]);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Create refs for nodes and edges
    const nodesRef = useRef(nodes);
    const edgesRef = useRef(edges);

    // Update refs whenever state changes
    useEffect(() => {
        nodesRef.current = nodes;
    }, [nodes]);

    useEffect(() => {
        edgesRef.current = edges;
    }, [edges]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects();
                setProjects(projects);
                if (projects.length > 1) {
                    setSelectedProject(projects[2]);
                }
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
                const { width, height, ...rest } = obj[key];
                return rest;
            });
    };

    const updateNodeCollection = async () => {
        console.log("Update Nodes", nodesRef.current);
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
        console.log("Update Edges", edgesRef.current);
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
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    );

    const addNewTab = () => {
        const newTabName = prompt("Enter name for the new Configuration-Tab:");
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

    useEffect(() => {
        const handleUpdate = (event) => {
            console.log("Nodes: ", nodes);
            console.log("Event: ", event.detail);
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

    function saveItems() {
        updateNodeCollection();
        updateEdgeCollection();
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <TopBar onAddTab={addNewTab} addButton={true}/>
            <div className="flex-grow h-[calc(100vh-120px)] w-full relative">
                <button className="p-1 bg-primary text-white rounded-md m-2 px-4" onClick={saveItems}>Save to Db</button>
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
                    fitView
                    edgesUpdatable={true}
                >
                    <Controls/>
                </ReactFlow>
            </div>
        </div>
    );
}
