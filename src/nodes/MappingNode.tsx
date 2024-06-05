import {useCallback} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

import "../styles/multiple-prop-node.css"
import {useDispatch} from "react-redux";
import {setMapping, setNodesState, setQos, setRetain} from "../redux/reducer/nodeSlice.ts";
import {store} from "../redux/store.ts";
import {FiBox} from "react-icons/fi";
import {FaCode} from "react-icons/fa6";
import { LuFileJson2 } from "react-icons/lu";



const reportIndent = {top: 66};


const isConnectable = true;

function MappingNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();

    const dispatch = useDispatch();

    //Todo: Refactor für neuen State
    const onChangeMapping = useCallback((evt) => {
        const nodeData = [{id: id, mapping: evt.target.value}]
        dispatch(setNodesState(nodeData))
        dispatch(setMapping(nodeData))
        console.log(store.getState().nodeStore.nodes)
    }, []);

    const onChangeQos = useCallback((evt) => {
        const nodeData = [{id: id, qos: evt.target.value}]
        dispatch(setQos(nodeData))
        console.log(store.getState().nodeStore.nodes)
    }, []);

    const onChangeRetain = useCallback((evt) => {
        const nodeData = [{id: id, retain: evt.target.value}]
        dispatch(setRetain(nodeData))
        console.log(store.getState().nodeStore.nodes)
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
                    {data.nodeType === "static" &&
                        <FiBox/>
                    }
                    {data.nodeType === "value" &&
                        <FaCode/>
                    }
                    {data.nodeType === "json" &&
                        <LuFileJson2 />
                    }
                    {data.nodeType !== "json" &&
                        <div>{data.nodeType.charAt(0).toUpperCase()
                        + data.nodeType.slice(1)} Mapping
                    </div>
                    }
                    {data.nodeType === "json" &&
                        <div>
                            {data.nodeType.toUpperCase()} Mapping
                        </div>
                    }
                    <div className="delete-node" onClick={deleteNode}>X</div>
                </div>
                <div className="ml-5 mr-5">
                    <div>
                        <label htmlFor="Mapping"> Mapping: </label>
                        {/*Todo: value und json textfield*/}
                        <input className="nodrag h-5 p-1 w-36" id="mapping" name="mapping" onChange={onChangeMapping}
                               placeholder="e.g. on / off "/>
                    </div>
                    <div>
                        <label htmlFor="qos">qos:</label> <br/>
                        <select className="nodrag h-5 p-1 w-36" id="qos" name="qos" onChange={onChangeQos}>
                            <option disabled selected value hidden> - select an option -</option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="retain">retain:</label> <br/>
                        <select className="nodrag h-5 p-1 w-36" id="retain" name="retain" onChange={onChangeRetain}>
                            <option disabled selected value hidden> - select an option -</option>
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