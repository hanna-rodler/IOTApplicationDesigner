import {useCallback, useState, useRef} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

const handleIndent = {top: 130};
const reportIndent = {top: 80};

const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [nodeName, setNodeName] = useState(data.nodeName);
    const [reportTopic, setReportTopic] = useState(data.reportTopic);
    const [commandTopic, setCommandTopic] = useState(data.commandTopic);
    const [qos, setQos] = useState(data.qos);
    const [subscritpion, setSubscription] = useState(data.subscriptionType);

    const nodeNameRef = useRef(nodeName);
    const reportTopicRef = useRef(reportTopic);
    const commandTopicRef = useRef(commandTopic);
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
        triggerCustomEvent('deleteNode', {
            id: id,
        });
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
    const onChangeCommand = (event) => {
        const value = event.target.value;
        setCommandTopic(value);
        commandTopicRef.current = value;
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

    return (
        <div className="bg-gray-fieldBg rounded-md w-48 text-xs">
            <Handle className="bg-accent p-1 left-1"
                    type="target"
                    position={Position.Left}
                    style={handleIndent}
                    id="commandTopic"
                    isValidConnection={(connection) => connection.sourceHandle === 'mappingOut'}
            />
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
                        <label htmlFor="Command Topic" className="font-bold">Command Topic:</label>
                        <input className="p-1 w-36 border rounded-md" id="commandTopic" name="commandTopic"
                               value={commandTopic} onChange={onChangeCommand} onBlur={updateNode}/>
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