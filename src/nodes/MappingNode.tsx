import {useCallback} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"
import {useDispatch} from "react-redux";
import {setCommandTopic, setReportTopic} from "../redux/reducer/nodeSlice.ts";
import {store} from "../redux/store.ts";

const reportIndent = {top: 66};


const isConnectable = true;

function MappingNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();

    const dispatch = useDispatch();

    const onChangeMapping = useCallback((evt) => {
        // const nodeData = [{id: id, reportTopic: evt.target.value}]
        // dispatch(setReportTopic(nodeData))
    }, []);
    const onChangeQos = useCallback((evt) => {
        // const nodeData = [{id: id, commandTopic: evt.target.value}]
        // dispatch(setCommandTopic(nodeData))
        // console.log(store.getState().nodeStore.nodes)
    }, []);
    const onChangeRetain = useCallback((evt) => {
        // const nodeData = [{id: id, commandTopic: evt.target.value}]
        // dispatch(setCommandTopic(nodeData))
        // console.log(store.getState().nodeStore.nodes)
    }, []);

    const deleteNode = useCallback(() => {
        deleteElements({nodes: [{id}]});
    }, [id, deleteElements]);

    return (
        <div className="node-body w-48 border-t-4 border-primary h-40">
            <Handle className="bg-accent p-1 left-1" type="target" position={Position.Left} style={reportIndent}
                    id="mappingIn"/>
            <div>
                <div className="flex text-black rounded-md m-2 text-base justify-between ">
                    <div>{data.nodeType.charAt(0).toUpperCase()
                        + data.nodeType.slice(1)} Mapping</div>
                    <div className="delete-node" onClick={deleteNode}>X</div>
                </div>
                <div className="ml-5 mr-5">
                    <div>
                        <label htmlFor="Mapping"> Mapping: </label>
                        <input className="nodrag h-5 p-1 w-36" id="mapping" name="mapping" onChange={onChangeMapping} />
                    </div>
                    <div>
                        <label htmlFor="qos">qos:</label> <br/>
                        <select className="nodrag h-5 p-1 w-36" id="qos" name="qos" onChange={onChangeQos}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="retain">retain:</label> <br/>
                        <select className="nodrag h-5 p-1 w-36" id="retain" name="retain" onChange={onChangeRetain}>
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="mappingOut"
                style={reportIndent}
                isConnectable={isConnectable}
                className="bg-accent  right-2 p-1"
            />
        </div>
    );
}

export default MappingNode;