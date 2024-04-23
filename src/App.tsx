import {useCallback, useState} from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextUpdaterNode from './nodes/TextUpdaterNode.tsx';
import './styles/text-updater-node.css'



const initialNodes = [
    {
        id: '1',
        data: {label: 'Hello'},
        position: {x: 0, y: 0},
        type: 'input',
    },
    {
        id: '2',
        data: {label: 'World'},
        position: {x: 100, y: 100},
    },
    {
        id: 'node-1',
        type: 'custom',
        position: {x: 200, y: 200},
        data: {value: 123}
    },

];

const initialEdges = [
    {id: '1-2', source: '1', target: '2', label: 'to the', type: 'step'},
    // {id: '1-2', source: '2', target: 'node-1', label: 'to the', type: 'step'},

];

const nodeTypes: NodeTypes = {
    custom: TextUpdaterNode,
};

function App() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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

    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                fitView
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

export default App;
