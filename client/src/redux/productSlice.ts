//@ts-nocheck

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    compareProducts: null,
    errorMessage: ''
}

const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        selectedCompareProducts: (state, action) => {
            state.compareProducts = action.payload
        }
    }
})


export default productSlice.reducer;
export const { selectedCompareProducts } = productSlice.actions