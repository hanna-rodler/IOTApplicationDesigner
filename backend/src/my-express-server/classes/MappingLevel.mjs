import Subscription from './Subscription.mjs';
import Topic from './Topic.mjs';

export default class MappingLevel {
    constructor(plugins, topic_levels) {
        this.plugins = plugins;
        this.topic_levels = topic_levels;
        this.edges = [];
        this.mappings = [];
        this.topics = [];
        this.allCommandTopics = [];
    }

    display(){
        console.log('dis_pref ', this.plugins, '\nconnection: ', this.topic_levels);
    }

    parseTopicLevels2(){
        for(let topic_level of this.topic_levels) {
            // console.log('topic_level ', topic_level);
            if('topic_level' in topic_level){
                // parse subtopics
                this.parseTopicLevel(topic_level, topic_level.name);
            } else if('subscription' in topic_level) {
                this.parseSubscription(topic_level);
            }
        }
    }  

    parseTopicLevel2(topic_level, name) {
        console.log('parsing topic level ', topic_level, 'sub topic ', topic_level.topic_level);
        for(let sub_topic of topic_level.topic_level){
            if('track_name' in sub_topic) {
                sub_topic.track_name += name;
            } else {
                sub_topic.track_name = name;
            }
            //console.log('sub topic ', sub_topic);
            if('topic_level' in sub_topic){
                // parse subtopics
                this.parseTopicLevel(sub_topic, sub_topic.name);
            } else if('subscription' in sub_topic) {
                this.parseSubscription(sub_topic);
            }
        }
    }

    parseTopicLevels(){
        this.parseTopicLevel(this.topic_levels);
    } 

    parseTopicLevel(topic_level, name = ''){
        if(Array.isArray(topic_level)) {
            for(let level of topic_level){
                if('track_name' in level && name !== '') {
                    level.track_name += name +'/';
                } else {
                    level.track_name = name;
                }
                if('topic_level' in level){
                    this.parseTopicLevel(level, level.name);
                } else {
                    this.parseSubscription(level)
                }
            }
        } else {
            if('track_name' in topic_level && name !== '') {
                topic_level.track_name += name +'/';
            } else {
                topic_level.track_name = name;
            }
            if('topic_level' in topic_level){
                this.parseTopicLevel(topic_level.topic_level, topic_level.track_name);
            } else {
                this.parseSubscription(topic_level)
            }
        }
    }

    parseSubscription(topic) {
        const reportTopic = topic.track_name + topic.name;
        
        const subscription = new Subscription(topic.subscription, reportTopic);
        
        const renderedEdges = subscription.renderEdges();
        this.edges = this.edges.concat(renderedEdges);

        const renderedMappings = subscription.renderMappings();
        this.mappings = this.mappings.concat(renderedMappings);

        this.topics.push(subscription.getTopic())

        this.allCommandTopics = this.allCommandTopics.concat(subscription.getCommandTopics());
    }

    renderTopics() {
        // additionally create the topics that wouldn't have a matching topic in the edges.
        return this.topics.concat(renderMissingTopics(this.allCommandTopics, this.topics))
    }


}

function removeDuplicates(arr){
    return [...new Set(arr)]
}

function renderMissingTopics(allCommandTopics, topics) {
    // remove duplicates
    const missingCommandTopicNames = getMissingCommandTopicNames(allCommandTopics, topics);

    return createMissingTopics(missingCommandTopicNames);
}

function createMissingTopics(missingCommandTopicNames){
    const missingTopics = [];
    // create the topics for that commandTopic
    for(let commandTopic of missingCommandTopicNames){
        const topic = new Topic('', '', '', commandTopic);
        missingTopics.push(topic);
    }
    return missingTopics;
}

function getMissingCommandTopicNames(allCommandTopics, topics){
    allCommandTopics = removeDuplicates(allCommandTopics);

    let matchedCommandTopics = [];
    for(let commandTopic of allCommandTopics){
        for(let topic of topics){
            const reportTopic = topic.reportTopic;
            const reportTopicParts = reportTopic.split('/');
            reportTopicParts.pop();
            // TODO: besprechen, ob das so ist. ansonsten müsste ich immer einzelne Topics ausspielen.
            if(reportTopicParts.join('/') === commandTopic) {
                console.log(commandTopic, ' matched ', reportTopicParts.join('/'));
                topic.commandTopic = commandTopic;
                matchedCommandTopics.push(commandTopic);
            }
        }
    }

    matchedCommandTopics = removeDuplicates(matchedCommandTopics)
    console.log('\nmatched command Topics ', matchedCommandTopics);
    // edges $t = topicid, $m = mappingId, $c = commandTopic
    
    // look for matching report Topic in this.commandTopics; ?
    
    // look for all the command Topics that weren't added to a topic
    const missingCommandTopicNames = allCommandTopics.filter(commandTopic => !matchedCommandTopics.includes(commandTopic));
    console.log('missing ', missingCommandTopicNames);
    return missingCommandTopicNames;
}
