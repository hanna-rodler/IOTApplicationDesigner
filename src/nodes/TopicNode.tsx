import {useCallback, useState} from 'react';
import {Handle, NodeProps, Position, useReactFlow} from 'reactflow';

const handleIndent = {top: 130};
const reportIndent = {top: 80};


const isConnectable = true;

function TopicNode({id, data}: NodeProps) {
    const {deleteElements} = useReactFlow();
    const [nodeName, setNodeName] = useState(data.nodeName);

    const changeNodeName = useCallback((evt) =>{
        setNodeName(evt.target.value)
    },[])

    const onBlurReport = useCallback((evt) => {
        const nodeData = {reportTopic: evt.target.value}
    }, []);

    const onBlurCommand = useCallback((evt) => {
        const nodeData = {commandTopic: evt.target.value}
    }, []);

    const onBlurSubscription = useCallback((evt) => {
         // evt.target.value
    }, []);

    const onChangeQos = useCallback((evt) => {
        const nodeData = [{id: id, qos: evt.target.value}]
    }, []);

    const deleteNode = useCallback(() => {
    }, [id, deleteElements]);

    return (
        <div className="bg-gray-fieldBg rounded-md w-48 text-xs">
            <Handle className="bg-accent p-1 left-1" type="target" position={Position.Left} style={handleIndent}
                    id="commandTopic"/>
            <div>
                <div className="flex w-48 rounded-md text-white justify-between bg-primary text-lg ">
                    <input className="bg-primary border-0 w-40 p-2 rounded-md" value={nodeName} onChange={changeNodeName}></input>
                    <div className=" m-2 " onClick={deleteNode}>X</div>
                </div>
                <div className="node-props m-2 pl-3">
                    <div>
                        <label htmlFor="Report Topic" className="font-bold">Report Topic:</label>
                        <input className="p-1 w-36 border rounded-md" id="reportTopic" name="reportTopic" onBlur={onBlurReport} />
                    </div>
                    <div className="mt-2 pb-3">
                        <label htmlFor="Command Topic" className="font-bold">Command Topic:</label>
                        <input className="p-1 w-36 border rounded-md" id="commandTopic" name="commandTopic" onBlur={onBlurCommand} />
                    </div>
                    <div className="pb-3">
                        <label htmlFor="SubsciptionType" className="font-bold">Subscription Type:</label>
                        <input className="p-1 w-36 border rounded-md" id="subscriptionType" name="subscriptionType" onBlur={onBlurSubscription} />
                    </div>
                    <div className="pb-3">
                        <label htmlFor="qos" className="font-bold">qos:</label> <br/>
                        <select className="p-1 w-40 border rounded-md " id="qos" name="qos" onChange={onChangeQos}>
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
            />
        </div>
    );
}

export default TopicNode;