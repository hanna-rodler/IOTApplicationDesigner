import {useCallback} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"
import {useDispatch} from "react-redux";
import {setCommandTopic, setReportTopic} from "../redux/reducer/nodeSlice.ts";
import {store} from "../redux/store.ts";

const handleIndent = {top: 102};
const reportIndent = {top: 65};


const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();

    const dispatch = useDispatch();

    const onChangeReport = useCallback((evt) => {
        const nodeData = [{id: id, reportTopic: evt.target.value}]
        dispatch(setReportTopic(nodeData))
    }, []);
    const onChangeCommand = useCallback((evt) => {
        const nodeData = [{id: id, commandTopic: evt.target.value}]
        dispatch(setCommandTopic(nodeData))
        console.log(store.getState().nodeStore.nodes)
    }, []);

    const deleteNode = useCallback(() => {
        deleteElements({nodes: [{id}]});
    }, [id, deleteElements]);

    return (
        <div className="node-body w-48 border-primary h-32">
            <Handle className="node-target-handle p-1 left-1" type="target" position={Position.Left} style={handleIndent}
                    id="commandTopic"/>
            <div>
                <div className="node-header">
                    <div className="node-heading">{data.nodeName}</div>
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
                className="node-source-handle right-2 p-1"
            />
        </div>
    );
}

export default TopicNode;