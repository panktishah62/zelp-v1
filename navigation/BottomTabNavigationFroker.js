import React from 'react';
import ActivityIcon from '../assets/icons/Activity.svg';
import CreateIcon from '../assets/icons/Create.svg';
import ProfileIcon from '../assets/icons/Profile.svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    ActivityScreenStack,
    CreateScreenStack,
    FrokerProfileScreenStack,
} from './StackNavigationFroker';

const Tab = createBottomTabNavigator();


const BottomTabNavigationFroker = () => {

    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: styles.tabIconActive,
            tabBarInactiveTintColor: styles.tabIconInActive,
        })}>
        <Tab.Screen
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <ActivityIcon size={28} />,
            }}
            name="Activity"
            component={ActivityScreenStack}
        />
        <Tab.Screen
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <CreateIcon size={28} />,
            }}
            name="Create"
            component={CreateScreenStack}
        />
        <Tab.Screen
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <ProfileIcon size={28} />,
            }}
            name="Profile"
            component={FrokerProfileScreenStack}
        />
    </Tab.Navigator>;
};

export default BottomTabNavigationFroker;
