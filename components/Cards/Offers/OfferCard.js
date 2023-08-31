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
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import Heart from '../../../assets/icons/Heart.svg';
import Star from '../../../assets/icons/Star.svg';
import LocationIcon from '../../../assets/icons/Vector.svg';
import {
    DialogTypes,
    GreyColorMatrix,
    isTimeInIntervals,
    sliceText,
} from '../../../utils';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import { showDialog } from '../../../redux/actions/dialog';
import { useDispatch } from 'react-redux';

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

const OfferCard = ({ restaurant, distance, time, navigation }) => {
    const [cuisines, setCuisines] = useState([]);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
    const dispatch = useDispatch();
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
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Restaurant Closed',
                            subTitleText: 'Please come back after some time',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
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
                                {/* <Heart /> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth * 0.95,
        margin: 10,
        borderRadius: 10,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.95,
        height: 180,
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderRadius: 10,
    },
    image: {
        minHeight: 180,
        width: dimensions.fullWidth * 0.95,
        borderRadius: 10,
        // opacity: 0.5,
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

export default OfferCard;
