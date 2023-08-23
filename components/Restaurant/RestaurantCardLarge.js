import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import Heart from '../../assets/icons/Heart.svg';
import Star from '../../assets/icons/Star.svg';
import LocationIcon from '../../assets/icons/Vector.svg';
import {
    GreyColorMatrix,
    isTimeInIntervals,
    showDialogBox,
    sliceText,
} from '../../utils';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import FastImage from 'react-native-fast-image';

const Cuisines = ({ cuisines }) => {
    return (
        <View style={styles.cuisines}>
            {cuisines && (
                <Text style={styles.cuisinesText}>
                    {sliceText(cuisines.slice(0, 3).toString(), 40)}
                </Text>
            )}
        </View>
    );
};

const RestaurantCardLarge = ({ restaurant, distance, time, navigation }) => {
    const [cuisines, setCuisines] = useState([]);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
    useEffect(() => {
        const newCategory = [];
        if (restaurant && restaurant.category) {
            restaurant.category.map((cat, index) => {
                newCategory.push(cat.name);
            });
        }
        setCuisines(newCategory);
        if (restaurant.timings) {
            setIsRestaurantOpen(isTimeInIntervals(restaurant.timings));
        }
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (isRestaurantOpen) {
                    navigation.navigate('RestaurantWithMenu', {
                        restaurant: restaurant,
                        distance: distance,
                        time: time,
                    });
                } else {
                    showDialogBox(
                        'Restaurant Closed',
                        'Please come back after some time',
                        'warning',
                        'OK',
                        true,
                    );
                }
            }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.layer}>
                        {restaurant && restaurant.image && isRestaurantOpen && (
                            <FastImage
                                source={{ uri: restaurant.image }}
                                style={styles.image}
                            />
                        )}
                        {restaurant &&
                            restaurant.image &&
                            !isRestaurantOpen && (
                                <ColorMatrix matrix={GreyColorMatrix}>
                                    <Image
                                        source={{ uri: restaurant.image }}
                                        style={styles.image}
                                    />
                                </ColorMatrix>
                            )}
                        <View style={styles.innerContainer}>
                            <View
                                style={[
                                    styles.topContainer,
                                    Styles.row_space_between,
                                ]}>
                                {restaurant && restaurant.rating && (
                                    <View
                                        style={[
                                            styles.ratingContainer,
                                            Styles.row_flex_start,
                                        ]}>
                                        <Star />
                                        <Text
                                            style={[
                                                fonts.NUNITO_600_6,
                                                Styles.default_text_color,
                                            ]}>
                                            {' '}
                                            {restaurant.rating.value}{' '}
                                        </Text>
                                        <Text
                                            style={[
                                                fonts.NUNITO_600_6,
                                                Styles.default_text_color,
                                            ]}>
                                            {' '}
                                            ({restaurant.rating.count}){' '}
                                        </Text>
                                    </View>
                                )}
                                {/* <Heart /> */}
                            </View>
                            <View style={styles.titleContainer}>
                                {restaurant && restaurant.name && (
                                    <Text style={styles.title}>
                                        {restaurant.name}
                                    </Text>
                                )}
                                {cuisines && <Cuisines cuisines={cuisines} />}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        {restaurant && restaurant.costOfTwo && (
                            <Text
                                style={[
                                    fonts.NUNITO_700_12,
                                    { color: colors.GREY_MEDIUM },
                                ]}>
                                ₹ {restaurant.costOfTwo} for one
                            </Text>
                        )}
                        {/* {restaurant && restaurant.timings && (
              <Text
                style={[fonts.NUNITO_700_10, { color: colors.GREY_MEDIUM }]}
              >
                {restaurant.timings[0].openingTime} -{' '}
                {restaurant.timings[0].closingTime}
              </Text>
            )} */}
                    </View>
                    {isRestaurantOpen && (
                        <View>
                            {distance && (
                                <View style={Styles.row}>
                                    <LocationIcon />

                                    <Text
                                        style={[
                                            fonts.NUNITO_700_10,
                                            { color: colors.ORANGE },
                                        ]}>
                                        {' '}
                                        {distance}
                                    </Text>
                                </View>
                            )}
                            {time && (
                                <Text
                                    style={[
                                        fonts.NUNITO_700_10,
                                        { color: colors.ORANGE },
                                    ]}>
                                    {time}
                                </Text>
                            )}
                        </View>
                    )}
                    {!isRestaurantOpen && (
                        <View>
                            <Text
                                style={[
                                    fonts.NUNITO_800_12,
                                    { color: colors.GREY_MEDIUM },
                                ]}>
                                RESTAURANT CLOSED
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth * 0.95,
        margin: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.95,
        height: 118,
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        minHeight: 118,
        width: dimensions.fullWidth * 0.95,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        opacity: 0.5,
    },
    innerContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: dimensions.fullWidth * 0.95,
        padding: 5,
    },
    ratingContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        padding: 2,
    },
    cuisines: {
        backgroundColor: colors.WHITE,
        opacity: 0.5,
        borderRadius: 7,
        height: 19,
        minWidth: dimensions.fullWidth * 0.5,
        ...Styles.row,
    },
    cuisinesText: {
        color: colors.BLACK,
        ...fonts.NUNITO_500_8,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 5,
        ...fonts.NUNITO_800_14,
        color: colors.WHITE,
    },
    bottomContainer: {
        padding: 10,
        ...Styles.row_space_between,
        height: 43,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
});

export default RestaurantCardLarge;
