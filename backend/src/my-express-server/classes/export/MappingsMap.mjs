import StaticMapping from './StaticMapping.mjs';
import ValueJsonMapping from './ValueJsonMapping.mjs';

export default class MappingsMap {
    constructor(mappings) {
        // remove last element _id (id of subcollection) and make iterable
        const mappingsArray = Object.entries(mappings)
            .filter(([key, value]) => key !== '_id')
            .map(([key, value]) => value);
            
        this.mappings = new Map();
        for(let mapping of mappingsArray) {
            if(mapping.data.nodeType === 'static') {
                let newMapping = new StaticMapping(mapping)
                this.mappings.set(newMapping.id, newMapping);
            }
            if(mapping.data.nodeType === 'value' || mapping.data.nodeType === 'json') {
                let newMapping = new ValueJsonMapping(mapping);
                this.mappings.set(newMapping.id, newMapping)
            }
        }
    }
}