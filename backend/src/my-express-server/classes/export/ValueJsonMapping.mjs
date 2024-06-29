export default class ValueJsonMapping {
    constructor(mapping) {
        this.nodeType = mapping.data.nodeType,
        this.mapping = mapping.data.mapping,
        this.qos = mapping.data.qos,
        this.retain = mapping.data.retain;
        this.id = mapping.id;
        this.type = mapping.type;
        this.position = mapping.position;
        if(mapping.data.suppressions === 'None') {
            this.suppressions = null;    
        } else {
            this.suppressions = mapping.data.suppressions.split(",")
        }
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
        if(this.suppressions !== null) {
            valueJsonMapping.suppressions = this.suppressions;
        }
        return valueJsonMapping;
    }
}