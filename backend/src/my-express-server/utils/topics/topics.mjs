import { isNestedTopicLabel } from './nestedTopics.mjs';

export function removeMatchingTopicLevelNameFromName(matchingTopicLevelName, topicLevelName) {
    // Remove the matchingTopicLevelName from the beginning of topicLevelName
    const modifiedTopicLevelName = topicLevelName.replace(matchingTopicLevelName + '/', '');

    // Remove the first slash from the modifiedTopicLevelName
    const cleanedTopicLevelName = modifiedTopicLevelName.replace(/^\//, '');

    return cleanedTopicLevelName;
}

export function findMatchingTopicLevelName(name, topicLevelNames) {
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

export function getTopicLevel(name, topicLevels) {
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

