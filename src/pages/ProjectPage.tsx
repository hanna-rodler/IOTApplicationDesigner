import {useCallback, useEffect, useRef, useState} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Controls, NodeTypes} from "reactflow";
import EdgeInput from "../edges/EdgeInput.tsx";
import {useDispatch} from "react-redux";
import {setEdgesState} from "../redux/reducer/edgeSlice.ts";
import {store} from "../redux/store.ts";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";
import TabNavigation from "../components/TabNavigation";
import "../styles/project-page.css";
import MappingNode from "../nodes/MappingNode.tsx";
import {addNode} from "../redux/reducer/nodeSlice.ts";

const initialNodes = [
    // Topic Nodes
    {
        id: 'fridgeNode',
        nodeName: 'Fridge',
        type: 'topic',
        position: {x: 200, y: 200},
        commandTopic: '',
        reportTopic: ''
    },
    {
        id: 'switchNode',
        nodeName: 'Switch 1',
        type: 'topic',
        position: {x: 250, y: 250},
        commandTopic: '',
        reportTopic: ''
    },
    // Mapping Nodes
    {
        id: 'staticMapping',
        type: 'mapping',
        nodeType: 'static',
        mapping: '',
        qos: '',
        retain: '',
        position: {x: 100, y: 100},
    },
    {
        id: 'staticMapping',
        type: 'mapping',
        nodeType: 'value',
        mapping: '',
        qos: '',
        retain: '',
        position: {x: 100, y: 100},
    },
    {
        id: 'staticMapping',
        type: 'mapping',
        nodeType: 'json',
        mapping: '',
        qos: '',
        retain: '',
        position: {x: 100, y: 100},
    },

];

const initialEdges = [
    { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
    { id: 'test', type: 'edge-input', source: '2', target: 'multiple_Node' },
    { id: 'test2', source: 'node-1', target: 'multiple_Node', targetHandle: "temperatureFridge", sourceHandle: "b" },
];

const nodeTypes: NodeTypes = {
    mapping: MappingNode,
    topic: TopicNode
};

const edgeTypes = {
    'edge-input': EdgeInput,
};

export const ProjectPage = () => {
    const [tabs, setTabs] = useState([{ name: 'Tab 1', nodes: initialNodes, edges: initialEdges }]);
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setEdgesState(tabs[activeTab].edges));
        console.log(store.getState().edgeStore.edges);
    }, [tabs, activeTab, dispatch]);

    const onNodesChange = useCallback(
        (changes) => setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[activeTab].nodes = applyNodeChanges(changes, prevTabs[activeTab].nodes);
            return updatedTabs;
        }),
        [activeTab],
    );
    const onEdgesChange = useCallback(
        (changes) => setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[activeTab].edges = applyEdgeChanges(changes, prevTabs[activeTab].edges);
            return updatedTabs;
        }),
        [activeTab],
    );
    const onConnect = useCallback(
        (params) => setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[activeTab].edges = addEdge(params, prevTabs[activeTab].edges);
            return updatedTabs;
        }),
        [activeTab],
    );

    const addNewTab = () => {
        const newTabName = prompt("Enter name for the new Cofiguration-Tab:");
        if (newTabName) {
            setTabs((prevTabs) => [...prevTabs, { name: newTabName, nodes: initialNodes, edges: initialEdges }]);
            setActiveTab(tabs.length);
        }
    };

    const deleteTab = (index) => {
        if (tabs.length === 1) {
            alert("You must have at least one Configuration-Tab open.");
            return;
        }
        setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
        if (index === activeTab) {
            setActiveTab(index - 1);
        } else if (index < activeTab) {
            setActiveTab((prevActiveTab) => prevActiveTab - 1);
        }
    };

    const renameTab = (index) => {
        const newTabName = prompt("Enter new name for this Configuration-Tab:");
        if (newTabName) {
            setTabs((prevTabs) => {
                const updatedTabs = [...prevTabs];
                updatedTabs[index].name = newTabName;
                return updatedTabs;
            });
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <TopBar onAddTab={addNewTab} addButton={true} />
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onDeleteTab={deleteTab}
                onRenameTab={renameTab}
            />
            <div className="flex-grow h-[calc(100vh-120px)] w-full relative">
                <ReactFlow
                    nodes={tabs[activeTab].nodes}
                    onNodesChange={onNodesChange}
                    edges={tabs[activeTab].edges}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onConnect={onConnect}
                    fitView
                    edgesUpdatable={true}
                >
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
