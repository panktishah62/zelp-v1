import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DialogTypes } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusOrange from '../../assets/icons/PlusOrange.svg';
import PlusWhite from '../../assets/icons/PlusWhite.svg';
import MinusOrange from '../../assets/icons/MinusOrange.svg';
import MinusWhite from '../../assets/icons/MinusWhite.svg';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../redux/actions/cartActions';
import { hideDialog, showDialog } from '../../redux/actions/dialog';
import { dynamicSize } from '../../utils/responsive';

const AddButton = props => {
    const dispatch = useDispatch();
    let { foodItem, count, mode, isEnabled = true, restaurant } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const cart = useSelector(state => state.cartActions);
    const navigation = useNavigation();
    const colorStyles = {
        primary: mode === 'light' ? colors.ORANGE : colors.WHITE,
        primaryBackground: mode === 'light' ? colors.WHITE : colors.ORANGE,
        secondary: mode === 'light' ? colors.WHITE : colors.ORANGE,
        secondaryBackground: mode === 'light' ? colors.ORANGE : colors.WHITE,
    };
    const [newCount, setNewCount] = useState(count);
    const [token, setToken] = useState(null);

    onPressLogin = () => {
        dispatch(hideDialog());
        navigation.navigate('LogIn');
    };

    const setCart = action => {
        if (currentOrder && currentOrder.cart) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in Progress',
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
                    buttonText1: 'CLOSE',
                    buttonText2: 'LOGIN',
                    buttonFunction2: () => {
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
                    dispatch(addItemToCart(foodItem, restaurant));
                    break;
                case 'SUB':
                    setNewCount(newCount - 1);
                    dispatch(removeItemFromCart(foodItem, restaurant));
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
                    type: DialogTypes.ERROR,
                }),
            );
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);
    return (
        <View>
            {newCount === 0 ? (
                <View>
                    <TouchableOpacity
                        style={styles.cartBtnsContainer}
                        onPress={() => {
                            if (isEnabled) {
                                setCart('ADD');
                            }
                        }}>
                        <View
                            style={[
                                styles.cartBtnsContainer,
                                styles.addBtnPosStyle,
                                styles.shadowStyle,
                                !isEnabled && styles.isNotEnabled,
                                {
                                    backgroundColor:
                                        colorStyles.primaryBackground,
                                },
                            ]}>
                            <Text
                                style={[
                                    fonts.NUNITO_800_10,
                                    { color: colorStyles.primary },
                                    !isEnabled && styles.isNotEnabledText,
                                ]}>
                                Add
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.cartBtnsContainer}>
                    <View
                        style={[
                            Styles.row_space_between,
                            styles.cartBtnStyle,
                            styles.cartBtnPosStyle,
                            {
                                backgroundColor:
                                    colorStyles.secondaryBackground,
                                borderColor: colorStyles.secondary,
                            },
                        ]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (newCount > 0) {
                                    if (isEnabled) {
                                        setCart('SUB');
                                    }
                                }
                            }}
                            hitSlop={{
                                top: dynamicSize(15),
                                bottom: dynamicSize(15),
                                left: dynamicSize(15),
                                right: dynamicSize(15),
                            }}>
                            {colorStyles.secondary === colors.ORANGE ? (
                                <MinusOrange />
                            ) : (
                                <MinusWhite />
                            )}
                            {/* <AntDesign name='minus' size={15} color={colorStyles.secondary} /> */}
                        </TouchableOpacity>
                        <Text
                            style={[
                                styles.cartCountStyle,
                                { color: colorStyles.secondary },
                            ]}>
                            {newCount}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (isEnabled) {
                                    setCart('ADD');
                                }
                            }}
                            hitSlop={{
                                top: dynamicSize(15),
                                bottom: dynamicSize(15),
                                left: dynamicSize(15),
                                right: dynamicSize(15),
                            }}>
                            {colorStyles.secondary === colors.ORANGE ? (
                                <PlusOrange />
                            ) : (
                                <PlusWhite />
                            )}
                            {/* <AntDesign name='plus' size={15} color={colorStyles.secondary} /> */}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cartBtnsContainer: {
        height: 31,
        width: 90,
    },
    cartBtnStyle: {
        height: 31,
        width: 90,
    },
    addBtnPosStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    cartBtnPosStyle: {
        borderRadius: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    cartCountStyle: {
        ...fonts.INTER_700_12,
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
        shadowColor: colors.GREY_MEDIUM,
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {
            width: 25,
            height: 25,
        },
        elevation: 20,
    },
    isNotEnabledText: {
        color: colors.GREY_MEDIUM,
    },
});

export default AddButton;
