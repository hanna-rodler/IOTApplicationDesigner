export default class EdgeOut {
    constructor(mappingId, commandTopic){
        this.id = "reactflow__edge-"+'1'; // TODO generate
        this.source = mappingId;
        this.sourceHandle = 'mappingOut';
        this.target = commandTopic;
        this.targetHandle = 'commandTopic';
    }
}