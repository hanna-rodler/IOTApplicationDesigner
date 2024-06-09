import StaticMapping from './StaticMapping.mjs';
import ValueJsonMapping from './ValueJsonMapping.mjs';
import Topic from './Topic.mjs';
import EdgeIn from './EdgeIn.mjs';
import EdgeOut from './EdgeOut.mjs';
import {createEdgeIn, createEdgeOut} from './Edges.mjs';

export default class Subscription {
    constructor(subscription, reportTopic){
        this.reportTopic = reportTopic;
        this.qos = subscription.qos !== undefined ? subscription.qos : '';
        this.type = subscription.type !== undefined ? subscription.type : '';

        this.staticMappings = [];
        this.jsonMappings = [];
        this.valueMappings = [];
        this.commandTopics = [];
        if(subscription.static !== undefined) {
            const staticMappings = Array.isArray(subscription.static) ? subscription.static : [subscription.static]
            for(let mapping of staticMappings){
                this.staticMappings.push(new StaticMapping(mapping, this.reportTopic));
                this.commandTopics.push(mapping.mapped_topic);
            }
        }
        if(subscription.json !== undefined) {
            const jsonMappings = Array.isArray(subscription.json) ? subscription.json : [subscription.json]
            for(let mapping of jsonMappings){
                this.jsonMappings.push(new ValueJsonMapping(mapping, 'json', this.reportTopic));
                this.commandTopics.push(mapping.mapped_topic);
            }
        }
        // TODO: json and value mapping kann wrsl gemerged werden.
        if(subscription.value !== undefined) {
            const valueMappings = Array.isArray(subscription.value) ? subscription.value : [subscription.value];
            for(let mapping of valueMappings){
                this.valueMappings.push(new ValueJsonMapping(mapping, 'value', this.reportTopic));
                this.commandTopics.push(mapping.mapped_topic);
            }
        }

        this.topic = new Topic(this.reportTopic, this.qos, this.type);
    }

    display() {
        console.log('Subscription');
        console.log('topic: ', this.topic);
        // console.log('static ', this.staticMappings, ' value ', this.valueMappings, ' json ', this.jsonMappings);
    }

    renderEdges() {
        const renderedEdges = [];
        const mappings = this.getAllMappings();
        for(let mapping of mappings) {
            renderedEdges.push(createEdgeIn(this.topic.id, mapping.id));
            renderedEdges.push(createEdgeOut(mapping.id, mapping.commandTopic));
        }
        return renderedEdges;
    }

    getAllMappings() {
        return this.staticMappings.concat(this.valueMappings, this.jsonMappings);
    }

    renderMappings() {
        const renderedMappings = [];
        const mappings = this.getAllMappings();
        for(let mapping of mappings) {
            renderedMappings.push(mapping.getMapping());
        }
        return renderedMappings;
    }

    getTopicReportTopic() {
        return this.topic.reportTopic;
    }

    getTopic(){
        return this.topic;
    }

    getCommandTopics() {
        return this.commandTopics;
    }
}