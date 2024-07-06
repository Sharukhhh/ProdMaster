import {configureStore} from '@reduxjs/toolkit';
import { persistReducer , persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {apiSlice} from '../services/apiSlice'
import authSliceReducer from '../slices/authSlice'

const authSlicePersistConfig = {
    key: 'prodMaster_auth',
    storage
}


const persistedAuthReducer = persistReducer(authSlicePersistConfig , authSliceReducer);


export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        prodMaster_auth: persistedAuthReducer
    },

    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
    
});

export const persistor = persistStore(store);