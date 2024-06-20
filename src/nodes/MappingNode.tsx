import {useCallback, useState} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';
import {FiBox} from "react-icons/fi";
import {FaCode} from "react-icons/fa6";
import {LuFileJson2} from "react-icons/lu";


const reportIndent = {top: 80};

const isConnectable = true;

function MappingNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [mapping, setMapping] = useState(data.mapping);
    const [message, setMessage] = useState(data.message);
    const [qos, setQos] = useState(data.qos);
    const [retain, setRetain] = useState(data.retain);
    const [isTrueRetain, setTrueRetain] = useState(data.retain);


    function triggerCustomEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: data,
        });
        window.dispatchEvent(event);
    }

    const onChangeMapping = (event) => {
        setMapping(event.target.value);
    };
    const onChangeMessage = (event) => {
        setMessage(event.target.value);
    };
    const onChangeQos = (event) => {
        setQos(event.target.value);
    };
    const onChangeRetain = (event) => {
        setRetain(event.target.value);
        setTrueRetain(!isTrueRetain)

    };


    const onBlurEvent = () => {
        triggerCustomEvent('customEvent', {
            id: id,
            data: {
                nodeType: data.nodeType,
                message: message,
                mapping: mapping,
                qos: qos,
                retain: retain,
            },
        })

    }

    const deleteNode = useCallback(() => {
        deleteElements({nodes: [{id}]});
        // Todo: delete node
    }, [id, deleteElements]);

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
                                <input className="nodrag p-1 w-44 border rounded-md" id="mapping" name="mapping" value={mapping}
                                       onBlur={onBlurEvent} onChange={onChangeMessage}
                                       placeholder="e.g. pressed / on "/>
                                <label htmlFor="MappingMessage" className="font-bold"> Mapped Message: </label>
                                <input className="nodrag p-1 w-44 border rounded-md" id="mapping" name="mapping" value={message}
                                       onBlur={onBlurEvent} onChange={onChangeMapping}
                                       placeholder="e.g. released / off "/>
                            </div>
                        }
                        {data.nodeType !== "static" &&
                            <div>
                                <label htmlFor="Mapping" className="font-bold"> Mapping: </label>
                                <textarea className="nodrag h-16 p-1 w-44 text-xs border rounded-md" id="mapping"
                                          name="mapping" value={mapping}
                                          onBlur={onBlurEvent} onChange={onChangeMapping}
                                          placeholder="e.g. {% if message <= 8.0 %}on
{% else % }off{% endif %}"/>
                            </div>
                        }
                    </div>
                    <div>
                        <label htmlFor="qos" className="font-bold">qos:</label> <br/>
                        <select className="p-1 w-44 border rounded-md" id="qos" name="qos" value={qos}
                                onBlur={onBlurEvent} onChange={onChangeQos}>
                            <option disabled selected hidden> - select an option -</option>
                            <option className="text-xl">0</option>
                            <option className="text-xl">1</option>
                            <option className="text-xl">2</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="retain" className="font-bold">retain:</label> <br/>
                        <select className=" p-1 w-44 border rounded-md" id="retain" name="retain" value={retain}
                                onBlur={onBlurEvent} onChange={onChangeRetain}>
                            <option disabled selected hidden> - select an option -</option>
                            <option className="text-xl" >true</option>
                            <option className="text-xl" >false</option>
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
                isValidConnection={(connection) => connection.targetHandle === 'commandTopic'}
            />
        </div>
    );
}

export default MappingNode;