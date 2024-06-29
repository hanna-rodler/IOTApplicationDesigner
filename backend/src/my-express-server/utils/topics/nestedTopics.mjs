import { renderSubscriptionPart } from '../../classes/export/handleSubscription.mjs';

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