export default class Topic {
    constructor(topic) {
        this.id = topic.id;
        this.nodeName = topic.data.nodeName;
        this.reportTopic = topic.data.reportTopic;
        this.commandTopic = [];
        for(let commandTopic of topic.data.commandTopic) {
            this.commandTopic.push(commandTopic);
        }
        this.subscriptionType = topic.data.subscriptionType;
        this.qos = topic.data.qos;
        this.type = topic.type;
        this.position = topic.position;
    }

    display() {
        console.log('topic ', this);
    }

    getTopicWithoutPositionAndCommandTopic(){
        return {
            id: this.id,
            nodeName: this.nodeName,
            reportTopic: this.reportTopic,
            subscriptionType: this.subscriptionType,
            qos: this.qos,
            type: this.type
        }
    }
}