import {configureStore} from '@reduxjs/toolkit'
import {edgeSlice} from "./reducer/edgeSlice.ts";
import {nodeSlice} from "./reducer/nodeSlice.ts";



export const store = configureStore({
    reducer: {
        edgeStore: edgeSlice.reducer,
        nodeStore: nodeSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch