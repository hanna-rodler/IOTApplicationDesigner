import { generateRandomString, generateRandPosition } from "../utils/utils.mjs";

export default class StaticMapping {
    constructor(mapping, reportTopic=undefined) {
        this.type = 'mapping';
        if(mapping.data !== undefined) {
            // export case
            this.data = {
                nodeType: mapping.data.nodeType,
                message: mapping.data.message,
                mapped_message: mapping.data.mapping,
                qos: mapping.data.qos,
                retain: mapping.data.retain
            }
            this.id = mapping.id;
            this.position = mapping.position;
            this.commandTopic = undefined,
            this.reportTopic = undefined
        } else {
            // import case
            this.data = {
                nodeType: 'static',
                message: mapping.message_mapping.message,
                mapping: mapping.message_mapping.mapped_message,
                qos: mapping.qos !== undefined ? mapping.qos : '',
                retain: mapping.retain !== undefined ? mapping.retain : ''
            }        
            this.id = 'static_'+generateRandomString(10);
            this.position = mapping.position !== undefined ? mapping.position : generateRandPosition();
            this.commandTopic = mapping.mapped_topic;
            this.reportTopic = reportTopic !== undefined ? reportTopic : ''; // save report topic to map imports later
        }
    }

    display(){
        console.log('static Mapping', this);
    } 

    getMappingForImport() {
        return {
            id: this.id,
            data: {
                nodeType: this.data.nodeType,
                message: this.data.message,
                mapping: this.data.mapping,
                qos: this.data.qos,
                retain: this.data.retain,
            },
            type: this.type,
            position: this.position
        };
    }

    getMappingForExportWithoutPosition() {
        return {
            id: this.id,
            data: {
                nodeType: this.nodeType,
                message: this.data.message,
                mapped_message: this.data.mapped_message,
                qos: this.data.qos,
                retain: this.data.retain,
            }
        }
    }

}