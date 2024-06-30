import {renderSubscriptionPart } from './handleSubscription.mjs';

export function createNestedTopicLevel(name, sourceTopic, mapping, targetTopic) {
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
    // console.log('created nested topic ', topicLevel);
    return topicLevel;
}

export function isNestedTopicLabel(name) {
    const occurences = name.split("/").length-1;
    return occurences > 0;
}

export function removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName) {
    // Remove the matchingTopicLevelName from the beginning of topicLevelName
    const modifiedTopicLevelName = topicLevelName.replace(matchingTopicLevelName + '/', '');

    // Remove the first slash from the modifiedTopicLevelName
    const cleanedTopicLevelName = modifiedTopicLevelName.replace(/^\//, '');

    return cleanedTopicLevelName;
}

export function findMatchingTopicLevelName(name, topicLevelNames) {
    const nameParts = name.split('/');
    // console.log('looking for name ', name, ' in ', topicLevelNames);

    const possibleMatches = [];

    for (let topic of topicLevelNames) {
        const topicParts = topic.split('/');

        // for full match
        if (name === topic) {
            return name;
        }

        // array to hold the possible matching parts
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
            possibleMatches.push(matchingParts.join('/'))
        }
    }

    // find the longest of all possible matches
    if (possibleMatches.length > 0) {
        const longest = possibleMatches.reduce((max, obj) => (obj.length > max.length ? obj: max), possibleMatches[0]);
        return longest;
    }

    // no matches found
    return '';
}

export function getTopicLevel(name, topicLevels) {
    // console.log('get topic levels ', topicLevels, ' with name ', name, ' length ', topicLevels.length);
    if(Array.isArray(topicLevels) && topicLevels.length > 1) {
        // console.log('in array');
        for (const topic of topicLevels) {
            if (topic.name === name) {
                // console.log(' matched topic.name = ', name, ' topic: ', topic)
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
                // console.log('looking in subtopic ', topic.topic_level, ' name ', name);
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

    // Recursive function to traverse the topic levels
    function traverse(level, parts) {
        // If the current level name matches the first part
        if(Array.isArray(level)){
            for(let item of level){
                if(item.name === parts[0]) {
                    if(item.topic_level && parts.length >= 1) {
                        return traverse(item.topic_level, parts.slice(1));
                    } else {
                        // e.g.
                        // case return {name: 'kelvin' } <- does not have topic_level but subscription
                        // topic_level: [
                        //     { name: 'celsius', topic_level: [Object] },
                        //     { name: 'kelvin' }
                        //   ]
                        return item;
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
            // console.log(' no match ', level);
            // If the current level name does not match, return null
            return null;
        }
    }

    // Start traversal with the top level and name parts
    return traverse(topicLevels, nameParts) || null;
}

