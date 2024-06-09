import { generateRandomString } from "../utils/utils.mjs";

export default class Topic {
    constructor(reportTopic, qos, subscriptionType, commandTopic = ''){
        this.id = 'topic_'+generateRandomString(12); // TODO generate
        this.data = {nodeName: 'nodeName'} // TODO: generate;
        this.reportTopic = reportTopic;
        this.commandTopic = commandTopic;
        this.subscriptionType = subscriptionType;
        this.qos = qos;
        this.type = 'topic';
        this.position = {x: 100, y: 150};
    }

    display() {
        console.log('topic ', this);
    }
}