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

const RestaurantWithItems = props => {
    const { restaurant, items, navigation } = props;

    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

    useEffect(() => {
        if (items[0].restaurant._id && items[0].restaurant.timings) {
            setIsRestaurantOpen(isTimeInIntervals(items[0].restaurant.timings));
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
                                restaurant: restaurant,
                            });
                        }
                    }}>
                    <Text style={styles.titleText}>{restaurant?.name}</Text>
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
                {restaurant.rating && (
                    <View style={styles.ratingContainer}>
                        <Star />
                        <Text style={[styles.ratings, Styles.margin_05]}>
                            {restaurant.rating.value} ({restaurant.rating.count}{' '}
                            +)
                        </Text>
                    </View>
                )}
            </View>
            <ScrollView
                style={styles.foodItems}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {items &&
                    items.length > 0 &&
                    items.map((foodItem, index) => {
                        return (
                            <FoodItems
                                foodItem={foodItem}
                                key={index}
                                navigation={navigation}
                                restaurant={restaurant}
                                isRestaurantOpen={isRestaurantOpen}
                                category={foodItem?.category}
                            />
                        );
                    })}
            </ScrollView>
            <View>
                {items[0].restaurant && items[0]?.restaurant.costOfTwo >= 0 && (
                    <Text
                        style={[
                            fonts.NUNITO_700_12,
                            { color: colors.GREY_MEDIUM },
                        ]}>
                        <Currency currency={items[0]?.restaurant?.currency} />
                        {items[0]?.restaurant.costOfTwo} for one
                    </Text>
                )}
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

export default RestaurantWithItems;
