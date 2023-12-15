import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';
import AddButton from '../Buttons/AddButton';
import VegIcon from '../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../assets/icons/nonveg.svg';
import StarIcon from '../../assets/icons/Star.svg';
import Currency from '../Currency';

const { height, width } = Dimensions.get('window');

const DishListItem = ({ dishDetails, restaurant }) => {
    const [foodItem, setFoodItem] = useState(dishDetails);
    const myCart = useSelector(state => state.cartActions);
    const [count, setCount] = useState();
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

    return (
        <View style={styles.mainContainer}>
            <View style={[Styles.row_space_between, styles.container]}>
                <View style={styles.foodItemRow}>
                    {dishDetails.isVeg ? (
                        <VegIcon style={styles.icon} />
                    ) : (
                        <NonVegIcon style={styles.icon} />
                    )}
                    <View>
                        <View style={styles.itemName}>
                            <Text
                                style={[
                                    fonts.NUNITO_700_14,
                                    styles.pt8,
                                    { width: dimensions.fullWidth * 0.5 },
                                ]}>
                                {/* {sliceText(dishDetails.name, 20)} */}
                                {dishDetails.name}
                            </Text>
                        </View>
                        <View style={[Styles.row_flex_start, styles.pt8]}>
                            <StarIcon />
                            <Text
                                style={[
                                    fonts.NUNITO_600_12,
                                    Styles.default_text_color,
                                ]}>
                                {`${dishDetails.rating.value}(${dishDetails.rating.count}+)`}
                            </Text>
                        </View>
                        <Text style={[fonts.NUNITO_800_14, styles.pt8]}>
                            <Currency currency={restaurant?.currency} />{' '}
                            {dishDetails.price}
                        </Text>
                    </View>
                </View>

                <View style={[Styles.center, styles.rightSideStyle]}>
                    <Image
                        style={styles.dishImageStyle}
                        source={{
                            uri: dishDetails.image,
                        }}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonStyle}>
                        {foodItem && isInCart && (
                            <AddButton
                                foodItem={foodItem}
                                count={count}
                                style={styles.button}
                                restaurant={restaurant}
                                mode={'light'}
                            />
                        )}
                        {foodItem && !isInCart && (
                            <AddButton
                                foodItem={foodItem}
                                count={0}
                                style={styles.button}
                                restaurant={restaurant}
                                mode={'light'}
                            />
                        )}
                    </View>
                </View>
            </View>

            {/* <Divider /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 25,
        paddingTop: 5,
        borderBottomColor: colors.BORDER_GREY,
        borderBottomWidth: 1,
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
    },
    foodTypeStyle: { height: height * 0.02, width: width * 0.04 },
    pt8: {
        paddingTop: 8,
        ...Styles.default_text_color,
    },
    dishImageStyle: {
        height: height * 0.13,
        width: width * 0.28,
        borderRadius: 10,
    },
    rightSideStyle: { position: 'relative', top: 10 },
    cartBtnsContainer: {
        height: height * 0.04,
        width: width * 0.2,
    },
    cartBtnStyle: {
        height: height * 0.04,
        width: width * 0.2,
    },
    addBtnPosStyle: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cartBtnPosStyle: {
        backgroundColor: '#FD7A33',
        position: 'absolute',
        bottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    buttonStyle: {
        position: 'absolute',
        bottom: -10,
        borderRadius: 5,
    },
    cartCountStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.WHITE,
    },
    shadowStyle: {
        shadowColor: '#FD7A3366',
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {
            width: 15,
            height: 15,
        },
        elevation: 20,
    },
    foodItemRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    icon: {
        marginTop: 15,
        marginRight: 15,
    },
    itemName: {
        width: dimensions.fullWidth * 0.5,
    },
});
export default DishListItem;
