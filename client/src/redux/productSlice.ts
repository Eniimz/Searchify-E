//@ts-nocheck

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    compareProducts: null,
    products: null,
    errorMessage: '',
    currentPage: 1,
    recentQuery: null,
    previousPage: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        populateProducts: (state, action) => { //for related products
            state.products = action.payload
        },

        selectedCompareProducts: (state, action) => { //for compare products in compare page
            state.compareProducts = action.payload
        },
        populateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        populateRecentQuery: (state, action) => { 
            state.recentQuery = action.payload
        },
        populatePreviousPage: (state, acion) => {
            state.previousPage = acion.payload
        }
    }
})


export default productSlice.reducer;
export const { selectedCompareProducts, populateProducts, populateCurrentPage, populateRecentQuery, populatePreviousPage} = productSlice.actions