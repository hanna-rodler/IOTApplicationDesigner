import {useCallback, useState} from 'react';
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
    const [subscritpion, setSubscription] = useState(data.subscriptionTopic);

    const changeNodeName = useCallback((evt) => {
        setNodeName(evt.target.value)
    }, [])

    const onChangeReport = useCallback((evt) => {
        setReportTopic(evt.target.value)
    }, [])

    const onChangeSubscription = useCallback((evt) => {
        setSubscription(evt.target.value)
    }, [])
    const onChangeQos = useCallback((evt) => {
        setQos(evt.target.value)
        //     Todo: save qos
    }, [])

    const onBlurReport = useCallback((evt) => {
        // const nodeData = {reportTopic: evt.target.value}
        //     Todo: save reportTopic

    }, []);

    const onBlurCommand = useCallback((evt) => {
        //     Todo: save commandTopics
    }, []);

    const onBlurSubscription = useCallback((evt) => {
        // evt.target.value
        //     Todo: save subscription
    }, []);

    const deleteNode = useCallback(() => {
        //     Todo: delete Node from db
    }, [id, deleteElements]);

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
    };

    function handleCommandTopicRemove(index) {
        setCommandTopics((prevCommandTopics) => {
            const updatedCommandTopics = [...prevCommandTopics];
            updatedCommandTopics.splice(index, 1)
            return updatedCommandTopics;
        });
    };


    return (
        <div className="bg-gray-fieldBg rounded-md w-48 text-xs">
            <div>
                <div className="flex w-48 rounded-md text-white justify-between bg-primary text-lg ">
                    <input className="bg-primary border-0 w-40 p-2 rounded-md" value={nodeName}
                           onChange={changeNodeName}></input>


                    <div className=" m-2 " onClick={deleteNode}>X</div>
                </div>
                <div className="node-props m-2 pl-3">
                    <div>
                        <label htmlFor="Report Topic" className="font-bold">Report Topic:</label>
                        <input className="p-1 w-36 border rounded-md" id="reportTopic" name="reportTopic"
                               value={reportTopic} onChange={onChangeReport} onBlur={onBlurReport}/>
                    </div>
                    <div className="mt-2 pb-3">
                        <label htmlFor="Command Topic" className="font-bold">Command Topic: <button
                            onClick={addCommandTopic}><FaPlus/></button></label>
                        {commandTopics.map((topic, index) => (
                            <div>
                                <Handle className="bg-accent p-1 left-1"
                                        type="target"
                                        position={Position.Left}
                                        style={{top: 130 + (26 * index)}}
                                        id={"commandTopic" + index}
                                        isValidConnection={(connection) => connection.sourceHandle === 'mappingOut'}
                                />
                                <input className="p-1 w-36 border rounded-md" name="commandTopic"
                                       id={"commandTopic" + index}
                                       value={topic} onChange={handleCommandTopicChange} onBlur={onBlurCommand}/>
                                <button onClick={() => handleCommandTopicRemove(index)}><FaMinus/></button>
                            </div>
                        ))}
                    </div>
                    <div className="pb-3">
                        <label htmlFor="SubsciptionType" className="font-bold">Subscription Type:</label>
                        <input className="p-1 w-36 border rounded-md" id="subscriptionType" name="subscriptionType"
                               value={subscritpion} onChange={onChangeSubscription} onBlur={onBlurSubscription}/>
                    </div>
                    <div className="pb-3">
                        <label htmlFor="qos" className="font-bold">qos:</label> <br/>
                        <select className="p-1 w-40 border rounded-md " id="qos" name="qos" value={qos}
                                onChange={onChangeQos}>
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
                className="bg-accent  right-3 p-1"
                isValidConnection={(connection) => connection.targetHandle === 'mappingIn'}
            />
        </div>
    );
}

export default TopicNode;