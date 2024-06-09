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