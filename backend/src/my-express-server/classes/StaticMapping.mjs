import { generateRandomString, generateRandPosition } from "../utils/utils.mjs";

export default class StaticMapping {
    constructor(mapping, reportTopic, id=undefined) {
        this.data = {
            nodeType: 'static',
            mapping: mapping.message_mapping.message,
            mapped_message: mapping.message_mapping.mapped_message,
            qos: mapping.qos !== undefined ? mapping.qos : '',
            retain: mapping.retain !== undefined ? mapping.retain : ''
        }        
        this.type = 'mapping';
        this.position = mapping.position !== undefined ? mapping.position : generateRandPosition();
        this.commandTopic = mapping.mapped_topic;
        this.reportTopic = reportTopic;
        this.id = id !== undefined ? id : 'static_'+generateRandomString(10);
    }

    display(){
        console.log('static Mapping', this);
    } 

    getMapping() {
        return {
            id: this.id,
            data: {
                nodeType: this.data.nodeType,
                message: this.data.message,
                mapped_message: this.data.mapped_message,
                qos: this.data.qos,
                retain: this.data.retain,
            },
            type: this.type,
            position: this.position
        };
    }
}