import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer'; // Import your root reducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import the storage engine of your choice (e.g., local storage)

// Create a configuration for Redux Persist
const persistConfig = {
  key: 'root', // key in local storage
  storage, // storage engine
  // Add more configuration options here as needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check
  }),
});

const persistor = persistStore(store); // Create a Redux Persist store persistor

export { store, persistor }; // Export the store and persistor
