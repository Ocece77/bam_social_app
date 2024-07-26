 
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import userReducer  from './userSlice';
import postReducer  from './postSlice';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer
})

 
const persistConfig = {
  key: 'root',
  storage,
  version : 1
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store  : EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>

export const persistor = persistStore(store)