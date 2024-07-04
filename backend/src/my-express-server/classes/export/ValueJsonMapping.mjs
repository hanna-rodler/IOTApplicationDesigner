export default class ValueJsonMapping {
    constructor(mapping) {
        this.nodeType = mapping.data.nodeType;
        this.mapping = mapping.data.mapping;
        this.qos = mapping.data.qos;
        this.retain = mapping.data.retain;
        this.nodeName = mapping.data.nodeName;
        this.description = mapping.data.description;
        this.id = mapping.id;
        this.type = mapping.type;
        this.position = mapping.position;
        if(mapping.data.suppressions === 'None' || mapping.data.suppressions === undefined) {
            this.suppressions = null;    
        } else if (Array.isArray(mapping.data.suppressions)) {
            this.suppressions = mapping.data.suppressions;
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