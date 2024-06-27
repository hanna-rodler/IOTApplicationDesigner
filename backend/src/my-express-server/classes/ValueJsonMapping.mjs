import { generateRandomString, generateRandPosition } from "../utils/utils.mjs";

export default class ValueJsonMapping {
    constructor2(mapping, nodeType, reportTopic) {
        this.nodeType = nodeType;
        this.mapping = mapping.mapping_template;
        this.commandTopic = [mapping.mapped_topic];
        this.reportTopic = reportTopic;
        this.id = this.nodeType + '_' + generateRandomString(11);
    }

    constructor(mapping, nodeType, reportTopic, id = undefined) {
        this.data = {
            nodeType: nodeType,
            mapping: mapping.mapping_template,
            qos: mapping.qos !== undefined ? mapping.qos : '',
            retain: mapping.retain !== undefined ? mapping.retain : ''
        }        
        this.commandTopic = [mapping.mapped_topic];
        this.type = 'mapping';
        this.position = mapping.position !== undefined ? mapping.position : generateRandPosition();
        this.reportTopic = reportTopic;
        this.id = id !== undefined ? id : nodeType+'_'+generateRandomString(10);
    }


    display(){
        console.log('value json Mapping', this);
    } 

    getMappingForImport() {
        return {
            id: this.id,
            data: {
                nodeType: this.data.nodeType,
                mapping: this.data.mapping,
                qos: this.data.qos,
                retain: this.data.retain,
            },
            type: this.type,
            position: this.position
        };
    }
}