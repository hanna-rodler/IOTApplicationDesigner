import { isObjectEmpty } from "../../utils/utils.mjs";

export function renderSubscriptionPart(sourceTopic, mapping, targetTopic, subscription = {}) {
    const subscriptionExists = !isObjectEmpty(subscription);
    const mappingType = mapping.nodeType;
    if(subscriptionExists) {
        // Future Improvement what if the user creates two topics with the same reportTopic? possibility 1: check for higher qos or type and set that. possibility 2: don't allow two topics with same reportTopic in FE
        if(mappingType in subscription) {
            // subscription already has mappingType
            if(mappedTopicExists(subscription, mappingType, targetTopic)) {
                // subscription already has mappingType and mapped_topic
                const newMessageMapping = {
                    message: mapping.message,
                    mapped_message: mapping.mapped_message
                }
                // push new message_mapping to already existing message_mapping array
                if(Array.isArray(subscription[mappingType].message_mapping)) {
                    subscription[mappingType].message_mapping.push(newMessageMapping);
                } else {
                    // create new MessageMapping array
                    const newSubscription = {
                        mapped_topic: subscription[mappingType].mapped_topic,
                        message_mapping: [
                            subscription[mappingType].message_mapping,
                            newMessageMapping
                        ]
                    }
                    subscription[mappingType] = newSubscription;
                }                
            } else {
                // subscription has mappingType but not the mapped_topic yet
                const mappingTypeValue = transformExistingMappingTypeToArray(subscription, mappingType);
                mappingTypeValue.push(mapping.renderForJson(targetTopic));
                subscription[mappingType] = mappingTypeValue;
                return subscription;
            }
        } else {
            // add new mappingType to subscription
            // e.g. if subscription.static exists, add subscription.value
            console.info('add mapping type to subscription');
            subscription[mappingType] = mapping.renderForJson(targetTopic);
        }
    } else {
        // case: subscription is emtpy
        // initialize subscription
        if(sourceTopic.qos !== ''){
            subscription.qos = sourceTopic.qos;
        }
        if(sourceTopic.subscriptionType !== '') {
            subscription.type = sourceTopic.subscriptionType;
        }
        subscription[mappingType] = mapping.renderForJson(targetTopic);
    }

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

function mappedTopicExists(subscription, mappingType, targetTopic) {
    if(mappingType === 'static' && subscription[mappingType].mapped_topic === targetTopic.commandTopic) {
        return true
    }
    return false;
}