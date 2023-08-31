import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import VegIcon from '../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../assets/icons/nonveg.svg';
import StarIcon from '../../assets/icons/Star.svg';
import { Styles, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import {
    GreyColorMatrix,
    isPointInPolygon,
    isPointInRadius,
    isTimeInIntervals,
    sliceText,
} from '../../utils';
import { dynamicSize } from '../../utils/responsive';
import FeaturedItemAddButton from './FeaturedItemAddButton';
import { useSelector } from 'react-redux';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';

const FeaturedItem = props => {
    const { item, navigation } = props;

    const myCart = useSelector(state => state.cartActions);
    const [count, setCount] = useState();
    const [isInCart, setIsInCart] = useState(false);
    const [foodItem, setFoodItem] = useState(item?.foodItem);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const location = useSelector(state => state.address.location);
    const [isServableArea, setIsServableArea] = useState(false);

    useEffect(() => {
        if (myCart.restaurants) {
            if (item?.foodItem?.restaurant?._id in myCart.restaurants) {
                if (
                    foodItem._id in
                    myCart.restaurants[item?.foodItem?.restaurant?._id]
                        .foodItems
                ) {
                    setCount(
                        myCart.restaurants[item?.foodItem?.restaurant?._id]
                            .foodItems[foodItem._id].count,
                    );
                    setFoodItem(foodItem);
                    setIsInCart(true);
                }
            }
        } else {
            setCount(0);
            setFoodItem(foodItem);
            setIsInCart(false);
        }
    }, [myCart]);

    useEffect(() => {
        if (item?.foodItem?.restaurant?.timings) {
            setIsRestaurantOpen(
                isTimeInIntervals(item?.foodItem?.restaurant?.timings),
            );
        }
    }, []);

    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            const isServableArea_ = isPointInPolygon([
                location.latitude,
                location.longitude,
            ]);
            setIsServableArea(isServableArea_);
            if (isServableArea_) {
                setIsServableArea(
                    isPointInRadius(
                        location.latitude,
                        location.longitude,
                        item?.foodItem?.restaurant?.address?.latitude,
                        item?.foodItem?.restaurant?.address?.longitude,
                        item?.foodItem?.restaurant?.serviceableRadius,
                    ),
                );
            }
        }
        // console.log(
        //     'item?.foodItem?.restaurant?.serviceableRadius',
        //     item?.foodItem?.restaurant?.serviceableRadius,
        // );
    }, [location]);

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <View style={styles.leftContainer}>
                    {isRestaurantOpen && isServableArea ? (
                        <Image
                            source={{ uri: item?.foodItem?.image }}
                            style={styles.image}
                        />
                    ) : (
                        <ColorMatrix matrix={GreyColorMatrix}>
                            <Image
                                source={{ uri: item?.foodItem?.image }}
                                style={styles.image}
                            />
                        </ColorMatrix>
                    )}
                </View>
                <View style={styles.rightContainer}>
                    {item?.foodItem?.isVeg ? (
                        <VegIcon style={styles.icon} />
                    ) : (
                        <NonVegIcon style={styles.icon} />
                    )}
                    <Text style={styles.titleText}>
                        {sliceText(item?.foodItem?.name, 25)}
                    </Text>
                    <View style={Styles.row_flex_start}>
                        <StarIcon />
                        <Text style={styles.ratingsText}>
                            {' ' + item?.foodItem?.rating?.value + ' '}
                        </Text>
                        <Text style={styles.ratingsText}>
                            ({item?.foodItem?.rating?.count}+)
                        </Text>
                    </View>

                    <Text style={styles.subtitleText}>₹ {item?.price}</Text>
                    <Text style={styles.titleTextBold}>
                        {sliceText(item?.foodItem?.restaurant?.name, 30)}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {foodItem && isInCart && (
                    <FeaturedItemAddButton
                        foodItem={foodItem}
                        count={count}
                        restaurant={item?.foodItem?.restaurant}
                        mode={'dark'}
                        navigation={navigation}
                        isEnabled={isRestaurantOpen}
                        price={item?.price ? Number(item?.price) : null}
                        isServableArea={isServableArea}
                    />
                )}
                {foodItem && !isInCart && (
                    <FeaturedItemAddButton
                        foodItem={foodItem}
                        count={0}
                        restaurant={item?.foodItem?.restaurant}
                        mode={'dark'}
                        navigation={navigation}
                        isEnabled={isRestaurantOpen}
                        price={item?.price ? Number(item?.price) : null}
                        isServableArea={isServableArea}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dynamicSize(260),
        height: dynamicSize(160),
        backgroundColor: colors.WHITE,
        margin: dynamicSize(10),
        borderRadius: dynamicSize(10),
    },
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: dynamicSize(110),
    },
    bottomContainer: {
        bottom: 0,
    },
    leftContainer: {
        width: dynamicSize(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
        width: dynamicSize(160),
        height: dynamicSize(110),
        paddingVertical: dynamicSize(10),
    },
    icon: {},
    image: {
        height: dynamicSize(90),
        width: dynamicSize(80),
        borderRadius: dynamicSize(8),
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        color: colors.BLACK,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_700_12,
            },
        }),
    },
    subtitleText: {
        ...fonts.NUNITO_800_12,
        color: colors.BLACK,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_800_10,
            },
        }),
    },
    ratingsText: {
        ...fonts.NUNITO_600_12,
        color: colors.BLACK,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_600_10,
            },
        }),
    },
    titleTextBold: {
        marginTop: dynamicSize(10),
        ...fonts.NUNITO_800_12,
        color: colors.BLACK,
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_800_10,
            },
        }),
    },
});
export default FeaturedItem;
