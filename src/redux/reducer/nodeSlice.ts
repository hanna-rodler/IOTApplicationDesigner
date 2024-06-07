import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface NodeState {
    project: string,
    nodes: object,

}

const initialState: NodeState = {
    project: "",
    nodes: [],
}

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<string>) => {
            state.project = action.payload;
        },
        addNode: (state, action) => {
            state.nodes.push(action.payload);
        },
        setNodesState: (state, action: PayloadAction<string>) => {
            state.nodes = action.payload;
        },
        updateNode: (state, action) => {
            const { id, newData } = action.payload;

            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === id) {
                    state.nodes[i] = { ...state.nodes[i], ...newData };
                    return;
                }
            }
        },
        deleteNode: (state, action) => {
            const { id } = action.payload;
            console.log("Node deletion")
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === id) {
                    state.nodes[i] = null;
                    console.log("Node deleted!")
                    return;
                }
            }
        },
        setReportTopic: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload[0].id) {
                    state.nodes[i].reportTopic = action.payload[0].reportTopic;
                    return;
                }
            }
            state.nodes = action.payload
        },
        setCommandTopic: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload[0].id) {
                    state.nodes[i].commandTopic = action.payload[0].commandTopic;
                    return;
                }
            }
            state.nodes = action.payload
        },
        setMapping: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload[0].id) {
                    state.nodes[i].mapping = action.payload[0].mapping;
                    return;
                }
            }
            state.nodes = action.payload
        },
        setQos: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload[0].id) {
                    state.nodes[i].qos = action.payload[0].qos;
                    return;
                }
            }
            state.nodes = action.payload
        },
        setRetain: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload[0].id) {
                    state.nodes[i].retain = action.payload[0].retain;
                    return;
                }
            }
            state.nodes = action.payload
        },
    }
})

export const {
    setProject,
    setNodesState,
    setReportTopic,
    setCommandTopic,
    setMapping,
    setQos,
    setRetain,
    addNode,
    updateNode,
    deleteNode
} = nodeSlice.actions

export default nodeSlice.reducer