export default class Topic {
    constructor(reportTopic, qos, subscriptionType, commandTopic = ''){
        this.id = 'topic_'+reportTopic+'_'+commandTopic; // TODO generate
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