import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { clear } from "@testing-library/user-event/dist/clear";

const persistConfig = {
    key: 'root',
    storage,
  }

  const authpersistedReducer = persistReducer(persistConfig, authReducer)

  export const store =  configureStore({
    reducer: {
    auth: authpersistedReducer
    }
  })
export let persistor = persistStore(store)