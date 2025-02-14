//@ts-nocheck

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from "./productSlice"
import userReducer from "./userSlice"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer
})

const presistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}) 
})


export const persistor = persistStore(store)