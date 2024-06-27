import { isObjectEmpty } from "../../utils/utils.mjs";

export function renderSubscriptionPart(sourceTopic, mapping, targetTopic, subscription = {}) {
    console.log('render export subscription');
    const subscriptionExists = !isObjectEmpty(subscription);
    const mappingType = mapping.nodeType;
    if(subscriptionExists) {
        // TODO: evl. check for higher qos or type? wrsl eh nicht. FE: don't allow same reportTopic.
        console.log('already existing subscription: ', subscription);
        if(mappingType in subscription) {
            // subscription already has mappingType
            const mappingTypeValue = transformExistingMappingTypeToArray(subscription, mappingType);
            mappingTypeValue.push(mapping.renderForJson(targetTopic));
            // console.log('added ', mappingTypeValue);
            subscription[mappingType] = mappingTypeValue;
            return subscription;
        } else {
            // add new mappingType to subscription
            // e.g. if subscription.static exists, add subscription.value
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