import { generateRandomString, generateRandPosition } from "../../utils/utils.mjs";

export default class ValueJsonMapping {
    constructor(mapping, nodeType, reportTopic, id = undefined) {
        this.data = {
            nodeType: nodeType,
            mapping: mapping.mapping_template,
            qos: mapping.qos !== undefined ? mapping.qos : '',
            retain: mapping.retain !== undefined ? mapping.retain : '',
            suppressions: mapping.suppressions !== undefined ? mapping.suppressions : 'None'
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
            data: this.data,
            type: this.type,
            position: this.position
        };
    }
}