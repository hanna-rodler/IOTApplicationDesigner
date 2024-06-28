export default class ValueJsonMapping {
    constructor(mapping) {
        this.nodeType = mapping.data.nodeType,
        this.mapping = mapping.data.mapping,
        this.qos = mapping.data.qos,
        this.retain = mapping.data.retain;
        this.id = mapping.id;
        this.type = mapping.type;
        this.position = mapping.position;
    }

    display(){
        console.log('value json Mapping', this);
    }

    renderForJson(targetTopic) {
        let valueJsonMapping = {
            mapped_topic: targetTopic.commandTopic,
            mapping_template: this.mapping,
        }
        if(this.qos !== '') {
            valueJsonMapping.qos = this.qos;
        }
        if(this.retain !== '') {
            valueJsonMapping.retain = this.retain;
        }
        return valueJsonMapping;
    }
}