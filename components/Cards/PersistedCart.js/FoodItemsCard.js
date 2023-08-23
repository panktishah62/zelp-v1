import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles/colors';
import RestaurantField from './RestaurantField';

const FoodItemsCard = props => {
    const { restaurants, navigation } = props;
    const [restaurantsList, setRestaurantsList] = useState([]);
    useEffect(() => {
        Object.keys(restaurants).forEach(function (key, index) {
            setRestaurantsList(arr => [...arr, restaurants[key]]);
        });
    }, []);
    return (
        <View style={styles.container}>
            {restaurantsList.length > 0 &&
                restaurantsList.map((restaurant, index) => {
                    return (
                        <RestaurantField
                            restaurant={restaurant}
                            navigation={navigation}
                            key={index}
                        />
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 5,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default FoodItemsCard;
