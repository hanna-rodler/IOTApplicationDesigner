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
            <Handle className="bg-accent  p-1 left-1" type="target" position={Position.Left} style={handleIndent}
                    id="commandTopic"/>
            <div>
                {/*background: #038C8C;*/}
                {/*font-size: 14px;*/}
                {/*padding: 3px 10px;*/}
                {/*border-radius: 4px;*/}
                {/*color: #F8F8F8;*/}
                {/*display: flex;*/}
                {/*justify-content: space-between;*/}
                {/*className="flex text-black rounded-md m-2 text-base justify-between "*/}
                <div className="flex p-1 pl-2 rounded-md text-white justify-between bg-primary text-base ">
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
                className="bg-accent  right-2 p-1"
            />
        </div>
    );
}

export default TopicNode;