import { generateRandomString } from "../utils/utils.mjs";

export default class Topic {
    constructor(data, id = undefined, position = undefined) {
        this.id = id !== undefined ? id : 'topic_' + generateRandomString(12);
        // TODO: generate node name from report or command topic of first slash?
        this.data = {
            nodeName: data.nodeName !== undefined ? data.nodeName : 'nodeName',
            reportTopic: data.reportTopic !== undefined ? data.reportTopic : '',
            commandTopic: data.commandTopic !== undefined ? data.commandTopic : '',
            subscriptionType: data.type !== undefined ? data.type : '',
            qos: data.qos !== undefined ? data.qos : '',
        }
        this.type = 'topic';
        this.posistion = position !== undefined ? position : { x: 100, y: 150 };
    }

    display() {
        console.log('topic ', this);
    }
}