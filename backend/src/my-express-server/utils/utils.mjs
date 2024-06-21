export function getFileName(discover_prefix) {
    if(discover_prefix !== '') {
        return discover_prefix + '.json';
    } else {
        const currentDateTime = new Date();
        // Format the date and time as a string
        const formattedDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', '_').replaceAll(':', '-');

        return formattedDateTime + '.json';
    }
}

export function removeDuplicates(arr) {
    return [...new Set(arr)]
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