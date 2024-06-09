export default class ValueJsonMapping {
    constructor(mapping, nodeType, reportTopic) {
        this.nodeType = nodeType;
        this.mapping = mapping.mapping_template;
        this.qos = mapping.qos !== undefined ? mapping.qos : '';
        this.retain = mapping.retain !== undefined ? mapping.retain : '';
        this.type = 'mapping';
        this.position = {x: 100, y: 100};
        this.commandTopic = mapping.mapped_topic;
        this.reportTopic = reportTopic;
        this.id = this.nodeType + '_' + this.commandTopic + '_' + this.reportTopic;
    }

    display(){
        console.log('static Mapping', this);
    } 

    getMapping() {
        return {
            id: this.id,
            nodeType: this.nodeType,
            mapping: this.mapping,
            qos: this.qos,
            retain: this.retain,
            type: this.type,
            position: this.position
        };
    }
}