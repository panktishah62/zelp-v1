import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text } from 'react-native';
import { dimensions, fonts } from '../styles';
import { colors } from '../styles/colors';
import { useDispatch } from 'react-redux';
import { emptySearch } from '../redux/actions/search';
import { sliceText } from '../utils';
import SearchAllDishes from '../screens/Search/SearchAllDishes';
import SearchAllRestaurants from '../screens/Search/SearchAllRestaurants';

const Tab = createMaterialTopTabNavigator();

const SearchTabForAll = props => {
    const dispatch = useDispatch();
    const { searchFoodItems, searchRestaurants, location } = props;

    const onBack = () => {
        dispatch(emptySearch());
    };

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
                name="Dishes"
                children={() => (
                    <SearchAllDishes
                        searchFoodItems={searchFoodItems}
                        location={location}
                    />
                )}
            />
            <Tab.Screen
                name="Restaurants"
                children={() => (
                    <SearchAllRestaurants
                        searchRestaurants={searchRestaurants}
                        searchFoodItems={searchFoodItems}
                        location={location}
                    />
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

export default SearchTabForAll;
