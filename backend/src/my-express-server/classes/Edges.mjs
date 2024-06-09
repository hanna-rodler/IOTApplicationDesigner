export const createEdgeIn = (topicId, mappingId) => ({
    id:`reactflow__edge-in$t${topicId}_$m${mappingId}`, 
    source: topicId,
    sourceHandle: 'reportTopic',
    target: mappingId,
    targetHandle: 'mappingIn',
})

export const createEdgeOut = (mappingId, commandTopic) => ({
    id: `reactflow__edge-out$m${mappingId}_$c${commandTopic}`,
    source: mappingId,
    sourceHandle: 'mappingOut',
    target: commandTopic,
    targetHandle: 'commandTopic',
})