import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text } from 'react-native';
import { dimensions, fonts } from '../styles';
import { colors } from '../styles/colors';
import { useDispatch } from 'react-redux';
import { sliceText } from '../utils';
import SearchAllDishes from '../screens/Search/SearchAllDishes';
import SearchAllRestaurants from '../screens/Search/SearchAllRestaurants';
import ForYouScreen from '../screens/Home/ForYou';
import BrowseScreen from '../screens/Home/Browse';
import Explore from '../screens/Home/Explore';
import FoodItemSlider from '../components/Sliders/FoodItemSlider';

const Tab = createMaterialTopTabNavigator();

const HomeTopNavigation = props => {
    // const dispatch = useDispatch();
    const { navigation } = props;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: colors.GREY_MEDIUM,
                tabBarActiveTintColor: colors.ORANGE,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarStyle: styles.tabBarStyle,
            })}>
            <Tab.Screen
                name="For You"
                children={() => (
                    <ForYouScreen navigation ={navigation}/>                    
                )}
            />
            <Tab.Screen
                name="Categories"
                children={() => (
                    <BrowseScreen navigation={navigation}/>                   
                )}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        ...fonts.NUNITO_500_14,
        fontWeight: 'bold',
        padding: 0,
    },
    tabBarIndicatorStyle: {
        backgroundColor: 'transparent',
    },
    tabBarItemStyle: {
        width: 120,
        padding: 0,
    },
    tabBarStyle: {
        shadowColor: 'transparent',
    },
});

export default HomeTopNavigation;
