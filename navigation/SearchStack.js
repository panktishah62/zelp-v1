import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import SearchDishesAndRestaurants from '../screens/Search/SearchDishesAndRestaurants';

const Stack = createNativeStackNavigator();

export const SearchStack = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SearchAll"
            screenOptions={{
                headerStyle: styles.headerStyle,
            }}>
            <Stack.Screen
                name="SearchAll"
                component={SearchDishesAndRestaurants}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.WHITE,
    },
});
