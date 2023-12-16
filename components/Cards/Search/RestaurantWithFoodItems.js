import React, { useEffect, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import Star from '../../../assets/icons/Star.svg';
import ShowMore from '../../../assets/icons/backRight.svg';
import FoodItems from './FoodItem';
import { isTimeInIntervals } from '../../../utils';
import Currency from '../../Currency';

const RestaurantWithFoodItems = props => {
    const { restaurant, navigation } = props;
    const foodItems = restaurant.foodItems;
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

    useEffect(() => {
        if (restaurant._id && restaurant._id.timings) {
            setIsRestaurantOpen(isTimeInIntervals(restaurant._id.timings));
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.restaurant}>
                <TouchableOpacity
                    style={Styles.row_space_between}
                    onPress={() => {
                        if (isRestaurantOpen) {
                            navigation.navigate('RestaurantWithMenu', {
                                restaurant: restaurant._id,
                            });
                        }
                    }}>
                    <Text style={styles.titleText}>{restaurant._id.name}</Text>
                    {isRestaurantOpen && <ShowMore />}
                    {!isRestaurantOpen && (
                        <View>
                            <Text
                                style={[
                                    fonts.NUNITO_800_12,
                                    { color: colors.GREY_MEDIUM },
                                ]}>
                                RESTAURANT
                            </Text>
                            <Text
                                style={[
                                    fonts.NUNITO_800_12,
                                    { color: colors.GREY_MEDIUM },
                                ]}>
                                CLOSED
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                {restaurant._id.rating && (
                    <View style={styles.ratingContainer}>
                        <Star />
                        <Text style={[styles.ratings, Styles.margin_05]}>
                            {restaurant._id.rating.value} (
                            {restaurant._id.rating.count} +)
                        </Text>
                    </View>
                )}
            </View>
            <ScrollView
                style={styles.foodItems}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {foodItems &&
                    foodItems.length > 0 &&
                    foodItems.map((foodItem, index) => {
                        return (
                            <FoodItems
                                foodItem={foodItem}
                                key={index}
                                navigation={navigation}
                                restaurant={restaurant._id}
                                isRestaurantOpen={isRestaurantOpen}
                            />
                        );
                    })}
            </ScrollView>
            <View>
                {restaurant._id && restaurant?._id?.costOfTwo >= 0 && (
                    <Text
                        style={[
                            fonts.NUNITO_700_12,
                            { color: colors.GREY_MEDIUM },
                        ]}>
                        <Currency currency={restaurant?._id?.currency} />
                        {restaurant._id.costOfTwo} for one
                    </Text>
                )}
                {/* {restaurant._id &&
          restaurant._id.timings &&
          restaurant._id.timings[0] && (
            <Text style={[fonts.NUNITO_700_10, { color: colors.GREY_MEDIUM }]}>
              {restaurant._id.timings[0].openingTime} -{' '}
              {restaurant._id.timings[0].closingTime}
            </Text>
          )} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        justifyContent: 'center',

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
    titleText: {
        ...fonts.NUNITO_800_14,
        color: colors.BLACK,
    },
    ratingContainer: {
        ...Styles.row_flex_start,
    },
    ratings: {
        ...fonts.NUNITO_600_12,
        ...Styles.default_text_color,
    },
    restaurant: {
        padding: 10,
        paddingBottom: 10,
    },
    foodItems: {},
});

export default RestaurantWithFoodItems;
