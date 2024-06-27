import Edge from './Edge.mjs';
import MappedEdge from '../MappedEdge.mjs';

export default class EdgesMapper {
    constructor(edges) {
        // remove last element _id (id of subcollection) and make iterable
        const edgesArray = Object.entries(edges)
            .filter(([key, value]) => key !== '_id')
            .map(([key, value]) => value);

        this.edgesMap = new Map();
        for (let edge of edgesArray) {
            const newEdge = new Edge(edge);
            this.edgesMap.set(newEdge.id, newEdge);
        }
    }

    getMappedEdgesWithContent(topicsMap, mappingsMap) {
        const mappedEdges = getMappedEdges(this.edgesMap);
        console.log('mappedEdges ', mappedEdges);
        const edgesWithContents = getEdgesWithContents(mappedEdges, topicsMap, mappingsMap);
        return edgesWithContents;
    }
}

function getMappedEdges(edgesMap) {
    const halfMappedEdges = getHalfMappedEdges(edgesMap)
    console.log('halfMappedEdges ', halfMappedEdges);
    const mappedEdges = mapEdges(halfMappedEdges);
    return mappedEdges;
}

function getHalfMappedEdges(edges) {
    const halfMappedEdges = [];
    for (const edge of edges.values()) {
        const halfMappedEdge = edge.getHalfMappedEdge();
        if (halfMappedEdge && halfMappedEdge.mappingId) {
            halfMappedEdges.push(halfMappedEdge);
        } else {
            console.warn('Invalid half-mapped edge: ', halfMappedEdge);
        }
    }
    return halfMappedEdges;
}

function mapEdges(halfMappedEdges) {
    const mappedEdges = [];
    while (halfMappedEdges.length > 0) {
        const currentEdge = halfMappedEdges.shift();

        if (!currentEdge || !currentEdge.mappingId) {
            console.error('Invalid currentEdge: ', currentEdge);
            continue;
        }

        // try to find matching edge
        console.log('currentEdge ', currentEdge);
        const matchingIndex = halfMappedEdges.findIndex(edge => edge.mappingId === currentEdge.mappingId);

        if (matchingIndex !== -1) {
            const matchingEdge = halfMappedEdges[matchingIndex];
            halfMappedEdges.splice(matchingIndex, 1);

            // merge the edges
            const mappedEdge = mergeHalfMappedEdges(currentEdge, matchingEdge);
            mappedEdges.push(new MappedEdge(mappedEdge.mappingId, mappedEdge.sourceTopicId, mappedEdge.targetTopicId));
        } else {
            console.error('No matching edge found for mappingId:', currentEdge.mappingId);
        }
    }
    return mappedEdges;
}

function mergeHalfMappedEdges(currentEdge, matchingEdge) {
    const mappedEdge = { mappingId: currentEdge.mappingId };
    if ('sourceTopicId' in currentEdge && 'targetTopicId' in matchingEdge) {
        mappedEdge.sourceTopicId = currentEdge.sourceTopicId;
        mappedEdge.targetTopicId = matchingEdge.targetTopicId;
    } else if ('sourceTopicId' in matchingEdge && 'targetTopicId' in currentEdge) {
        mappedEdge.sourceTopicId = matchingEdge.sourceTopicId;
        mappedEdge.targetTopicId = currentEdge.targetTopicId;
    }
    return mappedEdge;
}

function getEdgesWithContents(mappedEdges, topicsMap, mappingsMap) {
    const edgesWithContents = [];
    for (let edge of mappedEdges) {
        const mapping = getMappingForEdgeWithContent(edge, mappingsMap);
        const sourceTopic = getSourceTopic(edge, topicsMap);
        const targetTopic = getTargetTopic(edge, topicsMap);

        const edgeWithContent = { mapping: mapping, sourceTopic: sourceTopic, targetTopic: targetTopic };
        edgesWithContents.push(edgeWithContent);
    }
    return edgesWithContents;
}

function getMappingForEdgeWithContent(edge, mappingsMap) {
    const mappingWithoutPosition = mappingsMap.mappings.get(edge.mappingId);
    if (!mappingWithoutPosition) {
        console.error('No mapping found for mappingId:', edge.mappingId);
    }
    return mappingWithoutPosition;
}

function getSourceTopic(edge, topicsMap) {
    const sourceTopic = topicsMap.topics.get(edge.sourceTopicId);
    if (!sourceTopic) {
        console.error('No source topic found for sourceTopicId:', edge.sourceTopicId);
    }
    return sourceTopic.getTopicWithoutPositionAndCommandTopic();
}

function getTargetTopic(edge, topicsMap) {
    const targetTopic = topicsMap.topics.get(edge.targetTopicId);
    if (!targetTopic) {
        console.error('No target topic found for targetTopicId:', edge.targetTopicId);
    }
    return { id: targetTopic.id, commandTopic: targetTopic.commandTopic };
}
