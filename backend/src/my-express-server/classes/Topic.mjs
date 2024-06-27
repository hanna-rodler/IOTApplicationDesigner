import { generateRandomString, getNodeName, generateRandPosition } from "../utils/utils.mjs";

export default class Topic {
    constructor(data, id = undefined, position = undefined) {
        this.id = id !== undefined ? id : 'topic_' + generateRandomString(12);
        // TODO: generate node name from report or command topic of first slash?
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
            reportTopic: data.reportTopic !== undefined ? data.reportTopic : '',
            commandTopic: data.commandTopic !== undefined ? data.commandTopic : [''],
            subscriptionType: data.type !== undefined ? data.type : '',
            qos: data.qos !== undefined ? data.qos : '',
        }
        this.type = 'topic';
        this.position = position !== undefined ? position : generateRandPosition();
    }

    display() {
        console.log('topic ', this);
    }

    getTopicWithoutPositionAndCommandTopic(){
        return {
            id: this.id,
            data: {
                nodeName: this.data.nodeName,
                reportTopic: this.data.reportTopic,
                subscriptionType: this.data.subscriptionType,
                qos: this.data.qos
            },
            type: this.type
        }
    }
}