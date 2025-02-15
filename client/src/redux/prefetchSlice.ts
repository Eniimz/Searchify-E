//@ts-nocheck

import { createSlice } from "@reduxjs/toolkit";

const prefethcSlice = createSlice({
    name: 'prefetch',
    initialState: {
        prefetchCompleted: false,
    },
    reducers: {
        setPrefetchCompleted: (state, action) => {
            state.prefetchCompleted = action.payload
        }
    }
})
 
export const { setPrefetchCompleted } = prefethcSlice.actions
export default prefethcSlice.reducer