import { renderSubscriptionPart } from './handleSubscription.mjs';
import { getMappedEdgesWithContent } from './handleEdges.mjs';

export async function renderMappingsToJson(topics, edges, mappings) {
    try {
      topics = makeSingleEntryAccessibleById(topics);
      mappings = makeSingleEntryAccessibleById(mappings);
      let mappedEdgesWithContents = getMappedEdgesWithContent(edges, topics, mappings);
      // console.log('edgesWithTopicsAndMapping ', mappedEdgesWithContents);
      const topicLevels = renderMappedEdgesAsTopicLevels(mappedEdgesWithContents);
      console.log('got topic Levels ', topicLevels);
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
        const topicLevel = {};
        // TODO: check if name is already in topicLevels
        // TODO: check if reportTopic has / in names -> aufteilen
        const topicLevelName = edge.sourceTopic.reportTopic;
        if(topicLevelExists(topicLevelNames, topicLevelName)) {
            // add subscription to topicLevel if new mapping type.
            // else add mapping content to mapping type if mapping type already exists
            const existingTopicLevel = getTopicLevel(topicLevelName, topicLevels);
            // call renderSubscriptionPart()
            console.log('existing Topic Level ', existingTopicLevel);
            const mergedSubscription = renderSubscriptionPart(edge.sourceTopic, edge.mapping, edge.targetTopic, existingTopicLevel.subscription);
            console.log('merged subscription ', mergedSubscription);
        } else {
            topicLevel.name = topicLevelName;
            topicLevelNames.push(topicLevelName)
            topicLevel.subscription = renderSubscriptionPart(edge.sourceTopic, edge.mapping, edge.targetTopic);
            topicLevels.push(topicLevel);
        }
        
        // console.log('topicLevel', topicLevel);
    }
    return topicLevels;
}

function topicLevelExists(topicLevelNames, name) {
    // TODO: check for topicLevel on a further down level like test01/button1
    return topicLevelNames.indexOf(name) !== -1;
}

function getTopicLevel(name, topicLevels) {
    for (const topic of topicLevels) {
        if (topic.name === name) {
            return topic;
        }
        if (topic.topic_level) {
            const foundInSublevel = getTopicLevel(name, topic.topic_level);
            if (foundInSublevel) {
                return foundInSublevel;
            }
        }
    }
    return null; 
}


/**
 * Transforms e.g. [
    {
        "id": "button1",
        "nodeName": "button1",
        "reportTopic": "button1",
        "commandTopic": "xyz",
        "subscriptionType": "button1/binary_sensor",
        "qos": 2,
    },
    {
        "id": "setRGB",
        "nodeName": "strip/strip1",
        "reportTopic": "xyz",
        "commandTopic": "rgb/set",
        "qos": '',
        "subscriptionType": '',
    }]
 * to {
    "button1": {
        "nodeName": "button1",
        "reportTopic": "button1",
        "commandTopic": "xyz",
        "subscriptionType": "button1/binary_sensor",
        "qos": 2,
    },
    "setRGB": {
        "nodeName": "strip/strip1",
        "reportTopic": "xyz",
        "commandTopic": "rgb/set",
        "qos": '',
        "subscriptionType": '',
    } }
 * 
 * @param {*} objectsArray 
 * @returns 
 */
function makeSingleEntryAccessibleById(objectsArray){
    return objectsArray.reduce((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
    }, {})
}

