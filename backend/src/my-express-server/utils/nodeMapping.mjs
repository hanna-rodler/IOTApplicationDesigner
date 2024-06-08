import { renderSubscriptionPart } from './handleSubscription.mjs';
import { getMappedEdgesWithContent } from './handleEdges.mjs';

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
        // TODO: check if name is already in topicLevels
        // TODO: check if reportTopic has / in names -> aufteilen
        let topicLevelName = edge.sourceTopic.reportTopic;
        //console.log('topc level name', topicLevelName, ' edge ', edge);
        const sourceTopic = edge.sourceTopic;
        const mapping = edge.mapping;
        const targetTopic = edge.targetTopic;
        console.log('\n--- LOOKING FOR NAME ', topicLevelName, ' ---- \n');
        const matchingTopicLevelName = findMatchingTopicLevelName(topicLevelName, topicLevelNames)
        if(matchingTopicLevelName !== '') {
            console.log('matched ', matchingTopicLevelName, ' to ', topicLevelName);
            // add subscription to topicLevel if new mapping type.
            // else add mapping content to mapping type if mapping type already exists
            //console.log('topic Level exists ', topicLevelName, topicLevels);
            
            const existingTopicLevel = getTopicLevel(matchingTopicLevelName, topicLevels);
            let mergedSubscription = {};
            if(topicLevelName === matchingTopicLevelName){
                console.log('existing full Topic Level ', existingTopicLevel);
                mergedSubscription = renderSubscriptionPart(sourceTopic, mapping, targetTopic, existingTopicLevel.subscription);
            } else {
                if ('topic_level' in existingTopicLevel){
                    topicLevelNames.push(topicLevelName)
                    // TODO: if already array -> continue somewhere here. kelvin temperature/celius gets rendered correctly. second one: kelvin temperature/kelvin doesn't get rendered correctly.
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
            // TODO: match part of topicLevelName
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

function removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName) {
    // Remove the matchingTopicLevelName from the beginning of topicLevelName
    const modifiedTopicLevelName = topicLevelName.replace(matchingTopicLevelName + '/', '');

    // Remove the first slash from the modifiedTopicLevelName
    const cleanedTopicLevelName = modifiedTopicLevelName.replace(/^\//, '');

    return cleanedTopicLevelName;
}

function createNestedTopicLevel(name, sourceTopic, mapping, targetTopic) {
    let topicLevel = {}
    // create last topic Level, later create upper ones
    const names = name.split("/");
    // initialize last topic level
    topicLevel.name = names[names.length-1];
    names.pop();
    topicLevel.subscription = renderSubscriptionPart(sourceTopic, mapping, targetTopic)
    // console.log('not exists - last topic level ', topicLevel);
    // topic_level [] or {} if topic_level is object
    
    for(let i = names.length-1; i >= 0; i--){
        topicLevel = {
            name: names[i],
            topic_level: topicLevel,
        }
    }
    console.log('created nested topic ', topicLevel);
    return topicLevel;
}

function findMatchingTopicLevelName(name, topicLevelNames) {
    // Split the name into parts
    const nameParts = name.split('/');
    console.log('looking for name ', name, ' in ', topicLevelNames);

    // check for full name
    for (let topic of topicLevelNames) {
        if (name === topic) {
            console.log('full name match found');
            return name; // Return the full name if there is a complete match
        }
    }

    // Iterate through each topic level name in the array
    for (let topic of topicLevelNames) {
        // Split the topic level name into parts
        const topicParts = topic.split('/');

        // Check if the name matches the topic level name
        if (name === topic) {
            console.log('full name match found');
            return name; // Return the full name if there is a complete match
        }

        // Initialize an array to hold the matching parts
        let matchingParts = [];

        // Compare each part
        for (let i = 0; i < nameParts.length && i < topicParts.length; i++) {
            if (nameParts[i] === topicParts[i]) {
                matchingParts.push(nameParts[i]);
            } else {
                break;
            }
        }

        // If any matching parts are found, return the matching part of the name
        if (matchingParts.length > 0) {
            return matchingParts.join('/');
        }
    }

    // If no matches are found, return an empty string
    return '';
}

function getTopicLevel(name, topicLevels) {
    // TODO: right now I think it only itereates through the first level of topic Levels? or if that is iterable? continue here
    console.log('get topic levels ', topicLevels, ' with name ', name, ' length ', topicLevels.length);
    if(Array.isArray(topicLevels) && topicLevels.length > 1) {
        console.log('in array');
        for (const topic of topicLevels) {
            if (topic.name === name) {
                console.log(' matched topic.name = ', name, ' topic: ', topic)
                return topic;
            }
            if (topic.topic_level) {
                if(isNestedTopicLabel(name)){
                    let names = name.split("/");
                    // only cut first part if first parts match
                    if(names[0] === topic.name) {
                        names.shift();
                        name = names.join("/");
                    }
                }
                console.log('looking in subtopic ', topic.topic_level, ' name ', name);
                const foundInSublevel = getTopicLevel(name, topic.topic_level);
                if (foundInSublevel) {
                    return foundInSublevel;
                }
            }
        }
        return null; 
    } else {
        console.log('not iterable');
        let nonIterableTopicLevels = topicLevels;
        if(Array.isArray(topicLevels)) {
            nonIterableTopicLevels = topicLevels[0];
        }
        return findLastMatchingTopicLevelByName(name, nonIterableTopicLevels);
    }
}


function findLastMatchingTopicLevelByName(name, topicLevels) {
    const nameParts = name.split('/');
    console.log(' looking for name ', name, ' in topic levels ', topicLevels)

    // Recursive function to traverse the topic levels
    function traverse(level, parts) {
        // If the current level name matches the first part
        if(Array.isArray(level)){
            for(let item of level){
                if(item.name === parts[0]) {
                    console.log('level = array');
                    if(item.topic_level) {
                        return traverse(item.topic_level, parts.slice(1));
                    } else {
                        // TODO: case return {name: 'kelvin' }
                        // topic_level: [
                        //     { name: 'celsius', topic_level: [Object] },
                        //     { name: 'kelvin' }
                        //   ]
                        console.log(' found ', item);
                    }
                }
            }
        } else if (level.name === parts[0]) {
            // If no more parts to match, return the current level
            if (parts.length === 1) {
                // console.log('⭐');
                return level;
            }

            // If there is a next topic level, continue traversal
            if (level.topic_level) {
                return traverse(level.topic_level, parts.slice(1));
            } else {
                // If no more topic levels but parts remain, return null
                return;
            }
        } else {
            // If the current level name does not match, return null
            return null;
        }
    }

    // Start traversal with the top level and name parts
    return traverse(topicLevels, nameParts) || null;
}

function isNestedTopicLabel(name) {
    const occurences = name.split("/").length-1;
    return occurences > 0;
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

