import {useCallback, useState} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';
import {FiBox} from "react-icons/fi";
import {FaCode} from "react-icons/fa6";
import {LuFileJson2} from "react-icons/lu";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";



const reportIndent = {top: 80};

const isConnectable = true;

function MappingNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [mapping, setMapping] = useState(data.mapping);
    const [message, setMessage] = useState(data.message);
    const [qos, setQos] = useState(data.qos);
    const [retain, setRetain] = useState(data.retain);
    const [isTrueRetain, setTrueRetain] = useState(data.retain);
    const [supression, setSupression] = useState(data.supressions);
    const [isSupressionNeeded, setIsSupressionNeeded] = useState(false);

    // validateSupression(supression);
    function validateSupression(supr) {
        if (supr.isEmpty || supr === '') {
            setSupression("None")
        } else {
            setSupression(supr)
        }
    }


    const onChangeMapping = useCallback((evt) => {
        setMapping(evt.target.value)
    }, []);
    const onChangeMessage = useCallback((evt) => {
        setMessage(evt.target.value)
    }, []);
    const onChangeQos = useCallback((evt) => {
        setQos(evt.target.value)
    }, []);
    const onChangeRetain = useCallback((evt) => {
        setRetain(evt.target.value)
        console.log(retain)
        setTrueRetain(!isTrueRetain)
        console.log(isTrueRetain)
    }, []);
    const onChangeSupression = useCallback((evt) => {
        setSupression(evt.target.value)
    }, []);

    // const changeSelectedRetain = useCallback((evt) => {
    //     setTrueRetain(!isTrueRetain)
    // }, []);

    const onBlurMapping = useCallback((evt) => {
        // const nodeData = [{id: id, mapping: evt.target.value}]
        // Todo: save mapping and message
    }, []);

    const onBlurQos = useCallback((evt) => {
        // Todo: save qos
    }, []);

    const onBlurRetain = useCallback((evt) => {
        // Todo: save retain
    }, []);

    const onBlurSupression = useCallback((evt) => {
        validateSupression(evt.target.value)
        // Todo: save supression
    }, []);

    const deleteNode = useCallback(() => {
        deleteElements({nodes: [{id}]});
        // Todo: delete node
    }, [id, deleteElements]);

    function toggleSupression() {
        setIsSupressionNeeded(!isSupressionNeeded)
    }

    return (
        <div className="w-56 border-t-4 border-primary pb-4 bg-gray-fieldBg rounded-md text-sm">
            <Handle className="bg-accent p-1 left-1"
                    type="target"
                    position={Position.Left}
                    style={reportIndent}
                    id="mappingIn"
                    isValidConnection={(connection) => connection.targetHandle === 'reportTopic'}
            />
            <div>
                <div className="flex text-black rounded-md m-2 text-lg justify-between ">
                    <div className="mt-1">
                        {data.nodeType === "static" &&
                            <FiBox/>
                        }
                        {data.nodeType === "value" &&
                            <FaCode/>
                        }
                        {data.nodeType === "json" &&
                            <LuFileJson2/>
                        }
                    </div>
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
                        {data.nodeType === "static" &&
                            <div>
                                <label htmlFor="Message" className="font-bold"> Message: </label>
                                <input className="nodrag p-1 w-44 border rounded-md" id="mapping" name="mapping"
                                       value={mapping}
                                       onBlur={onBlurMapping} onChange={onChangeMessage}
                                       placeholder="e.g. pressed / on "/>
                                <label htmlFor="MappingMessage" className="font-bold"> Mapped Message: </label>
                                <input className="nodrag p-1 w-44 border rounded-md" id="mapping" name="mapping"
                                       value={message}
                                       onBlur={onBlurMapping} onChange={onChangeMapping}
                                       placeholder="e.g. released / off "/>
                            </div>
                        }
                        {data.nodeType !== "static" &&
                            <div>
                                <label htmlFor="Mapping" className="font-bold"> Mapping: </label>
                                <textarea className="nodrag h-16 p-1 w-44 text-xs border rounded-md" id="mapping"
                                          name="mapping" value={mapping}
                                          onBlur={onBlurMapping} onChange={onChangeMapping}
                                          placeholder="e.g. {% if message <= 8.0 %}on
{% else % }off{% endif %}"/>
                            </div>
                        }
                        {!isSupressionNeeded &&
                            <button className="bg-primary text-white p-1 mt-1 rounded-md w-44" onClick={toggleSupression}> <div className="flex"><RiArrowDownDoubleFill className="m-1"/>Extend Options</div></button>
                        }
                        {isSupressionNeeded &&
                            <div>
                                <div>
                                    <label htmlFor="Supression" className="font-bold"> Supression: </label>
                                    <textarea className="nodrag h-16 p-1 w-44 text-xs border rounded-md" id="supression"
                                              name="supression" value={supression}
                                              onBlur={onBlurSupression} onChange={onChangeSupression}
                                              placeholder=""/>
                                </div>
                                <div>
                                    <label htmlFor="qos" className="font-bold">qos:</label> <br/>
                                    <select className="p-1 w-44 border rounded-md" id="qos" name="qos" value={qos}
                                            onBlur={onBlurQos} onChange={onChangeQos}>
                                        <option disabled selected hidden> - select an option -</option>
                                        <option className="text-xl">0</option>
                                        <option className="text-xl">1</option>
                                        <option className="text-xl">2</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="retain" className="font-bold">retain:</label> <br/>
                                    <select className=" p-1 w-44 border rounded-md" id="retain" name="retain"
                                            value={retain}
                                            onBlur={onBlurRetain} onChange={onChangeRetain}>
                                        <option disabled selected hidden> - select an option -</option>
                                        <option className="text-xl">true</option>
                                        <option className="text-xl">false</option>
                                    </select>
                                </div>
                                <button className="bg-primary text-white p-1 mt-2 rounded-md w-44" onClick={toggleSupression}><div className="flex"> <RiArrowUpDoubleFill className="m-1"/> Reduce Options</div></button>
                            </div>

                        }
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
                    isValidConnection={(connection) => connection.targetHandle === 'commandTopic'}
                />
            </div>
            )
            ;
            }

            export default MappingNode;