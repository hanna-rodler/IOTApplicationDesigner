export function getFileName(discover_prefix) {
    if(discover_prefix !== '') {
        console.log('has file name');
        return discover_prefix + '.json';
    } else {
        console.log('get date string');
        const currentDateTime = new Date();
        // Format the date and time as a string
        const formattedDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', '_').replaceAll(':', '-');

        console.log("Current date and time:", formattedDateTime);
        return formattedDateTime + '.json';
    }
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
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