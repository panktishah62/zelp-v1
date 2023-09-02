import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Heart from '../../../assets/icons/BigHeart.svg';
import Star from '../../../assets/icons/Star.svg';
import ShowMore from '../../../assets/icons/backRight.svg';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import AddButton from '../../Buttons/AddButton';
import { GreyColorMatrix, sliceText } from '../../../utils';
import LocationIcon from '../../../assets/icons/Vector.svg';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import { useSelector } from 'react-redux';
import { dynamicSize } from '../../../utils/responsive';

const FoodItems = props => {
    const {
        foodItem,
        distance,
        time,
        restaurant,
        isRestaurantOpen,
        navigation,
    } = props;

    const myCart = useSelector(state => state.cartActions);
    const [count, setCount] = useState(0);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (myCart.restaurants) {
            if (restaurant._id in myCart.restaurants) {
                if (
                    foodItem._id in myCart.restaurants[restaurant._id].foodItems
                ) {
                    setCount(
                        myCart.restaurants[restaurant._id].foodItems[
                            foodItem._id
                        ].count,
                    );
                    setIsInCart(true);
                }
            }
        } else {
            setCount(0);
            setIsInCart(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <View>
                    <Text style={styles.titleText}>
                        {Platform.OS == 'android'
                            ? sliceText(foodItem.name, 45)
                            : sliceText(foodItem.name, 25)}
                    </Text>
                </View>
                {foodItem.category && (
                    <View>
                        <Text style={styles.subtitleText}>
                            {foodItem.category.name}
                        </Text>
                    </View>
                )}
                {/* <View style={styles.distanceTime}>
                    {distance && isRestaurantOpen && (
                        <View style={Styles.row_flex_start}>
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
                    {time && isRestaurantOpen && (
                        <Text
                            style={[
                                fonts.NUNITO_700_10,
                                { color: colors.ORANGE },
                            ]}>
                            {time}
                        </Text>
                    )}
                </View> */}
                {foodItem.rating && (
                    <View style={styles.ratingContainer}>
                        <Star />
                        <Text style={[styles.ratings, Styles.margin_05]}>
                            {foodItem.rating.value} ({foodItem.rating.count} + )
                        </Text>
                    </View>
                )}
                {foodItem.price && (
                    <Text style={[styles.priceText]}>₹ {foodItem.price}</Text>
                )}
            </View>
            <View style={styles.containerRight}>
                <View style={styles.imageContainer}>
                    {isRestaurantOpen && (
                        <View style={styles.layer}>
                            {foodItem && foodItem.image ? (
                                <Image
                                    source={{
                                        uri: foodItem.image,
                                    }}
                                    style={styles.image}
                                />
                            ) : (
                                <Image
                                    source={require('../../../assets/images/foodItem.png')}
                                    style={styles.image}
                                />
                            )}
                            {/* <Heart style={styles.likeButton} /> */}
                        </View>
                    )}
                    {!isRestaurantOpen && (
                        <View style={styles.layer}>
                            {foodItem && foodItem.image ? (
                                <ColorMatrix matrix={GreyColorMatrix}>
                                    <Image
                                        source={{
                                            uri: foodItem.image,
                                        }}
                                        style={styles.image}
                                    />
                                </ColorMatrix>
                            ) : (
                                <ColorMatrix matrix={GreyColorMatrix}>
                                    <Image
                                        source={require('../../../assets/images/foodItem.png')}
                                        style={styles.image}
                                    />
                                </ColorMatrix>
                            )}
                            {/* <Heart style={styles.likeButton} /> */}
                        </View>
                    )}

                    <View style={styles.buttonStyle}>
                        {foodItem && isInCart && (
                            <AddButton
                                foodItem={foodItem}
                                count={count}
                                style={styles.button}
                                restaurant={restaurant}
                                isEnabled={isRestaurantOpen}
                                mode={'light'}
                            />
                        )}
                        {foodItem && !isInCart && (
                            <AddButton
                                foodItem={foodItem}
                                count={count}
                                style={styles.button}
                                restaurant={restaurant}
                                isEnabled={isRestaurantOpen}
                                mode={'light'}
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: dynamicSize(160),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        margin: 10,
        marginBottom: 25,
        backgroundColor: colors.ORANGE_LIGHT,
        // borderColor: colors.BORDER_GREY,
        // borderWidth: 1,
        borderRadius: 5,
        width: dimensions.fullWidth * 0.85,
    },
    image: {
        height: dynamicSize(160),
        // width: dynamicSize(160),
        width: (dimensions.fullWidth * 0.85) / 2,
        // borderRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        opacity: 0.5,
    },
    likeButton: {
        margin: 10,
        right: 0,
        position: 'absolute',
    },
    layer: {
        backgroundColor: colors.BLACK,
        // borderRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    imageContainer: {
        // borderRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        // height: 130,
        alignItems: 'center',
        // position: 'absolute',
        // width: 100,
    },
    containerLeft: {
        // margin: 15,
        // width: (dimensions.fullWidth - 100) / 2,
        width: (dimensions.fullWidth * 0.85) / 2,
        width: '50%',
        borderRadius: 20,
        ...Platform.select({
            ios: {
                paddingHorizontal: dynamicSize(15),
                paddingVertical: dynamicSize(10),
            },
            android: {
                padding: dynamicSize(15),
            },
        }),
    },
    containerRight: {
        width: (dimensions.fullWidth * 0.85) / 2,
        // margin: 20,
        // flexDirection: 'column',
        // height: 100,
        // width: (dimensions.fullWidth - 100) / 2,
    },
    ratingContainer: {
        ...Styles.row_flex_start,
    },
    titleText: {
        ...Styles.default_text_color,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_700_12,
            },
            android: {
                ...fonts.NUNITO_700_14,
            },
        }),
    },
    ratings: {
        ...fonts.NUNITO_600_12,
        ...Styles.default_text_color,
    },
    subtitleText: {
        ...fonts.NUNITO_700_12,
        color: colors.GREY_MEDIUM,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_700_10,
            },
            android: {
                ...fonts.NUNITO_700_12,
            },
        }),
    },
    moreDetails: {
        width: 110,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.GREY_MEDIUM,
    },
    buttonStyle: {
        position: 'absolute',
        bottom: -15,
        borderRadius: 5,
    },
    distanceTime: {
        marginVertical: 3,
    },
    isNotEnabledText: {
        color: colors.GREY_MEDIUM,
    },
    priceText: {
        color: colors.BLACK,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_800_12,
            },
            android: {
                ...fonts.NUNITO_800_14,
            },
        }),
    },
});

export default FoodItems;
