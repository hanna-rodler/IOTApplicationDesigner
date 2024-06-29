import Topic from './Topic.mjs';
import {getCommandTopicNumber, getTopicById} from '../../utils/utils.mjs';

export default class ReactFlowMatcher {
    constructor(reactFlowContent) {
        this.reactFlowContent = reactFlowContent;
        this.needToUpdateEdgesCommantTopicNr = false;
        this.topicsForUpdatingEdgesCommandTopicNr = [];
    }

    matchNodeNameAndPositionToTopics(topics) {
        for(let topic of topics) {
            const topicToMatch = this.lookForMatchingTopic(topic);
            if(topicToMatch !== null){
                topic.data.nodeName = topicToMatch.nodeName;
                topic.position = topicToMatch.position;
            }
        }
        // match command and reportTopic to one topic
        // since two topics where the reportTopic and commandTopic
        return topics;

    }

    matchOrCreateMissingTopicNames(missingCommandTopicNames, topics) {
        for(let commandTopic of missingCommandTopicNames) {
            // console.log('checking if ', commandTopic, ' is in ReactFlow');
            const matchingTopic = this.getTopicByCommandTopic(commandTopic);
            if(matchingTopic !== null) {
                // check for report topic
                if(matchingTopic.reportTopic !== '') {
                    // add commandTopic to existing topic
                    for(let topic of topics) {
                        if(matchingTopic.reportTopic === topic.data.reportTopic) {
                            if(topic.data.commandTopic[0] === '') {
                                topic.data.commandTopic[0] = commandTopic;
                            } else {
                                topic.data.commandTopic.push(commandTopic);
                                this.needToUpdateEdgesCommantTopicNr = true;
                                this.topicsForUpdatingEdgesCommandTopicNr.push({topicId: topic.id, commandTopic: commandTopic, commandTopicNr: topic.data.commandTopic.length-1});
                                // TODO: try with more commandTopics
                                // and try with multiple mappings to commandTopic1
                            }
                        }
                    }
                } else {
                    // get position and nodeName and create new Topic
                    const topic = new Topic({commandTopic: [commandTopic], position: matchingTopic.position, nodeName: matchingTopic.nodeName})
                    topics.push(topic);
                }
            } else {
                // create new Topic
                const topic = new Topic({commandTopic: [commandTopic]});
                console.log('create new topic ', topic);
                topics.push(topic);
            }
        }
        return topics;
    }

    lookForMatchingTopic(topic) {
        const reportTopic = topic.data.reportTopic;
        const commandTopic = topic.data.commandTopic[0];
        if(reportTopic !== '') {
            for(let topicToMatch of this.reactFlowContent.topics) {
                if(topicToMatch.reportTopic === reportTopic) {
                    return topicToMatch;
                }
            }
        } else if(commandTopic !== '') { // TODO: commandTopic not needed. make just reportTopic.
            console.log('looking for commandTopic ', commandTopic);
            for(let topicToMatch of this.reactFlowContent.topics) {
                for(let commandTopicToMatch of topicToMatch.commandTopic) {
                    // import topics only have a commandTopic at 0 at this point.
                    if(commandTopicToMatch === commandTopic) {
                        return topicToMatch;
                    }
                }
            }
        }
        return null
    }

    getTopicByCommandTopic(commandTopic) {
        for(let topic of this.reactFlowContent.topics) {
            for(let reactFlowCommandTopic of topic.commandTopic) {
                if (reactFlowCommandTopic === commandTopic) {
                    return topic;
                }
            }
        }
        return null;
    }

    // TODO: add reason why needed.
    updateEdgeMapping(edges) {
        for(let obj of this.topicsForUpdatingEdgesCommandTopicNr) {
            console.log('need to change this::::: ', obj);
            for(let edge of edges) {
                // TODO: continue here: what if two edges have the same target?
                if(edge.targetHandle === 'commandTopic0' && edge.target === obj.commandTopic) {
                    console.log('edge before update', edge);
                    edge.target = obj.topicId;
                    edge.targetHandle = 'commandTopic'+obj.commandTopicNr;
                    console.log('edge after update', edge);
                }
            }
        }
        return edges;
    }

    updateMappingsPositionByMappedEdges(mappings, edges, topics) {
        // map mappings with edge.source und edge.target
        for(let mapping of mappings) {
            let targetTopic = null;
            let sourceTopic = null;
            let commandTopicNr = null;
            // look for matching source and target Topics in edges.
            for(let edge of edges) {
                console.log('edge target ', edge);
                if(edge.targetHandle === 'mappingIn' && edge.target === mapping.id) {
                    sourceTopic = getTopicById(topics, edge.source)
                } else if(edge.sourceHandle === 'mappingOut' && edge.source === mapping.id) {
                    targetTopic = getTopicById(topics, edge.target)
                    commandTopicNr = getCommandTopicNumber(edge.targetHandle);
                }
            }
            if(sourceTopic !== null && targetTopic !== null && commandTopicNr !== null) {
                const mappedEdge = this.findMatchingMappedEdge(sourceTopic, targetTopic, commandTopicNr, mapping);
                mapping.position = mappedEdge.position;
            } else {
                console.log('no matching mappedEdge for mapping ', mapping);
            }
        }

        return mappings
    }

    findMatchingMappedEdge(sourceTopic, targetTopic, commandTopicNr, mapping) {
        const matchedMappedEdges = [];
        const nodeType = mapping.data.nodeType;
        const commandTopics = targetTopic.data.commandTopic;
        for(let mappedEdge of this.reactFlowContent.mappedEdges) {
            // look for matching source report topic and node Type
            if(mappedEdge.sourceReportTopic === sourceTopic.data.reportTopic
                && mappedEdge.nodeType === nodeType
                && mappedEdge.targetCommandTopic === commandTopics[commandTopicNr]){
                matchedMappedEdges.push(mappedEdge);
            }
        }
        if(matchedMappedEdges.length === 1) {
            return matchedMappedEdges[0];
        } else if(matchedMappedEdges.length > 1) {
            // compare 
            if(nodeType === 'static') {
                for(let matched of matchedMappedEdges) {
                    if(matched.message === mapping.data.message && matched.mapped_message === mapping.data.mapped_message) {
                        return matched;
                    }
                }
                // maybe message or mapped_message match
                for(let matched of matchedMappedEdges) {
                    if(matched.message === mapping.data.message) {
                        return matched;
                    } else if(matched.mapped_message === mapping.data.mapped_message) {
                        return matched;
                    }
                }
                // maybe the message and mapped_message got between export and import -> just return first for getting the position
                return matchedMappedEdges[0];
            } else if (nodeType === 'value' || nodeType === 'json') {
                for(let matched of matchedMappedEdges) {
                    if(matched.mapping === mapping.data.mapping) {
                        return matched;
                    }
                }
                // maybe the mapping content got changed
                return matchedMappedEdges[0]
            } else {
                console.error('No valid nodeType in ', mapping);
            }
        } else {
            return null;
        }
    }

    
}