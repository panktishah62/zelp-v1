import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authReducer';
import addressReducer from './addressReducer';
import userReducer from './userReducer';
import currentOrderReducer from './currentOrderReducer';
import permissionsReducer from './permissionsReducer';
import cartActionsReducer from './cartActionsReducer';
import serverReducer from './serverReducer';
import followedFrokerReducer from './frokerReducer';
import stylesReducer from './stylesReducer';
import networkReducer from './networkReducer';
import dialogReducer from './dialogReducer';
import selectSubscriptionMenuReducer from './selectSubscriptionMenuReducer';
import vegbuttonActiveReducer from './vegbuttonActiveReducer';

// Define the root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    address: addressReducer,
    user: userReducer,
    currentOrder: currentOrderReducer,
    permissions: permissionsReducer,
    cartActions: cartActionsReducer,
    serverReducer: serverReducer,
    followedFroker: followedFrokerReducer,
    dynamicStyles: stylesReducer,
    network: networkReducer,
    dialog: dialogReducer,
    subscriptionSelectMenu:selectSubscriptionMenuReducer,
    vegbutton:vegbuttonActiveReducer
});

// Define the persistConfig object
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'cartActions'],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
