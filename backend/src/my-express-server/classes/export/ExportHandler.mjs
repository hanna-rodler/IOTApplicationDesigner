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
        console.log('-- created all maps ---');
        
        this.mappedEdgesWithContents = this.edgesMapper.getMappedEdgesWithContent(this.reactFlowTopics, this.reactFlowMappings);
        // console.log('mapped edges with contents', this.mappedEdgesWithContents);
        console.info('Got mapped edges with content :-----')
        this.renderedTopicLevels = this.renderMappedEdgesAsTopicLevels();
    }

    renderMappedEdgesAsTopicLevels() {
        const topicLevels = [];
        const topicLevelNames = [];

        for(let edge of this.mappedEdgesWithContents) {
            let topicLevel = {};
            //console.log('topc level name', topicLevelName, ' edge ', edge);

            // INIT Variables
            // console.log('edge ', edge);
            let topicLevelName = edge.sourceTopic.reportTopic;
            const sourceTopic = edge.sourceTopic;
            const mapping = edge.mapping;
            const targetTopic = edge.targetTopic;

            // console.log('\n--- LOOKING FOR NAME ', topicLevelName, ' ---- \n');
            const matchingTopicLevelName = findMatchingTopicLevelName(topicLevelName, topicLevelNames);

            if(matchingTopicLevelName !== '') {
                // -- TOPIC LEVEL ALREADY EXISTS
                // add subscription to topicLevel if new mapping type.
                // else add mapping content to mapping type if mapping type already exists
                
                // console.log('matched ', matchingTopicLevelName, ' to ', topicLevelName);
                //console.log('topic Level exists ', topicLevelName, topicLevels);
                
                const existingTopicLevel = getTopicLevel(matchingTopicLevelName, topicLevels);
                let mergedSubscription = {};
                if(topicLevelName === matchingTopicLevelName){
                    // console.log('existing full Topic Level ', existingTopicLevel);
                    mergedSubscription = renderSubscriptionPart(sourceTopic, mapping, targetTopic, existingTopicLevel.subscription);
                } else {
                    topicLevelNames.push(topicLevelName)
                    if ('topic_level' in existingTopicLevel){
                        if(!Array.isArray(existingTopicLevel.topic_level)){
                            // console.log('MAKE ARRAY for ', matchingTopicLevelName);
                            existingTopicLevel.topic_level = [existingTopicLevel.topic_level];
                        }
                        if(isNestedTopicLabel(topicLevelName)){
                            topicLevelName = removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName)
                            // console.log('new topic level name ', topicLevelName);
                            let newTopicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                            // console.log('new topic level ', newTopicLevel );
                            existingTopicLevel.topic_level.push(newTopicLevel);
                        } else {
                            topicLevel.name = topicLevelName;
                            topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                        }
                        // console.log('existing part Topic Level ', existingTopicLevel);
                    } else {
                        // add topic_level to topic. e.g. topic_level has subscription, but not a topic_level.
                        // console.log(' topic level has subscription but not topic level');
                        const subTopicLevelName = topicLevelName.replace(matchingTopicLevelName+'/', '');
                        const newTopicLevel = createNestedTopicLevel(subTopicLevelName, sourceTopic, mapping, targetTopic);
                        existingTopicLevel.topic_level = newTopicLevel;
                    }
                }
                // console.log('merged subscription ', mergedSubscription);
            } else {
                if(isNestedTopicLabel(topicLevelName)) {
                    // console.log('create nested topic label');
                    topicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                    topicLevelNames.push(topicLevelName);
                } else {
                    // console.log('--- new topic level and name');
                    topicLevel.name = topicLevelName;
                    topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                    topicLevelNames.push(topicLevelName);
                    // console.log('push new topicLevel', topicLevel);
                }
                topicLevels.push(topicLevel);
            }
            
            // console.log('topicLevels ', topicLevels);
        }
        return topicLevels;
    }

    renderReactFlowJson(projectName) {
        const reactFlow = {
            projectName: projectName,
            topics: this.reactFlowTopics.renderForReactFlowJson(),
            mappedEdges: renderMappedEdgesForReactFlow(this.mappedEdgesWithContents)
        }
        // console.log('mappedEdges with Contents ', this.mappedEdgesWithContents);
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
            // console.log('static, mappedEdge ', mappedEdge);
            reactFlowMappedEdge.message = mappedEdge.mapping.message;
            reactFlowMappedEdge.mapped_message = mappedEdge.mapping.mapped_message;
        } else {
            // console.log('value / json', mappedEdge);
            reactFlowMappedEdge.mapping = mappedEdge.mapping.mapping;
        }
        mappedEdges.push(reactFlowMappedEdge);
    }
    return mappedEdges;
}


