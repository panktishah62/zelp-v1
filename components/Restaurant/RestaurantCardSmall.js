import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import Heart from '../../assets/icons/Heart.svg';
import Star from '../../assets/icons/Star.svg';
import LocationIcon from '../../assets/icons/Vector.svg';
import { colors } from '../../styles/colors';
import {
    DialogTypes,
    GreyColorMatrix,
    isTimeInIntervals,
    sliceText,
} from '../../utils';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import { showDialog } from '../../redux/actions/dialog';
import { useDispatch } from 'react-redux';

const IMAGE_URI = '../../assets/images/restaurant.png';

const RestaurantCard = props => {
    const { restaurantObject, navigation } = props;
    const { restaurant, isRestaurantOpen = false } = restaurantObject;
    const { image, name, costOfTwo } = restaurant;
    const rating = restaurant?.rating?.value;
    const rating_count = restaurant?.rating?.count;

    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (isRestaurantOpen) {
                    navigation.navigate('RestaurantWithMenu', {
                        restaurant: restaurant,
                    });
                } else {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Restaurant Closed',
                            subTitleText: 'Please come back later',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                }
            }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {image && isRestaurantOpen && (
                        <Image source={{ uri: image }} style={styles.image} />
                    )}
                    {image && !isRestaurantOpen && (
                        <ColorMatrix matrix={GreyColorMatrix}>
                            <Image
                                source={{ uri: image }}
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
                                    {rating}{' '}
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_600_6,
                                        Styles.default_text_color,
                                    ]}>
                                    {' '}
                                    ({rating_count}){' '}
                                </Text>
                            </View>
                            {/* <Heart /> */}
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={1}>
                            {name}
                        </Text>
                        <Text
                            style={[
                                fonts.NUNITO_700_8,
                                { color: colors.GREY_MEDIUM },
                            ]}>
                            ₹ {costOfTwo} for one
                        </Text>
                    </View>
                    {isRestaurantOpen && (
                        <View style={styles.distanceContainer}>
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
                            )} */}
                            {restaurantObject?.time && (
                                <Text
                                    style={[
                                        fonts.NUNITO_700_10,
                                        { color: colors.ORANGE },
                                    ]}>
                                    {restaurantObject?.time}
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
                                CLOSED
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
        width: dimensions.fullWidth * 0.45,
        margin: dimensions.fullWidth * 0.02,
        borderRadius: 4,
        height: 114,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.45,
        height: 76,
    },
    image: {
        minHeight: 118,
        width: dimensions.fullWidth * 0.45,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    innerContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: dimensions.fullWidth * 0.45,
        padding: 5,
    },
    ratingContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        padding: 2,
    },
    cuisines: {
        maxWidth: dimensions.fullWidth * 0.45 * 0.4,
        ...Styles.row,
    },
    cuisinesText: {
        color: colors.GREY_DARK,
        ...fonts.NUNITO_500_6,
    },
    titleContainer: {},
    title: {
        maxWidth: dimensions.fullWidth * 0.45 * 0.5,
        ...fonts.NUNITO_700_12,
        color: colors.BLACK,
    },
    bottomContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        ...Styles.row_space_between,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        bottom: 0,
    },
    distanceContainer: {
        alignItems: 'flex-end',
    },
});

export default RestaurantCard;
