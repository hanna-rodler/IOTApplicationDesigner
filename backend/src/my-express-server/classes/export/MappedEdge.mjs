export default class MappedEdge {
    constructor(mappingId, sourceTopicId, targetTopicId, commandTopicNr) {
        this.mappingId = mappingId;
        this.sourceTopicId = sourceTopicId,
        this.targetTopicId = targetTopicId,
        this.commandTopicNr = commandTopicNr
    }
}