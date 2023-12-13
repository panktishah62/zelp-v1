import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import FoodItemField from './FoodItemField';

const RestaurantField = props => {
    const { restaurant, navigation, currency } = props;
    const rest = restaurant.restaurant ? restaurant.restaurant : '';
    const foodItems = restaurant.foodItems ? restaurant.foodItems : {};
    const foodItemsCount = foodItems ? Object.keys(foodItems).length : 0;
    const [foodItemsList, setFoodItemsList] = useState([]);
    useEffect(() => {
        Object.keys(foodItems).forEach(function (key, index) {
            setFoodItemsList(arr => [...arr, foodItems[key]]);
        });
    }, [foodItems]);

    return (
        <View style={styles.container}>
            <View style={Styles.row_space_between}>
                {rest.name && (
                    <Text
                        style={[
                            styles.titleText,
                            { width: dimensions.fullWidth / 2 },
                        ]}>
                        {rest.name}
                    </Text>
                )}
                {foodItems && foodItemsCount > 0 && (
                    <Text style={[styles.titleText, fonts.NUNITO_800_12]}>
                        ({foodItemsCount} items)
                    </Text>
                )}
            </View>
            <View>
                {foodItemsList &&
                    foodItemsList.length > 0 &&
                    foodItemsList.map((foodItem, index) => {
                        if (index === foodItemsList.length - 1) {
                            return (
                                <View key={index}>
                                    <FoodItemField
                                        foodItem={foodItem}
                                        currency={currency}
                                        restaurant={rest}
                                        navigation={navigation}
                                    />
                                </View>
                            );
                        } else {
                            return (
                                <View
                                    style={styles.foodItemContainer}
                                    key={index}>
                                    <FoodItemField
                                        foodItem={foodItem}
                                        currency={currency}
                                        restaurant={rest}
                                        navigation={navigation}
                                    />
                                </View>
                            );
                        }
                    })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: dimensions.fullWidth,
        padding: 20,
    },
    titleText: {
        ...fonts.NUNITO_700_16,
        color: colors.ORANGE,
    },
    foodItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER_GREY,
    },
});

export default RestaurantField;
