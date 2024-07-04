import Topic from './Topic.mjs';
import {getCommandTopicNumber, getTopicById} from '../../utils/utils.mjs';
import { removeDuplicateTopicsById} from '../../utils/utils.mjs';


export default class ReactFlowMatcher {
    constructor(reactFlowContent) {
        this.reactFlowContent = reactFlowContent;
        this.needToUpdateEdgesCommandTopicNr = false;
        this.topicsForUpdatingEdgesWithCommandTopicNr = [];
    }

    matchNodeNameAndPositionToTopics(topics) {
        console.info('match topics ', topics, 'with reactFlowJson topics');
        for(let topic of topics) {
            const topicToMatch = this.getTopicByReportTopic(topic.data.reportTopic);
            console.log('topic To Match ', topicToMatch);
            if(topicToMatch !== null){
                topic.data.nodeType = topicToMatch.nodeType;
                topic.data.nodeName = topicToMatch.nodeName;
                topic.position = topicToMatch.position;
            }
        }
        // match command and reportTopic to one topic
        // since two topics where the reportTopic and commandTopic
        return topics;

    }

    matchOrCreateMissingTopicNames(missingCommandTopicNames, topics) {
        const topicsWithoutReportTopic = [];
        for(let commandTopic of missingCommandTopicNames) {
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
                                this.needToUpdateEdgesCommandTopicNr = true;
                                this.topicsForUpdatingEdgesWithCommandTopicNr.push({topicId: topic.id, commandTopic: commandTopic, commandTopicNr: topic.data.commandTopic.length-1});
                            }
                        }
                    }
                } else if (matchingTopic.commandTopic[0] !== '') {
                    // topcis with only commandTopic but no reportTopic that are in reactFlow part of json, still need to get added to the topics.
                    console.log('matching topic without report topic');
                    topicsWithoutReportTopic.push(matchingTopic);
                } else {
                    // get position and nodeName and create new Topic
                console.log('create new topic from reactFlowJson');
                    const topic = new Topic({commandTopic: [commandTopic], position: matchingTopic.position, nodeName: matchingTopic.nodeName, nodeType: matchingTopic.nodeType})
                    topics.push(topic);
                }
            } else {
                // create new Topic
                const topic = new Topic({commandTopic: [commandTopic]});
                topics.push(topic);
            }
        }
        const uniqueTopicsWithoutReportTopic = this.handleTopicsWithoutReportTopic(topicsWithoutReportTopic);
        for(let topicWithoutReportTopic of uniqueTopicsWithoutReportTopic) {
            topics.push(topicWithoutReportTopic);
        }
        return topics;
    }

    handleTopicsWithoutReportTopic(topicsWithoutReportTopic) {
        let uniqueTopics = removeDuplicateTopicsById(topicsWithoutReportTopic);
        console.log('unique topics ', uniqueTopics);

        const uniqueNewTopics = []
        for(let topic of uniqueTopics) {
            uniqueNewTopics.push(new Topic({commandTopic: topic.commandTopic, position: topic.position, nodeName: topic.nodeName, nodeType: topic.nodeType}))
        }

        // look if any commandTopic needs to be updated later (for more than 1 commandTopic per topic )
        for(let topic of uniqueNewTopics) {
            if(topic.data.commandTopic.length > 1) {
                this.needToUpdateEdgesCommandTopicNr = true;
                for(let i=1; i < uniqueNewTopics.length; i++) {
                    this.topicsForUpdatingEdgesWithCommandTopicNr.push(
                        {topicId: topic.id, commandTopic: topic.data.commandTopic[i], commandTopicNr: i}
                    )
                }

            }
        }
        console.log('unique new topics ', uniqueTopics);
        return uniqueNewTopics;
    }

    /**
     * 
     * @param {Topic.data.reportTopic} topic 
     * @returns 
     */
    getTopicByReportTopic(reportTopic) {
        if(reportTopic !== '') {
            for(let topicToMatch of this.reactFlowContent.topics) {
                if(topicToMatch.reportTopic === reportTopic) {
                    return topicToMatch;
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

    // it is only possible to rearrange the edges here. The reason is because before, the topics were not matched according to how they were in reactFlow.
    // by standard when importing, each topic only has 1 commandTopic - so edge.targetHandle = 'commandTopic0' is correct.
    // but when the topics are matched according to how they were in reactFlow, the topics can have multiple commandTopics. So edge.targetHandle = 'commandTopic0' isn't correct anymore and the commandTopicNumber of the edge.targetHandle needs to be updated.
    updateEdgeMapping(edges) {
        for(let updateNeeded of this.topicsForUpdatingEdgesWithCommandTopicNr) {
            for(let edge of edges) {
                if(edge.targetHandle === 'commandTopic0' && edge.target === updateNeeded.commandTopic || edge.target[0] === updateNeeded.commandTopic) {
                    edge.target = updateNeeded.topicId;
                    edge.targetHandle = 'commandTopic'+updateNeeded.commandTopicNr;
                    // console.log('updated edge CommandTopic Nr', edge);
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
                if(edge.targetHandle === 'mappingIn' && edge.target === mapping.id) {
                    sourceTopic = getTopicById(topics, edge.source)
                } else if(edge.sourceHandle === 'mappingOut' && edge.source === mapping.id) {
                    targetTopic = getTopicById(topics, edge.target)
                    commandTopicNr = getCommandTopicNumber(edge.targetHandle);
                }
            }
            if(sourceTopic !== null && targetTopic !== null && commandTopicNr !== null) {
                const mappedEdge = this.findMatchingMappedEdge(sourceTopic, targetTopic, commandTopicNr, mapping);
                if(mappedEdge !== null) {
                    mapping.data.nodeName = mappedEdge.nodeName;
                    mapping.data.description = mappedEdge.description;
                    mapping.position = mappedEdge.position;
                } else {
                    console.log('no matching mappedEdge for mapping ', mapping);
                }
            } else {
                console.log('no matching mappedEdge for mapping ', mapping, ' because sourceTopic, targetTopic or commandTopicNr are null');
            }
        }

        return mappings
    }

    /**
     * Go through reactFlow.mappedEdges and find the correct mappedEdge
     * based on - nodeType, - sourceReportTopic, - targetCommandTopic and further content if needed: - mapping for value and json mappings - message and mapped_message for static mapppings
     * 
     * @param {Topic} sourceTopic 
     * @param {Topic} targetTopic 
     * @param {number} commandTopicNr 
     * @param {*} mapping 
     * @returns the matched mappedEdge of reactFlow in the imported json
     */
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