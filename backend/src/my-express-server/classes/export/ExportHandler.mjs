import TopicsMap from './TopicsMap.mjs';
import EdgesMapper from './EdgesMapper.mjs';
import { renderSubscriptionPart } from './handleSubscription.mjs';
import { createNestedTopicLevel, isNestedTopicLabel, removeMatchingTopicLevelNameFromName, findMatchingTopicLevelName, getTopicLevel } from './utils.mjs';
import MappingsMap from './MappingsMap.mjs'

export default class ExportHandler {
    constructor(reactFlowTopics, reactFlowEdges, reactFlowMappings) {
        this.reactFlowTopics = new TopicsMap(reactFlowTopics, 'topics');
        this.edgesMapper = new EdgesMapper(reactFlowEdges);
        this.reactFlowMappings = new MappingsMap(reactFlowMappings);
        
        this.mappedEdgesWithContents = this.edgesMapper.getMappedEdgesWithContent(this.reactFlowTopics, this.reactFlowMappings);
        this.renderedTopicLevels = this.renderMappedEdgesAsTopicLevels();
    }

    renderMappedEdgesAsTopicLevels() {
        const topicLevels = [];
        const topicLevelNames = [];

        for(let edge of this.mappedEdgesWithContents) {
            let topicLevel = {};

            // INIT Variables
            let topicLevelName = edge.sourceTopic.reportTopic;
            const sourceTopic = edge.sourceTopic;
            const mapping = edge.mapping;
            const targetTopic = edge.targetTopic;

            const matchingTopicLevelName = findMatchingTopicLevelName(topicLevelName, topicLevelNames);

            if(matchingTopicLevelName !== '') {
                // -- TOPIC LEVEL ALREADY EXISTS
                // add subscription to topicLevel if new mapping type.
                // else add mapping content to mapping type if mapping type already exists
                
                const existingTopicLevel = getTopicLevel(matchingTopicLevelName, topicLevels);
                let mergedSubscription = {};
                if(topicLevelName === matchingTopicLevelName){
                    mergedSubscription = renderSubscriptionPart(sourceTopic, mapping, targetTopic, existingTopicLevel.subscription);
                } else {
                    topicLevelNames.push(topicLevelName)
                    if ('topic_level' in existingTopicLevel){
                        if(!Array.isArray(existingTopicLevel.topic_level)){
                            existingTopicLevel.topic_level = [existingTopicLevel.topic_level];
                        }
                        if(isNestedTopicLabel(topicLevelName)){
                            topicLevelName = removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName)
                            let newTopicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                            existingTopicLevel.topic_level.push(newTopicLevel);
                        } else {
                            topicLevel.name = topicLevelName;
                            topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                        }
                    } else {
                        // add topic_level to topic. e.g. topic_level has subscription, but not a topic_level.
                        const subTopicLevelName = topicLevelName.replace(matchingTopicLevelName+'/', '');
                        const newTopicLevel = createNestedTopicLevel(subTopicLevelName, sourceTopic, mapping, targetTopic);
                        existingTopicLevel.topic_level = newTopicLevel;
                    }
                }
            } else {
                if(isNestedTopicLabel(topicLevelName)) {
                    topicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                    topicLevelNames.push(topicLevelName);
                } else {
                    topicLevel.name = topicLevelName;
                    topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                    topicLevelNames.push(topicLevelName);
                }
                topicLevels.push(topicLevel);
            }            
        }
        return topicLevels;
    }

    renderReactFlowJson(projectName) {
        const reactFlow = {
            projectName: projectName,
            topics: this.reactFlowTopics.renderForReactFlowJson(),
            mappedEdges: renderMappedEdgesForReactFlow(this.mappedEdgesWithContents)
        }
        return reactFlow;
    }
}

function renderMappedEdgesForReactFlow(mappedEdgesWithContents) {
    const mappedEdges = [];
    for(let mappedEdge of mappedEdgesWithContents) {
        let reactFlowMappedEdge = {
            nodeType: mappedEdge.mapping.nodeType,
            nodeName: mappedEdge.mapping.nodeName,
            description: mappedEdge.mapping.description,
            sourceReportTopic: mappedEdge.sourceTopic.reportTopic,
            targetCommandTopic: mappedEdge.targetTopic.commandTopic,
            position: mappedEdge.mapping.position
        }
        if(mappedEdge.mapping.nodeType === 'static') {
            reactFlowMappedEdge.message = mappedEdge.mapping.message;
            reactFlowMappedEdge.mapped_message = mappedEdge.mapping.mapped_message;
        } else {
            reactFlowMappedEdge.mapping = mappedEdge.mapping.mapping;
        }
        mappedEdges.push(reactFlowMappedEdge);
    }
    return mappedEdges;
}


