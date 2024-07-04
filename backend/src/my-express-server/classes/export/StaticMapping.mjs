
export default class StaticMapping {
    constructor(mapping) {
        this.type = 'mapping';
        // export case
        this.nodeType = mapping.data.nodeType;
        this.nodeName = mapping.data.nodeName;
        this.description = mapping.data.description;
        this.message = mapping.data.message;
        this.mapped_message = mapping.data.mapping;
        this.qos = mapping.data.qos;
        this.retain = mapping.data.retain;
        this.id = mapping.id;
        this.position = mapping.position;
    }

    display(){
        console.log('static Mapping', this);
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