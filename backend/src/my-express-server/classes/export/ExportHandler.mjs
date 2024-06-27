import TopicsMap from './TopicsMap.mjs';
import EdgesMapper from './EdgesMapper.mjs';
import { renderSubscriptionPart } from './handleSubscription.mjs';
import { createNestedTopicLevel, isNestedTopicLabel } from '../../utils/topics/nestedTopics.mjs';
import { removeMatchingTopicLevelNameFromName, findMatchingTopicLevelName, getTopicLevel } from '../../utils/topics/topics.mjs'
import MappingsMap from './MappingsMap.mjs'

export default class MappingLevel {
    constructor(reactFlowTopics, reactFlowEdges, reactFlowMappings) {
        this.reactFlowTopics = new TopicsMap(reactFlowTopics, 'topics');
        this.edgesMapper = new EdgesMapper(reactFlowEdges);
        this.reactFlowMappings = new MappingsMap(reactFlowMappings);
        console.log('edgesMapper ', this.edgesMapper);
        console.log('mappings ', this.reactFlowMappings);
        console.log('-- created all maps ---');
        
        this.mappedEdgesWithContents = this.edgesMapper.getMappedEdgesWithContent(this.reactFlowTopics, this.reactFlowMappings);
        console.log('mapped edges with contents', this.mappedEdgesWithContents);
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

            console.log('\n--- LOOKING FOR NAME ', topicLevelName, ' ---- \n');
            const matchingTopicLevelName = findMatchingTopicLevelName(topicLevelName, topicLevelNames);

            if(matchingTopicLevelName !== '') {
                // -- TOPIC LEVEL ALREADY EXISTS
                console.log('matched ', matchingTopicLevelName, ' to ', topicLevelName);
                // add subscription to topicLevel if new mapping type.
                // else add mapping content to mapping type if mapping type already exists
                //console.log('topic Level exists ', topicLevelName, topicLevels);
                
                const existingTopicLevel = getTopicLevel(matchingTopicLevelName, topicLevels);
                let mergedSubscription = {};
                if(topicLevelName === matchingTopicLevelName){
                    // console.log('existing full Topic Level ', existingTopicLevel);
                    mergedSubscription = renderSubscriptionPart(sourceTopic, mapping, targetTopic, existingTopicLevel.subscription);
                } else {
                    if ('topic_level' in existingTopicLevel){
                        topicLevelNames.push(topicLevelName)
                        if(!Array.isArray(existingTopicLevel.topic_level)){
                            console.log('MAKE ARRAY for ', matchingTopicLevelName);
                            existingTopicLevel.topic_level = [existingTopicLevel.topic_level];
                        }
                        if(isNestedTopicLabel(topicLevelName)){
                            topicLevelName = removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName)
                            console.log('new topic level name ', topicLevelName);
                            let newTopicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                            // console.log('new topic level ', newTopicLevel );
                            existingTopicLevel.topic_level.push(newTopicLevel);
                        } else {
                            topicLevel.name = topicLevelName;
                            topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                            topicLevelNames.push(topicLevelName);
                        }
                        console.log('existing part Topic Level ', existingTopicLevel);
                    } else {
                        console.log(' :////');
                    }
                }
                // console.log('merged subscription ', mergedSubscription);
            } else {
                if(isNestedTopicLabel(topicLevelName)) {
                    console.log('create nested topic label');
                    topicLevel = createNestedTopicLevel(topicLevelName, sourceTopic, mapping, targetTopic);
                    topicLevelNames.push(topicLevelName);
                } else {
                    console.log('--- new topic level and name');
                    // const topicLevel = createTopicLevels(topicLevelName);
                    topicLevel.name = topicLevelName;
                    topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, edge.targetTopic);
                    topicLevelNames.push(topicLevelName);
                    console.log('push new topicLevel', topicLevel);
                }
                topicLevels.push(topicLevel);
            }
            
            // console.log('topicLevels ', topicLevels);
        }
        return topicLevels;
    }
}


