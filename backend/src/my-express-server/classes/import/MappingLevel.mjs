import Subscription from './Subscription.mjs';
import Topic from '../Topic.mjs';
import {removeDuplicates} from '../../utils/utils.mjs';

export default class MappingLevel {
    constructor(topic_levels, plugins = undefined) {
        this.plugins = plugins !== undefined ? plugins : [];
        this.topic_levels = topic_levels;
        this.topics = [];
        this.edges = [];
        this.mappings = [];
        this.allCommandTopics = [];
        this.allTopicsRendered = false;
    }

    display(){
        console.log('dis_pref ', this.plugins, '\nconnection: ', this.topic_levels[0], 'mapping ', this.mappings);
    }

    parseTopicLevels(){
        if(this.topic_levels )
        this.parseTopicLevel(this.topic_levels);
    } 

    parseTopicLevel(topic_level, name = ''){
        console.log('topic_level ', topic_level);
        if(Array.isArray(topic_level)) {
            console.log('\t\ttopic level is array');
            // case that there is subscription & topic level 
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
            // in rare cases, there is a sub topic_level and subscription in the same topic_level
            if('topic_level' in topic_level && 'subscription' in topic_level) {
                console.log('\t\tthere is a nested subscription and a topic_level on same level');
                this.parseSubscriptionAndTopicLevelOnSameLevel(topic_level);
            } else {
                // usually there is either a sub topic_level or a subscription in a topic_level
                if('topic_level' in topic_level){
                    console.log('\t\tone topic_level (not array)');
                    this.parseTopicLevel(topic_level.topic_level, topic_level.track_name);
                } else if('subscription' in topic_level) {
                    console.log('\t\tone subscription (not array)')
                    this.parseSubscription(topic_level)
                }
            }
        }
    }

    parseSubscriptionAndTopicLevelOnSameLevel(topic) {
        console.log('same level: ', topic);
        // create own subscription and topic level, so they can be rendered seperately.
        // subscriptionPart already has full track_name. Nothing needs to be added later on so it gets name ''.
        const subscriptionPart = {
            name: '',
            subscription: topic.subscription,
            track_name: topic.track_name.substr(0, topic.track_name.length -1)
        }
        this.parseSubscription(subscriptionPart);
        this.parseTopicLevel(topic.topic_level, topic.track_name);
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
        const missingTopics = renderMissingTopics(this.allCommandTopics, this.topics);
        this.allTopicsRendered = true; // not checking missingTopics for length because theoretically there could be no missing topics.
        this.topics = this.topics.concat(missingTopics);
        return this.topics;
    }

    renderEdges(){
        if(this.allTopicsRendered){
            // update id because so far edges just have the command Topics as target, but they need the topic id for correct mapping
            for(let edge of this.edges) {
                if(edge.targetHandle === 'commandTopic') {
                    const commandTopic = edge.target;
                    const topic = getTopicByCommandTopic(this.topics, commandTopic);
                    edge.target = topic.id;
                }
            }
            return this.edges;
        } else {
            this.renderTopics();
            this.renderEdges();
        }
    }
}

function getTopicByCommandTopic(topics, commandTopic) {
    for(let topic of topics) {
        if(topic.data.commandTopic === commandTopic) {
            return topic;
        }
    }
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
        const topic = new Topic({commandTopic: commandTopic});
        missingTopics.push(topic);
    }
    return missingTopics;
}

function getMissingCommandTopicNames(allCommandTopics, topics){
    allCommandTopics = removeDuplicates(allCommandTopics);

    // let matchedCommandTopics = [];
    // for(let commandTopic of allCommandTopics){
    //     for(let topic of topics){
    //         const reportTopic = topic.data.reportTopic;
    //         const reportTopicParts = reportTopic.split('/');
    //         reportTopicParts.pop();
    //         // TODO: besprechen, ob das so ist. ansonsten müsste ich immer einzelne Topics ausspielen.
    //         if(reportTopicParts.join('/') === commandTopic) {
    //             console.log(commandTopic, ' matched ', reportTopicParts.join('/'));
    //             topic.data.commandTopic = commandTopic;
    //             matchedCommandTopics.push(commandTopic);
    //         }
    //     }
    // }

    // matchedCommandTopics = removeDuplicates(matchedCommandTopics)
    // console.log('\nmatched command Topics ', matchedCommandTopics);
    // edges $t = topicid, $m = mappingId, $c = commandTopic
    
    // look for matching report Topic in this.commandTopics; ?
    
    // look for all the command Topics that weren't added to a topic
    // const missingCommandTopicNames = allCommandTopics.filter(commandTopic => !matchedCommandTopics.includes(commandTopic));
    // console.log('missing ', missingCommandTopicNames);
    // return missingCommandTopicNames;
    return allCommandTopics;
}
