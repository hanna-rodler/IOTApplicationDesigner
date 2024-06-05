import {useCallback, useState} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"
import {useDispatch} from "react-redux";
import { updateNode} from "../redux/reducer/nodeSlice.ts";

const handleIndent = {top: 102};
const reportIndent = {top: 65};


const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [nodeName, setNodeName] = useState(data.nodeName);


    const dispatch = useDispatch();

    const changeNodeName = useCallback((evt) =>{
        setNodeName(evt.target.value)
    },[])

    const onChangeReport = useCallback((evt) => {
        const nodeData = {reportTopic: evt.target.value}

        // console.log(id)
        dispatch(updateNode({id: id, newData: nodeData}))
        // dispatch(setReportTopic(nodeData))
    }, []);
    const onChangeCommand = useCallback((evt) => {
        const nodeData = {commandTopic: evt.target.value}
        dispatch(updateNode({id: id, newData: nodeData}))

    }, []);

//TODO: Funktioniert noch nicht für neuen State (grafik weg, node bleibt)
    const deleteNode = useCallback(() => {
        deleteElements({nodes: [{id}]});
        dispatch(deleteNode(id))
    }, [id, deleteElements]);

    return (
        <div className="node-body w-48 border-primary h-32">
            <Handle className="bg-accent  p-1 left-1" type="target" position={Position.Left} style={handleIndent}
                    id="commandTopic"/>
            <div>
                <div className="flex p-1 pl-2 rounded-md text-white justify-between bg-primary text-base ">
                    <input className="node-heading bg-primary border-0 w-36" value={nodeName} onChange={changeNodeName}></input>
                    <div className="delete-node" onClick={deleteNode}>X</div>
                </div>
                <div className="node-props m-2">
                    <div>
                        <label htmlFor="Report Topic">Report Topic:</label>
                        <input className="nodrag h-5 p-1 w-36" id="reportTopic" name="reportTopic" onChange={onChangeReport} />
                    </div>
                    <div>
                        <label htmlFor="Command Topic">Command Topic:</label>
                        <input className="nodrag h-5 p-1 w-36" id="commandTopic" name="commandTopic" onChange={onChangeCommand} />
                    </div>
                    {/*<div>*/}
                    {/*    <input id="commandTopic" name="commandTopic" onChange={onChangeCommand} className="nodrag"/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <button>*/}
                    {/*        +  Add command topic*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="reportTopic"
                style={reportIndent}
                isConnectable={isConnectable}
                className="bg-accent  right-2 p-1"
            />
        </div>
    );
}

export default TopicNode;