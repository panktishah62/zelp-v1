import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers/index';

// Define the persistConfig object
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cartActions'],
  getState: state => state.auth, // Get the 'auth' slice of state
  // Check for the existence of the token in AsyncStorage
  // and set the initial state accordingly
  inititalState: {
    isAuthenticated: AsyncStorage.getItem('token') ? true : false,
  },
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and thunk middleware
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create the persisted store
const persistor = persistStore(store);

export {store, persistor};
