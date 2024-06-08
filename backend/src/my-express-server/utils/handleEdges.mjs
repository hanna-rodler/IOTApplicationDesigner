export function getMappedEdgesWithContent(edges, topics, mappings){
    const mappedEdges = getMappedEdges(edges);
    // // console.log('mappedEdges ', mappedEdges);
    const edgesWithContents = getEdgesWithContents(mappedEdges, topics, mappings) // <- mappingType = 'static' || 'value' || 'json'

    return edgesWithContents;
}

function getMappedEdges(edges) {
    const halfMappedEdges = getHalfMappedEdges(edges)
    // getHalfMappedEdge() <- sourceId:topic and mappingId:mapping || targetId:topic, mappingId:mapping
     // mergeHalfMappedEdges() <-  sourceId:topic, mappingId:mapping targetId:topic
    // console.log('halfMappedEdges ', halfMappedEdges);
    const mappedEdges = mapEdges(halfMappedEdges);
    return mappedEdges;
}

function getHalfMappedEdges(edges) {
    const halfMappedEdges = [];
    for(let edge of edges){
        const halfMappedEdge = getHalfMappedEdge(edge);
        halfMappedEdges.push(halfMappedEdge)
    }
    return halfMappedEdges;
}

function getHalfMappedEdge(edge) {
    let halfMappedEdge = {};
    const sourceHandle = edge.sourceHandle;
    const targetHandle = edge.targetHandle;
    if(sourceHandle === 'reportTopic' && targetHandle=== 'mappingIn') {
        // source = topic. target = mapping
        halfMappedEdge.sourceTopicId = edge.source;
        halfMappedEdge.mappingId = edge.target;
    } else if(sourceHandle === 'mappingOut' && targetHandle === 'commandTopic') {
        // source = mapping. target = topic
        halfMappedEdge.mappingId = edge.source;
        halfMappedEdge.targetTopicId = edge.target;
    }
    return halfMappedEdge;
}

function mapEdges(halfMappedEdges) {
    const mappedEdges = [];
    while(halfMappedEdges.length > 0){
        const currentEdge = halfMappedEdges.shift();

        // try to find matching edge
        const matchingIndex = halfMappedEdges.findIndex(edge => edge.mappingId === currentEdge.mappingId);

        if(matchingIndex !== -1) {
            const matchingEdge = halfMappedEdges[matchingIndex];
            halfMappedEdges.splice(matchingIndex, 1)
            // merge the edges
            // console.log('matching');
            const mappedEdge = mergeHalfMappedEdges(currentEdge, matchingEdge);
            // console.log('mapped Edge ', mappedEdge)
            mappedEdges.push(mappedEdge);
        } else {
            console.error('no matching edge found');
        }
    }
    return mappedEdges;
}

function mergeHalfMappedEdges(currentEdge, matchingEdge) {
    const mappedEdge = { mappingId: currentEdge.mappingId};
    if('sourceTopicId' in currentEdge && 'targetTopicId' in matchingEdge) {
        mappedEdge.sourceTopicId = currentEdge.sourceTopicId;
        mappedEdge.targetTopicId = matchingEdge.targetTopicId;
    } else if('sourceTopicId' in matchingEdge && 'targetTopicId' in currentEdge) {
        mappedEdge.sourceTopicId = matchingEdge.sourceTopicId;
        mappedEdge.targetTopicId = currentEdge.targetTopicId;
    }
    return mappedEdge;
}

function getEdgesWithContents(mappedEdges, topics, mappings) {
    const edgesWithContents = [];
    for(let edge of mappedEdges) {
        const mapping = getMappingForEdgeWithContent(edge, mappings);
        const sourceTopic = getSourceTopic(edge, topics);
        const targetTopic = getTargetTopic(edge, topics);
        
        const edgeWithContent = {mapping: mapping, sourceTopic: sourceTopic, targetTopic: targetTopic};
        edgesWithContents.push(edgeWithContent);
    }
    return edgesWithContents;
}

function getMappingForEdgeWithContent(edge, mappings){
    const mapping = mappings[edge.mappingId];
    console.log('mapping ', mapping , 'get edge mapping with content');
    const { position, ...mappingWithoutPosition } = mapping;
    return mappingWithoutPosition;
}

function getSourceTopic(edge, topics) {
    const sourceTopic = topics[edge.sourceTopicId];
    const { position, commandTopic, ...sourceTopicWithoutPositionAndCommandTopic } = sourceTopic;
    return sourceTopicWithoutPositionAndCommandTopic;
}

function getTargetTopic(edge, topics) {
    const targetTopic = topics[edge.targetTopicId];
    const { id, commandTopic } = targetTopic;
    return {id, commandTopic};
}