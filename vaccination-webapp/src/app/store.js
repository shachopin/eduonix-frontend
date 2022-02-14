import { combineReducers, configureStore} from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import AdminReducer from '../features/admin/slice';
import RetailReducer from '../features/retail/slice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
  //counter: counterReducer,
  admin: AdminReducer,
  retail: RetailReducer
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persister = persistStore(store);
