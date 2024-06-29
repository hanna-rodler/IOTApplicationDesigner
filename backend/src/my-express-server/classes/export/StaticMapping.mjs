
export default class StaticMapping {
    constructor(mapping) {
        this.type = 'mapping';
        // export case
        this.nodeType = mapping.data.nodeType,
        this.message = mapping.data.message,
        this.mapped_message = mapping.data.mapping,
        this.qos = mapping.data.qos,
        this.retain = mapping.data.retain,
        this.id = mapping.id;
        this.position = mapping.position;
    }

    display(){
        console.log('static Mapping', this);
    } 

    getMappingWithoutPosition() {
        return {
            id: this.id,
            nodeType: this.nodeType,
            message: this.data.message,
            mapped_message: this.data.mapped_message,
            qos: this.data.qos,
            retain: this.data.retain,
        }
    }

    renderForJson(targetTopic) {
        const staticMapping = {
            mapped_topic: targetTopic.commandTopic,
            message_mapping: {
                message: this.message,
                mapped_message: this.mapped_message,
            }
        };
        if(this.qos !== '') {
            staticMapping.qos = this.qos;
        }
        if(this.retain !== '') {
            staticMapping.retain = this.retain;
        }
    
        return staticMapping;
    }

}