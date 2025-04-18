export function removeDuplicates(arr) {
    return [...new Set(arr)]
}

export function removeDuplicateTopicsById(topics) {
    const seenIds = new Set();
    const uniqueTopics = topics.filter(topic => {
        if(seenIds.has(topic.id)) {
            return false;
        } else {
            seenIds.add(topic.id);
            return true;
        }
    })
    return uniqueTopics;
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getNodeName(name) {
    let wordsArr = name.split("/");

    if (wordsArr.length > 2) {
        // Keep only the last 2 words
        wordsArr = wordsArr.slice(wordsArr.length -2);
    }

    // Join the words back into a string
    return wordsArr.join(" ");
}

export function generateRandPosition() {
    const min = -500;
    const max = 500;
    return {x: randomIntFromInterval(min, max), y: randomIntFromInterval(min, max)}

}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
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
    }]
 * to {
        "button1": {
            "nodeName": "button1",
            "reportTopic": "button1",
            "commandTopic": "xyz",
            "subscriptionType": "button1/binary_sensor",
            "qos": 2,
        }
    }
 * 
 * @param {*} objectsArray 
 * @returns 
 */
export function makeSingleEntryAccessibleById(objectsArray){
    return objectsArray.reduce((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
    }, {})
}

export function getCommandTopicNumber(commandTopicString) {
    const regex = /commandTopic(\d+)/;
    const match = commandTopicString.match(regex);
    return match ? parseInt(match[1]) : null;
}

export function getTopicById(topicsArray, id) {
    for(let topic of topicsArray) {
        if(topic.id === id) {
            return topic
        }
    }
    return null;
}