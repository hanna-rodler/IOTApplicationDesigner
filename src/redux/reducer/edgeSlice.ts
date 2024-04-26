import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface EdgeState {
    project: string,
    edges: object

}

const initialState: EdgeState = {
    project: "",
    edges: []
}

export const edgeSlice = createSlice({
    name: 'edges',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<string>) => {
            state.project = action.payload;
        },
        setEdgesState: (state, action: PayloadAction<string>) => {
            state.edges = action.payload;

        },
        setEdgeData: (state, action: PayloadAction<object>) => {
            for (let i = 0; i < state.edges.length; i++) {
                if (state.edges[i].id === action.payload[0]) {
                    state.edges[i].data = action.payload[1];
                }
            }
        }
        ,
    }
})

export const {
    setProject,
    setEdgesState,
    setEdgeData
} = edgeSlice.actions

export default edgeSlice.reducer