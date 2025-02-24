import Subscription from './Subscription.mjs';
import Topic from './Topic.mjs';
import {removeDuplicates} from '../../utils/utils.mjs';
import {type} from "os";
import ReactFlowMatcher from './ReactFlowMatcher.mjs';

export default class MappingLevel {
    constructor(topic_levels, reactFlowJson = undefined, plugins = undefined) {
        this.plugins = plugins !== undefined ? plugins : [];
        this.topic_levels = topic_levels;
        this.topics = [];
        this.edges = [];
        this.mappings = [];
        this.allCommandTopics = [];
        this.allTopicsRendered = false;
        this.reactFlowJson = reactFlowJson;
        if(this.reactFlowJson !== undefined) {
            this.allMappingsRendered = false;
            this.reactFlowMatcher = new ReactFlowMatcher(reactFlowJson);
        } else {
            this.allMappingsRendered = true;
        }
    }

    display(){
        console.log('dis_pref ', this.plugins, '\nconnection: ', this.topic_levels[0], 'mapping ', this.mappings);
    }

    parseTopicLevels(){
        if(this.topic_levels) {
            this.parseTopicLevel(this.topic_levels);
        }
    }

    parseTopicLevel(topic_level, name = ''){
        if(Array.isArray(topic_level)) {
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
                this.parseSubscriptionAndTopicLevelOnSameLevel(topic_level);
            } else {
                // usually there is either a sub topic_level or a subscription in a topic_level
                if('topic_level' in topic_level){
                    this.parseTopicLevel(topic_level.topic_level, topic_level.track_name);
                } else if('subscription' in topic_level) {
                    this.parseSubscription(topic_level)
                }
            }
        }
    }

    parseSubscriptionAndTopicLevelOnSameLevel(topic) {
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
    
    renderMappings() {
        if(this.allMappingsRendered) {
            return this.mappings;
        } else {
            this.renderEdges();
            return this.mappings;
        }
    }

    renderTopics() {
        // additionally create the topics that wouldn't have a matching topic in the edges.
        const missingCommandTopicNames = getMissingCommandTopicNames(this.allCommandTopics, this.topics);

        if(this.reactFlowJson !== undefined) {
            // case: json import has reactFlow Data (got exported once from ReactFlow. maybe got changed.)

            // match name and position to topic. also merge topics if there are currently 
            this.topics = this.reactFlowMatcher.matchNodeNameAndPositionToTopics(this.topics);
            this.topics = this.reactFlowMatcher.matchOrCreateMissingTopicNames(missingCommandTopicNames, this.topics);
            if(this.reactFlowMatcher.needToUpdateEdgesCommandTopicNr) {
                this.edges = this.reactFlowMatcher.updateEdgeMapping(this.edges);
            } else {
                console.info('Not needed to update edges.');
            }

        } else {
            console.info('render without reactFlowJson. createMissingTopics');
            const missingTopics = createMissingTopics(missingCommandTopicNames, this.topics);
            if(missingTopics.length !== 0) {
                this.topics = this.topics.concat(missingTopics);
            }
        }
        this.allTopicsRendered = true; // not checking missingTopics for length because theoretically there could be no missing topics.
        return this.topics;
    }

    renderEdges(){
        if(this.allTopicsRendered){
            // update id because so far edges just have the command Topics as target, but they need the topic id for correct mapping in ReactFlow.
            for(let edge of this.edges) {
                // 'commandTopic0' okay, because the edges are only matched to topics with 1 command topic. topics with multiple commandTopics  ('commandTopic1') can only happen if they are matched via reactFlowJson. - edges are handled there.
                if(edge.targetHandle === 'commandTopic0') {
                    let commandTopic = edge.target;
                    if(typeof commandTopic === 'string'){
                        commandTopic = [commandTopic]
                    }
                    const topic = getTopicByFirstCommandTopic(this.topics, commandTopic);
                    if (topic) {
                        edge.target = topic.id;
                    } else {
                        console.error(`No topic found for command topic: ${commandTopic}`);
                    }
                }
            }
            if(this.reactFlowJson !== undefined && this.reactFlowJson.mappedEdges !== null) {
                this.mappings = this.reactFlowMatcher.updateMappingsPositionByMappedEdges(this.mappings, this.edges, this.topics);
                this.allMappingsRendered = true; // to make sure mappings get updated By ReactFlow if present;
            }
            return this.edges;
        } else {
            this.renderTopics();
            return this.renderEdges();
        }
    }
}

function getTopicByFirstCommandTopic(topics, commandTopic) {
    for(let topic of topics) {
        if(topic.data.commandTopic.includes(commandTopic[0])) {
            return topic;
        }
    }
    return null; // Return null if no topic is found
}

function createMissingTopics(missingCommandTopicNames){
    const missingTopics = [];
    // create the topics for that commandTopic
    for(let commandTopic of missingCommandTopicNames){
        const topic = new Topic({commandTopic: [commandTopic]});
        missingTopics.push(topic);
    }
    return missingTopics;
}

function getMissingCommandTopicNames(allCommandTopics){
    allCommandTopics = removeDuplicates(allCommandTopics);
    return allCommandTopics;
}
