export default class EdgeIn {
    constructor(topicId, mappingId){
        this.id = "reactflow__edge-"+'1'; // TODO generate
        this.source = topicId;
        this.sourceHandle = 'reportTopic';
        this.target = mappingId;
        this.targetHandle = 'mappingIn';
    }
}