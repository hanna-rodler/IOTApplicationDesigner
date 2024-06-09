export default class StaticMapping {
    constructor(mapping, reportTopic) {
        this.nodeType = 'static';
        this.message = mapping.message_mapping.message;
        this.mapped_message = mapping.message_mapping.mapped_message;
        this.qos = mapping.qos !== undefined ? mapping.qos : '';
        this.retain = mapping.retain !== undefined ? mapping.retain : '';
        this.type = 'mapping';
        this.position = {x: 100, y: 100};
        this.commandTopic = mapping.mapped_topic;
        this.reportTopic = reportTopic;
        this.id = 'static_'+this.commandTopic + '_' + this.reportTopic;
    }

    display(){
        console.log('static Mapping', this);
    } 

    getMapping() {
        return {
            id: this.id,
            nodeType: this.nodeType,
            message: this.message,
            mapped_message: this.mapped_message,
            qos: this.qos,
            retain: this.retain,
            type: this.type,
            position: this.position
        };
    }
}