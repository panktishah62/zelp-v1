import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '../../assets/icons/ShoppingCart.svg';
import ShoppingCartWhiteIcon from '../../assets/icons/ShoppingCartWhite.svg';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { DialogTypes } from '../../utils';
import { showDialog } from '../../redux/actions/dialog';

const CartButton = props => {
    const foodItemsCount = useSelector(
        state => state.cartActions.foodItemsCount,
    );
    const dispatch = useDispatch();
    const [itemCountInCart, setItemCountInCart] = useState(0);
    const { navigation, color } = props;

    useEffect(() => {
        setItemCountInCart(foodItemsCount);
    }, [foodItemsCount, navigation]);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (foodItemsCount) {
                    navigation.navigate('Cart');
                } else {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Cart is Empty',
                            subTitleText: 'Please add some Items!',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                }
            }}>
            <View style={styles.container}>
                {color === 'WHITE' ? (
                    <ShoppingCartWhiteIcon />
                ) : (
                    <ShoppingCartIcon />
                )}
                {itemCountInCart > 0 && (
                    <View style={styles.count}>
                        <Text style={styles.countText}>{itemCountInCart}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        position: 'absolute',
        top: 0,
        right: -6,
        backgroundColor: colors.RED,
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
    },
});

export default CartButton;
