import { isObjectEmpty } from "../../utils/utils.mjs";
// TODO: for json
export function renderSubscriptionPart(sourceTopic, mapping, targetTopic, subscription = {}) {
    const subscriptionExists = !isObjectEmpty(subscription);
    const mappingType = mapping.nodeType;
    if(subscriptionExists) {
        // TODO: evl. check for higher qos or type? wrsl eh nicht. FE: don't allow same reportTopic.
        if(hasMappingType(subscription, mappingType)) {
            const mappingTypeValue = transformExistingMappingTypeToArray(subscription, mappingType);
            mappingTypeValue.push(mapping.renderForJson(targetTopic));
            // console.log('added ', mappingTypeValue);
            subscription[mappingType] = mappingTypeValue;
            return subscription;
        } else {
            // add mappingType. e.g. subscription.static exists, add subscription.value
            console.info('add mapping type to subscription');
            subscription[mappingType] = mapping.renderForJson(targetTopic);
        }
    } else {
        console.info('subscription is empty');
        console.log(' source topic ', sourceTopic);
        // initialize subscription
        if(sourceTopic.qos !== ''){
            subscription.qos = sourceTopic.qos;
        }
        if(sourceTopic.subscriptionType !== '') {
            subscription.type = sourceTopic.subscriptionType;
        }
        subscription[mappingType] = mapping.renderForJson(targetTopic);
    }

    //console.log('subscription ', subscription);
    return subscription;
}

function transformExistingMappingTypeToArray(subscription, mappingType) {
    const mappingTypeValue = subscription[mappingType];
    if (Array.isArray(mappingTypeValue)) {
        // If it's already an array, return it
        return mappingTypeValue;
    } else if (typeof mappingTypeValue === 'object') {
        // If it's an object, create a new array and add the object to it
        return [mappingTypeValue];
    } else {
        // If it's neither an array nor an object, return an empty array
        return null;
    }
}

function hasMappingType(subscription, mappingType) {
    // TODO: implement and test for double mapping type in 1 subscription.
    // Check if the subscription object has the specified mappingType
    return true;
    //return Object.values(subscription).some(value => typeof value === 'object' && value.hasOwnProperty(mappingType));
}