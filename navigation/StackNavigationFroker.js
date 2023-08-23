import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderAnalyticsScreen from '../screens/Froker/FrokerAnalytics/Orders';
import FrokerTabNavigation from './FrokerTabNavigation';
import FrokerProfileScreen from '../screens/Froker/FrokerProfile';

const Stack = createNativeStackNavigator();

const FrokerScreenStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
                name="FrokerProfileForFroker"
                component={FrokerProfileScreen}
            />
        </Stack.Navigator>
    );
};

export const ActivityScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="ActivityScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="ActivityScreen"
                component={OrderAnalyticsScreen}
            />
            <Stack.Screen
                name="FrokerScreenStack"
                component={FrokerScreenStack}
            />
        </Stack.Navigator>
    );
};

export const CreateScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="CreateScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="CreateScreen" component={FrokerTabNavigation} />
            <Stack.Screen
                name="FrokerScreenStack"
                component={FrokerScreenStack}
            />
        </Stack.Navigator>
    );
};

export const FrokerProfileScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="FrokerProfile"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="FrokerProfile"
                component={FrokerProfileScreen}
            />
            <Stack.Screen
                name="FrokerScreenStack"
                component={FrokerScreenStack}
            />
        </Stack.Navigator>
    );
};
