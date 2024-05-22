import {useCallback, useEffect, useState} from "react";
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, NodeTypes} from "reactflow";
import TextUpdaterNode from "../nodes/TextUpdaterNode.tsx";
import EdgeInput from "../edges/EdgeInput.tsx";
import {useDispatch} from "react-redux";
import {setEdgesState} from "../redux/reducer/edgeSlice.ts";
import {store} from "../redux/store.ts";
import TopBar from "../components/TopBar";
import TopicNode from "../nodes/TopicNode.tsx";

const initialNodes = [
    // {
    //     id: '1',
    //     data: {label: 'Hello'},
    //     position: {x: 0, y: 0},
    //     type: 'input',
    // },
    // {
    //     id: '2',
    //     data: {label: 'World'},
    //     position: {x: 100, y: 100},
    // },
    {
        id: 'fridgeNode',
        data: {nodeName: 'Fridge'},
        type: 'topic',
        position: {x: 200, y: 200},
    },
    {
        id: 'switchNode',
        data: {nodeName: 'Switch 1'},
        type: 'topic',
        position: {x: 250, y: 250},
    }

];

const initialEdges = [
    {id: '1-2', source: '1', target: '2', label: 'to the', type: 'step',},
    {id: 'test', type: 'edge-input', source: '2', target: 'multiple_Node'},
    {id: 'test2', source: 'node-1', target: 'multiple_Node', targetHandle: "temperatureFridge", sourceHandle: "b"},

];

const nodeTypes: NodeTypes = {
    custom: TextUpdaterNode,
    topic: TopicNode
};

const edgeTypes = {
    'edge-input': EdgeInput,
};
export const ProjectPage = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setEdgesState(edges))
        console.log(store.getState().edgeStore.edges)

    },[edges])

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return(
        <div style={{height: '100vh', width: '100vw'}}>
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
                <TopBar/>
                <Controls/>
            </ReactFlow>
        </div>
    )
}
