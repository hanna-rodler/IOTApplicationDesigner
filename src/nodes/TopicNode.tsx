import {useCallback, useState, useRef} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';
import {FaMinus, FaPlus} from "react-icons/fa";

const reportIndent = {top: 80};

const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [nodeName, setNodeName] = useState(data.nodeName);
    const [reportTopic, setReportTopic] = useState(data.reportTopic);
    const [commandTopics, setCommandTopics] = useState(data.commandTopic);
    const [qos, setQos] = useState(data.qos);
    const [subscritpion, setSubscription] = useState(data.subscriptionType);

    const nodeNameRef = useRef(nodeName);
    const reportTopicRef = useRef(reportTopic);
    const commandTopicRef = useRef(commandTopics);
    const qosRef = useRef(qos);
    const subscriptionRef = useRef(subscritpion);

    function triggerCustomEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: data,
        });
        window.dispatchEvent(event);
    }
  
    const deleteNode = useCallback(() => {
        if (window.confirm('Are you sure you want to delete this node?')) {
            triggerCustomEvent('deleteNode', {
                id: id,
            });
        }
    }, [id, deleteElements]);

    const updateNode = useCallback(() => {
        triggerCustomEvent('updateNode', {
            id: id,
            data: {
                nodeName: nodeNameRef.current,
                commandTopic: commandTopicRef.current,
                reportTopic: reportTopicRef.current,
                subscriptionType: subscriptionRef.current,
                qos: qosRef.current,
            },
        });
    }, [id]);

    const onChangeReport = (event) => {
        const value = event.target.value;
        setReportTopic(value);
        reportTopicRef.current = value;
    };
    const changeNodeName = (event) => {
        const value = event.target.value;
        setNodeName(value);
        nodeNameRef.current = value;
    };

    const onChangeSubscription = (event) => {
        const value = event.target.value;
        setSubscription(value);
        subscriptionRef.current = value;
    };

    const onChangeQos = (event) => {
        const value = event.target.value;
        setQos(value);
        qosRef.current = value;
    };

    function addCommandTopic() {
        setCommandTopics(prevArr => [...prevArr, ''])
    }

    const handleCommandTopicChange = (evt) => {
        const index = parseInt(evt.target.id.replace('commandTopic', ''), 10);
        const newCommandTopic = evt.target.value;
        setCommandTopics((prevCommandTopics) => {
            const updatedCommandTopics = [...prevCommandTopics];
            updatedCommandTopics[index] = newCommandTopic;
            return updatedCommandTopics;
        });
        const updatedCommandTopics = [...commandTopics];
        updatedCommandTopics[index] = newCommandTopic;
        commandTopicRef.current = updatedCommandTopics;
        updateNode();
    };

    function handleCommandTopicRemove(index) {
        setCommandTopics((prevCommandTopics) => {
            const updatedCommandTopics = [...prevCommandTopics];
            updatedCommandTopics.splice(index, 1)
            return updatedCommandTopics;
        });

        const updatedCommandTopics = [...commandTopics];
        updatedCommandTopics.splice(index, 1)
        commandTopicRef.current =  updatedCommandTopics;
        console.log("HandleRemove Ref: ", commandTopicRef.current)

        updateNode();
    };


    return (
        <div className="bg-gray-fieldBg rounded-md w-48 text-xs">
            <div>
                <div className="flex w-48 rounded-md text-white justify-between bg-primary text-lg ">
                    <input className="bg-primary border-0 w-40 p-2 rounded-md" value={nodeName}
                           onChange={changeNodeName} onBlur={updateNode}></input>
                    <div className="m-2" onClick={deleteNode}>X</div>
                </div>
                <div className="node-props m-2 pl-3">
                    <div>
                        <label htmlFor="Report Topic" className="font-bold">Report Topic:</label>
                        <input className="p-1 w-36 border rounded-md" id="reportTopic" name="reportTopic"
                        value={reportTopic} onChange={onChangeReport} onBlur={updateNode}/>
                    </div>
                    <div className="mt-2 pb-3">
                        <label htmlFor="Command Topic" className="font-bold">Command Topic: <button
                            onClick={addCommandTopic}><FaPlus/></button></label>
                        {commandTopics.map((topic, index) => (
                            <div key={index}>
                                {/* Example of accessing commandTopic as array or object */}
                                {Array.isArray(topic) ? (
                                    topic.map((item, idx) => (
                                        <div key={idx}>
                                            <Handle
                                                className="bg-accent p-1 left-1"
                                                type="target"
                                                position={Position.Left}
                                                style={{ top: 134 + 26 * index }}
                                                id={`commandTopic${idx}`}
                                                isValidConnection={(connection) =>
                                                    connection.sourceHandle === "mappingOut"
                                                }
                                            />
                                            <input
                                                className="p-1 w-36 border rounded-md"
                                                name="commandTopic"
                                                id={`commandTopic${idx}`}
                                                value={item}
                                                onChange={(event) => handleCommandTopicChange(event, idx)}
                                                onBlur={updateNode}
                                            />
                                            <button onClick={() => handleCommandTopicRemove(idx)}>
                                                <FaMinus />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <Handle
                                            className="bg-accent p-1 left-1"
                                            type="target"
                                            position={Position.Left}
                                            style={{ top: 134 + 26 * index }}
                                            id={`commandTopic${index}`}
                                            isValidConnection={(connection) =>
                                                connection.sourceHandle === "mappingOut"
                                            }
                                        />
                                        <input
                                            className="p-1 w-36 border rounded-md"
                                            name="commandTopic"
                                            id={`commandTopic${index}`}
                                            value={topic}
                                            onChange={(event) => handleCommandTopicChange(event, index)}
                                            onBlur={updateNode}                                        />
                                        <button onClick={() => handleCommandTopicRemove(index)}>
                                            <FaMinus />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pb-3">
                        <label htmlFor="SubsciptionType" className="font-bold">Subscription Type:</label>
                        <input className="p-1 w-36 border rounded-md" id="subscriptionType" name="subscriptionType"
                               value={subscritpion} onChange={onChangeSubscription} onBlur={updateNode}/>
                    </div>
                    <div className="pb-3">
                        <label htmlFor="qos" className="font-bold">qos:</label> <br/>
                        <select className="p-1 w-40 border rounded-md" id="qos" name="qos" value={qos}
                                onChange={onChangeQos} onBlur={updateNode}>
                            <option disabled selected value hidden> - select an option -</option>
                            <option className="text-xl">0</option>
                            <option className="text-xl">1</option>
                            <option className="text-xl">2</option>
                        </select>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="reportTopic"
                style={reportIndent}
                isConnectable={isConnectable}
                className="bg-accent right-3 p-1"
                isValidConnection={(connection) => connection.targetHandle === 'mappingIn'}
            />
        </div>
    );
}



export default TopicNode;