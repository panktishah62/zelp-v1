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
import Heart from '../../assets/icons/BigHeart.svg';
import Star from '../../assets/icons/Star.svg';
import LocationIcon from '../../assets/icons/Vector.svg';
import { GreyColorMatrix, isTimeInIntervals, sliceText } from '../../utils';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';

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

const RestaurantCardInfo = ({ restaurant, distance, time, navigation }) => {
    const [cuisines, setCuisines] = useState([]);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
    useEffect(() => {
        const newCategory = [];
        if (restaurant && restaurant.category) {
            restaurant.category.map((cat, index) => {
                newCategory.push(cat.name);
            });
            setCuisines(newCategory);
        } else if (restaurant && restaurant?.tags?.length > 0) {
            restaurant.tags.map((cat, index) => {
                newCategory.push(cat);
            });
            setCuisines(newCategory);
        }
        if (restaurant && restaurant.timings) {
            setIsRestaurantOpen(isTimeInIntervals(restaurant.timings));
        }
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (isRestaurantOpen) {
                    navigation.navigate('RestaurantWithMenu', {
                        restaurant: restaurant,
                    });
                }
            }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.layer}>
                        {restaurant && restaurant.image && isRestaurantOpen && (
                            <Image
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
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.title}>{restaurant.name}</Text>
                        {cuisines && <Cuisines cuisines={cuisines} />}

                        {restaurant && restaurant.priceForOne && (
                            <Text
                                style={[
                                    fonts.NUNITO_700_12,
                                    { color: colors.GREY_MEDIUM },
                                ]}>
                                {restaurant.priceForOne} for one
                            </Text>
                        )}
                    </View>
                    {isRestaurantOpen && (
                        <View>
                            {/* {distance && (
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
                            )} */}
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
        height: 141,
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        minHeight: 141,
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
        minWidth: dimensions.fullWidth * 0.5,
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
        // margin: 5,
        ...fonts.NUNITO_800_14,
        color: colors.BLACK,
    },
    bottomContainer: {
        padding: 10,
        ...Styles.row_space_between,
        height: 57,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
});

export default RestaurantCardInfo;
