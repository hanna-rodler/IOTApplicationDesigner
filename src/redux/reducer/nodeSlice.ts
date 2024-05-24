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
        setNodesState: (state, action: PayloadAction<string>) => {
            state.nodes = action.payload;
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
                    state.nodes[i].comnmandTopic = action.payload[0].commandTopic;
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
    setCommandTopic
} = nodeSlice.actions

export default nodeSlice.reducer