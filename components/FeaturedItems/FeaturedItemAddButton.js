import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DialogTypes, isPointInPolygon } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusOrange from '../../assets/icons/PlusOrange.svg';
import PlusWhite from '../../assets/icons/PlusWhite.svg';
import MinusOrange from '../../assets/icons/MinusOrange.svg';
import MinusWhite from '../../assets/icons/MinusWhite.svg';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../redux/actions/cartActions';
import { dynamicSize } from '../../utils/responsive';
import { hideDialog, showDialog } from '../../redux/actions/dialog';

const FeaturedItemAddButton = props => {
    const dispatch = useDispatch();
    let {
        foodItem,
        count,
        mode,
        isEnabled = true,
        restaurant,
        price = null,
        isServableArea,
        isRestaurantOpen,
    } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const cart = useSelector(state => state.cartActions);
    const navigation = useNavigation();
    const colorStyles = {
        primary: mode === 'light' ? colors.ORANGE : colors.WHITE,
        primaryBackground: mode === 'light' ? colors.WHITE : colors.ORANGE,
        secondary: mode === 'light' ? colors.ORANGE : colors.WHITE,
        secondaryBackground: mode === 'light' ? colors.WHITE : colors.ORANGE,
    };
    const [newCount, setNewCount] = useState(count);
    const [token, setToken] = useState(null);

    const onPressLogin = () => {
        navigation.navigate('LogIn');
    };

    const setCart = action => {
        if (currentOrder && currentOrder.cart) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in Progres',
                    subTitleText:
                        'Your Current Order is in Progress, cannot add item to cart',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (token === null) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please LogIn',
                    subTitleText: 'You are not Logged In!',
                    buttonText1: 'LOGIN',
                    buttonFunction1: () => {
                        onPressLogin();
                        dispatch(hideDialog());
                    },
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            switch (action) {
                case 'ADD':
                    if (
                        cart &&
                        cart.restaurants &&
                        Object.keys(cart.restaurants).length === 3
                    ) {
                        if (!(restaurant._id in cart.restaurants)) {
                            dispatch(
                                showDialog({
                                    isVisible: true,
                                    titleText: 'Your Cart is Full',
                                    subTitleText:
                                        'You can order from at max three restaurants at once, please remove items from any one restaurant to add this item.',
                                    buttonText1: 'CLOSE',
                                    type: DialogTypes.WARNING,
                                }),
                            );
                            return;
                        }
                    }
                    setNewCount(newCount + 1);
                    if (price) {
                        let updatedFoodItem = foodItem;
                        updatedFoodItem.price = price;
                        dispatch(addItemToCart(updatedFoodItem, restaurant));
                    } else {
                        dispatch(addItemToCart(foodItem, restaurant));
                    }
                    break;
                case 'SUB':
                    setNewCount(newCount - 1);
                    if (price) {
                        let updatedFoodItem = foodItem;
                        updatedFoodItem.price = price;
                        dispatch(
                            removeItemFromCart(updatedFoodItem, restaurant),
                        );
                    } else {
                        dispatch(removeItemFromCart(foodItem, restaurant));
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const isLoggedIn = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            if (_token != null) {
                setToken(_token);
            }
        } catch (error) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something Went Wrong!',
                    subTitleText: error?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    var Touchable =
        isEnabled && isServableArea
            ? TouchableOpacity
            : TouchableWithoutFeedback;
    return (
        <View>
            {newCount === 0 ? (
                <View>
                    <Touchable
                        style={styles.cartBtnsContainer}
                        onPress={() => {
                            if (isEnabled && isServableArea) {
                                setCart('ADD');
                            }
                        }}>
                        <View
                            style={[
                                styles.cartBtnsContainer,
                                styles.addBtnPosStyle,
                                {
                                    backgroundColor:
                                        colorStyles.primaryBackground,
                                },
                                (!isEnabled || !isServableArea) &&
                                    styles.isNotEnabled,
                            ]}>
                            <Text
                                style={[
                                    fonts.NUNITO_700_12,
                                    { color: colorStyles.primary },
                                    (!isEnabled || !isServableArea) &&
                                        styles.isNotEnabledText,
                                ]}>
                                {!isRestaurantOpen
                                    ? 'RESTAURANT CLOSED'
                                    : !isServableArea
                                    ? 'AREA NOT SERVABLE'
                                    : isEnabled
                                    ? 'Add To Cart'
                                    : 'RESTAURANT CLOSED'}
                            </Text>
                        </View>
                    </Touchable>
                </View>
            ) : (
                <View style={styles.cartBtnsContainer}>
                    <View
                        style={[
                            Styles.row_space_between,
                            styles.cartBtnStyle,
                            styles.cartBtnPosStyle,
                            styles.cartBtnsContainer,
                            {
                                backgroundColor:
                                    colorStyles.secondaryBackground,
                                borderColor: colorStyles.secondaryBackground,
                            },
                        ]}>
                        <Touchable
                            onPress={() => {
                                if (newCount > 0) {
                                    if (isEnabled && isServableArea) {
                                        setCart('SUB');
                                    }
                                }
                            }}>
                            {colorStyles.secondary === colors.ORANGE ? (
                                <MinusOrange />
                            ) : (
                                <MinusWhite />
                            )}
                            {/* <AntDesign name='minus' size={15} color={colorStyles.secondary} /> */}
                        </Touchable>
                        <Text
                            style={[
                                styles.cartCountStyle,
                                { color: colorStyles.secondary },
                            ]}>
                            {newCount}
                        </Text>
                        <Touchable
                            onPress={() => {
                                if (isEnabled && isServableArea) {
                                    setCart('ADD');
                                }
                            }}>
                            {colorStyles.secondary === colors.ORANGE ? (
                                <PlusOrange />
                            ) : (
                                <PlusWhite />
                            )}
                            {/* <AntDesign name='plus' size={15} color={colorStyles.secondary} /> */}
                        </Touchable>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cartBtnsContainer: {
        height: dynamicSize(50),
        width: '100%',
    },
    cartBtnStyle: {
        height: dynamicSize(49),
        width: dynamicSize(250),
    },
    addBtnPosStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: dynamicSize(8),
        borderBottomLeftRadius: dynamicSize(8),
    },
    cartBtnPosStyle: {
        borderBottomRightRadius: dynamicSize(8),
        borderBottomLeftRadius: dynamicSize(8),
        paddingHorizontal: dynamicSize(40),
        borderWidth: dynamicSize(1),
    },
    cartCountStyle: {
        ...fonts.INTER_700_16,
        color: colors.ORANGE,
    },
    shadowStyle: {
        shadowColor: colors.ORANGE,
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 5,
    },
    buttonText: {},
    isNotEnabled: {
        backgroundColor: colors.GREY_MEDIUM,
    },
    isNotEnabledText: {
        color: colors.WHITE,
    },
});

export default FeaturedItemAddButton;
