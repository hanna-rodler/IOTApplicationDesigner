import {useCallback, useEffect, useRef, useState} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Controls, NodeTypes} from "reactflow";
import EdgeInput from "../edges/EdgeInput.tsx";
import {useDispatch} from "react-redux";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";

const projectId: String = '1';

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
            projectId: projectId,
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

/* TODO: Handle event */

export const ProjectPage = () => {
    const [tabs, setTabs] = useState([{name: 'Tab 1', nodes: initialNodes, edges: initialEdges}]);
    // const [activeTab, setActiveTab] = useState(0);
    const nodesCreated = useRef(false);
    const dispatch = useDispatch();
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState([]);



    // * Log for Debuging * //
    useEffect(() => {
        console.log("Nodes: ")
        console.log(nodes)
    }, [nodes]);



    useEffect(() => {
        window.addEventListener('customEvent', event => {
            setNodes(prevNodes => prevNodes.map(node => {
                if (node.id === event.detail.id) {
                    return {
                        ...node,
                        data: event.detail.data
                    };
                }
                return node;
            }));
        });
    }, []);



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

    // const onNodesChange = useCallback(
    //     (changes) => setNodes((prevTabs) => {
    //         const updatedNodes = [...prevTabs];
    //         updatedNodes = applyNodeChanges(changes, prevTabs[activeTab].nodes);
    //         console.log("Init Nodes: ")
    //         console.log(initialNodes);
    //         return updatedNodes;
    //     }),
    //     [activeTab],
    // );
    // const onEdgesChange = useCallback(
    //     (changes) => setTabs((prevTabs) => {
    //         const updatedTabs = [...prevTabs];
    //         updatedTabs[activeTab].edges = applyEdgeChanges(changes, prevTabs[activeTab].edges);
    //         return updatedTabs;
    //     }),
    //     [activeTab],
    // );
    // const onConnect = useCallback(
    //     (params) => setTabs((prevTabs) => {
    //         const updatedTabs = [...prevTabs];
    //         updatedTabs[activeTab].edges = addEdge(params, prevTabs[activeTab].edges);
    //         return updatedTabs;
    //     }),
    //     [activeTab],
    // );

    const addNewTab = () => {
        const newTabName = prompt("Enter name for the new Cofiguration-Tab:");
        if (newTabName) {
            setTabs((prevTabs) => [...prevTabs, {name: newTabName, nodes: initialNodes, edges: initialEdges}]);
            setActiveTab(tabs.length);
        }
    };
    //
    // const deleteTab = (index: number) => {
    //     if (tabs.length === 1) {
    //         alert("You must have at least one Configuration-Tab open.");
    //         return;
    //     }
    //     setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
    //     if (index === activeTab) {
    //         setActiveTab(index - 1);
    //     } else if (index < activeTab) {
    //         setActiveTab((prevActiveTab) => prevActiveTab - 1);
    //     }
    // };
    //
    // const renameTab = (index: number) => {
    //     const newTabName = prompt("Enter new name for this Configuration-Tab:");
    //     if (newTabName) {
    //         setTabs((prevTabs) => {
    //             const updatedTabs = [...prevTabs];
    //             updatedTabs[index].name = newTabName;
    //             return updatedTabs;
    //         });
    //     }
    // };

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
