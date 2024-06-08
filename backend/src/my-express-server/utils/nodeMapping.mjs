import { renderSubscriptionPart } from './handleSubscription.mjs';
import { getMappedEdgesWithContent } from './handleEdges.mjs';
import { createNestedTopicLevel, isNestedTopicLabel } from './topics/nestedTopics.mjs';
import { makeSingleEntryAccessibleById } from './utils.mjs';
import { removeMatchingTopicLevelNameFromName, findMatchingTopicLevelName, getTopicLevel } from './topics/topics.mjs'

export async function renderMappingsToJson(topics, edges, mappings) {
    try {
      topics = makeSingleEntryAccessibleById(topics);
      mappings = makeSingleEntryAccessibleById(mappings);
      let mappedEdgesWithContents = getMappedEdgesWithContent(edges, topics, mappings);
      // console.log('edgesWithTopicsAndMapping ', mappedEdgesWithContents);
      const topicLevels = renderMappedEdgesAsTopicLevels(mappedEdgesWithContents);
      // console.log('got topic Levels ', topicLevels);
      return topicLevels;
    } catch (error) {
      console.error('Error in renderMappingsToJson:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  }

function renderMappedEdgesAsTopicLevels(mappedEdgesWithContents) {
    const topicLevels = [];
    const topicLevelNames = [];

    for(let edge of mappedEdgesWithContents) {
        let topicLevel = {};
        //console.log('topc level name', topicLevelName, ' edge ', edge);

        // INIT Variables
        let topicLevelName = edge.sourceTopic.reportTopic;
        const sourceTopic = edge.sourceTopic;
        const mapping = edge.mapping;
        const targetTopic = edge.targetTopic;

        console.log('\n--- LOOKING FOR NAME ', topicLevelName, ' ---- \n');
        const matchingTopicLevelName = findMatchingTopicLevelName(topicLevelName, topicLevelNames);

        if(matchingTopicLevelName !== '') {
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
