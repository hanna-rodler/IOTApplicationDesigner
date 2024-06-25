import { generateRandomString } from "../utils/utils.mjs"

export const createEdgeIn = (topicId, mappingId) => ({
    id:`reactflow__edge-in${generateRandomString(10)}`, 
    source: topicId,
    sourceHandle: 'reportTopic',
    target: mappingId,
    targetHandle: 'mappingIn',
})

export const createEdgeOut = (mappingId, commandTopic) => ({
    id: `reactflow__edge-out${generateRandomString(11)}`,
    source: mappingId,
    sourceHandle: 'mappingOut',
    target: commandTopic,
    targetHandle: 'commandTopic',
})