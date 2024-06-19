import {useCallback, useEffect, useState} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Controls, NodeTypes} from "reactflow";
import EdgeInput from "../edges/EdgeInput.tsx";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";
import {addSubcollectionItem, getProjects, getSubcollectionItem} from "../services/api.ts";

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
            message: 'on',
            mapping: 'pressed',
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
            retain: false
        },
        type: 'mapping',
        position: {x: 100, y: 100},
        mapping: '',
        qos: '',
        retain: ''
    },
    {
        id: 'jsonMapping',
        data: {
            nodeType: 'json',
            mapping: '',
            qos: 0,
            retain: false
        },
        type: 'mapping',
        position: {x: 100, y: 100},
        mapping: '',
        qos: '',
        retain: ''
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


export const ProjectPage = () => {
    const [tabs, setTabs] = useState([{name: 'Tab 1', nodes: initialNodes, edges: initialEdges}]);
    // const [activeTab, setActiveTab] = useState(0);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects();
                setProjects(projects);
                if (projects.length > 0) {
                    setSelectedProject(projects[0]);
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
                    const combinedArray = transformAndCombine(topics, mappings)
                    setNodes(combinedArray)
                } catch (error) {
                    console.error('Error fetching nodes:', error);
                }
            };
            fetchNodes();
        }
    }, [selectedProject]);

    const transformAndCombine = (topics, mappings) => {
        const transformObject = (obj) => {
            return Object.keys(obj)
                .filter(key => key !== '_id')
                .map(key => {
                    const { width, height, ...rest } = obj[key];
                    return rest;
                });
        };

        const transformedTopics = transformObject(topics);
        const transformedMappings = transformObject(mappings);

        return [...transformedTopics, ...transformedMappings];
    };

    const updateNodeCollection = async () => {
        if (!selectedProject) {
            console.error('No selected project to update');
            return;
        }

        console.log("UpdateNodeCollCalled");
        console.log("Selected Project:", selectedProject);

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

    useEffect(() => {
        const handleCustomEvent = (event) => {
            setNodes(prevNodes => {
                return prevNodes.map(node => {
                    if (node.id === event.detail.id) {
                        return {
                            ...node,
                            data: event.detail.data
                        };
                    }
                    return node;
                });
            });
            updateNodeCollection();
        };

        window.addEventListener('customEvent', handleCustomEvent);

        return () => {
            window.removeEventListener('customEvent', handleCustomEvent);
        };
    }, [selectedProject, nodes, projects]);


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

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <TopBar onAddTab={addNewTab} addButton={true}/>
            {/*<TabNavigation*/}
            {/*    tabs={tabs}*/}
            {/*    activeTab={activeTab}*/}
            {/*    setActiveTab={setActiveTab}*/}
            {/*    onDeleteTab={deleteTab}*/}
            {/*    onRenameTab={renameTab}*/}
            {/*/>*/}
            <div className="flex-grow h-[calc(100vh-120px)] w-full relative">
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
