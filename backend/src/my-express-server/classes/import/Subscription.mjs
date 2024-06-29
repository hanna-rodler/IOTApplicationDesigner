import StaticMapping from './StaticMapping.mjs';
import ValueJsonMapping from './ValueJsonMapping.mjs';
import Topic from './Topic.mjs';
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
            console.log('static subscription: ', subscription.static);
            const staticMappings = Array.isArray(subscription.static) ? subscription.static : [subscription.static]
            for(let mapping of staticMappings){
                if(Array.isArray(mapping.message_mapping)) {
                    // e.g.
                    // "mapped_topic": "mapping/value",
                    // message_mapping  [
                    //     { message: 'pressed', mapped_message: 'on' },
                    //     { message: 'released', mapped_message: 'off' }
                    //   ]
                    for(let msgMappingObj of mapping.message_mapping) {
                        const tempMapping = {
                            mapped_topic: mapping.mapped_topic,
                            message_mapping: {
                                message: msgMappingObj.message,
                                mapped_message: msgMappingObj.mapped_message,
                                qos: msgMappingObj.qos !== undefined ? msgMappingObj.qos : '',
                                retain: msgMappingObj.retain !== undefined ? msgMappingObj.retain : ''
                            }
                        }
                        this.staticMappings.push(new StaticMapping(tempMapping, this.reportTopic))
                    }
                } else {
                    this.staticMappings.push(new StaticMapping(mapping, this.reportTopic));
                }
                this.commandTopics.push(mapping.mapped_topic);
            }
        }
        if(subscription.json !== undefined) {
            const jsonMappings = Array.isArray(subscription.json) ? subscription.json : [subscription.json]
            // TODO: msgMappingObj wie bei static. + json and value mapping kann wrsl gemerged werden.
            for(let mapping of jsonMappings){
                this.jsonMappings.push(new ValueJsonMapping(mapping, 'json', this.reportTopic));
                this.commandTopics.push(mapping.mapped_topic);
            }
        }
        if(subscription.value !== undefined) {
            const valueMappings = Array.isArray(subscription.value) ? subscription.value : [subscription.value];
            for(let mapping of valueMappings){
                this.valueMappings.push(new ValueJsonMapping(mapping, 'value', this.reportTopic));
                this.commandTopics.push(mapping.mapped_topic);
            }
        }

        this.topic = new Topic({reportTopic: this.reportTopic, qos: this.qos, type: this.type });
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
            renderedMappings.push(mapping.getMappingForImport());
        }
        return renderedMappings;
    }

    getTopicReportTopic() {
        return this.topic.data.reportTopic;
    }

    getTopic(){
        return this.topic;
    }

    getCommandTopics() {
        return this.commandTopics;
    }
}