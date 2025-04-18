import { generateRandomString, getNodeName, generateRandPosition } from "../../utils/utils.mjs";

export default class Topic {
    constructor(data, id = undefined) {
        this.id = id !== undefined ? id : 'topic_' + generateRandomString(12);
        let name = ''
        if(data.nodeName !== undefined){
            name = data.nodeName
        } else if(data.reportTopic !== undefined) {
            name = getNodeName(data.reportTopic)
        } else if (data.commandTopic !== undefined) {
            name = getNodeName(data.commandTopic[0]);
        }
        this.data = {
            nodeName: name,
            nodeType: data.nodeType !== undefined ? data.nodeType : 'topic',
            reportTopic: data.reportTopic !== undefined ? data.reportTopic : '',
            commandTopic: data.commandTopic !== undefined ? data.commandTopic : [''],
            subscriptionType: data.type !== undefined ? data.type : '',
            qos: data.qos !== undefined ? data.qos : '',
        }
        this.type = 'topic';
        this.position = data.position !== undefined ? data.position : generateRandPosition();
    }

    display() {
        console.log('topic ', this);
    }

    setNodeType(nodeType) {
        this.data.nodeType = nodeType;
    }

    getTopicWithoutPositionAndCommandTopic(){
        return {
            id: this.id,
            data: this.data,
            type: this.type
        }
    }
}