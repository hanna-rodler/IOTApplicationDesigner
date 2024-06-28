import {getCommandTopicNumber} from '../../utils/utils.mjs'

export default class Edge {
    constructor(edge) {
        this.source = edge.source;
        this.sourceHandle = edge.sourceHandle;
        this.target = edge.target;
        this.targetHandle = edge.targetHandle;
        this.id = edge.id;
    }

    getHalfMappedEdge() {
        if(this.sourceHandle === 'reportTopic' &&  this.targetHandle === 'mappingIn') {
            // source = topic | target = mapping
            return {
                sourceTopicId: this.source,
                mappingId: this.target
            }
        } else if(this.sourceHandle === 'mappingOut' && this.targetHandle.startsWith('commandTopic')) {
            // source = mapping | target = topic
            return {
                targetTopicId: this.target,
                mappingId: this.source,
                commandTopicNr: getCommandTopicNumber(this.targetHandle)
            }
        }
    }
}