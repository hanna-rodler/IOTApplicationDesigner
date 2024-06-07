import {useCallback, useState} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"

const handleIndent = {top: 114};
const reportIndent = {top: 70};


const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [nodeName, setNodeName] = useState(data.nodeName);

    const changeNodeName = useCallback((evt) =>{
        setNodeName(evt.target.value)
    },[])

    const onBlurReport = useCallback((evt) => {
        const nodeData = {reportTopic: evt.target.value}
    }, []);
    const onBlurCommand = useCallback((evt) => {
        const nodeData = {commandTopic: evt.target.value}
    }, []);

    const deleteNode = useCallback(() => {
    }, [id, deleteElements]);

    return (
        <div className="node-body w-48 border-primary h-32">
            <Handle className="bg-accent p-1 left-1" type="target" position={Position.Left} style={handleIndent}
                    id="commandTopic"/>
            <div>
                <div className="flex p-1 pl-2 rounded-md text-white justify-between bg-primary text-base ">
                    <input className="node-heading bg-primary border-0 w-36" value={nodeName} onChange={changeNodeName}></input>
                    <div className="delete-node" onClick={deleteNode}>X</div>
                </div>
                <div className="node-props m-2">
                    <div>
                        <label htmlFor="Report Topic">Report Topic:</label>
                        <input className="nodrag h-5 p-1 w-36" id="reportTopic" name="reportTopic" onBlur={onBlurReport} />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="Command Topic">Command Topic:</label>
                        <input className="nodrag h-5 p-1 w-36" id="commandTopic" name="commandTopic" onBlur={onBlurCommand} />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="reportTopic"
                style={reportIndent}
                isConnectable={isConnectable}
                className="bg-accent  right-3 p-1"
            />
        </div>
    );
}

export default TopicNode;