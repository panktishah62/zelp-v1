import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Platform } from 'react-native';
import VegIcon from '../../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../../assets/icons/nonveg.svg';
import { showDialogBox, sliceText } from '../../../utils';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import Rupee from '../../../assets/icons/rupee.svg';
import { format, parseISO } from 'date-fns';
import { PrimarySmallButton } from '../../Buttons/PrimarySmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import {
    addToCartForReorder,
    resetCartActions,
} from '../../../redux/actions/cartActions';
import { hideDialogBox } from '../../../utils';

const FoodItemField = props => {
    let { foodItem, navigation } = props;
    return (
        <View style={styles.container}>
            {foodItem && foodItem.id && foodItem.id.name && (
                <View style={styles.leftContainer}>
                    <View style={styles.icon}>
                        {foodItem.id.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            {foodItem.count} x {sliceText(foodItem.id.name, 30)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const getFormattedDate = timestamp => {
    const dateObj = new Date(parseISO(timestamp));
    const formattedDate = format(dateObj, "do 'of' MMMM yyyy, h:mm a");
    return formattedDate;
};

const OrderCardComponent = props => {
    const {
        order,
        canReOrder = true,
        navigation,
        isOrderDetail = false,
    } = props;
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cartActions);
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);

    const [statusColor, setStatusColor] = useState(
        order.orderStatus
            ? order.orderStatus == 'Canceled'
                ? colors.RED
                : colors.GREEN
            : colors.GREEN,
    );

    const reorderCart = () => {
        if (myCart && myCart.restaurants) {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: 'Your Cart is not empty',
                textBody: 'Empty your cart to reorder?',
                button: 'Empty Cart',
                closeOnOverlayTap: true,
                onPressButton: () => {
                    dispatch(resetCartActions());
                    dispatch(addToCartForReorder(order._id));
                    hideDialogBox();
                    navigation.navigate('Cart');
                },
            });
        } else if (currentOrder && currentOrder._id) {
            showDialogBox(
                'Order in progress',
                'Your Current Order is in Progress, cannot add item to cart',
                'warning',
                'OK',
                true,
            );
        } else if (order && order.cart && order.cart._id) {
            dispatch(addToCartForReorder(order._id));
            navigation.navigate('Cart');
        }
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.foodItemContainer}>
                {order.cart &&
                    order.cart.foodItems &&
                    order.cart.foodItems.map((foodItem, index) => {
                        return (
                            <View key={index}>
                                <FoodItemField
                                    foodItem={foodItem}
                                    navigation={navigation}
                                />
                            </View>
                        );
                    })}
            </View>
            <View style={[styles.container, styles.dateContainer]}>
                {order.createdAt && (
                    <Text style={Styles.default_text_color}>
                        {getFormattedDate(order.createdAt)}
                    </Text>
                )}
                {order.cart && order.cart._id && (
                    <View style={Styles.row_flex_start}>
                        <Rupee />
                        <Text style={Styles.default_text_color}>
                            {' '}
                            {order.cart.totalAmount}
                        </Text>
                    </View>
                )}
            </View>
            <View
                style={[Styles.row_space_between, styles.totalAmountContainer]}>
                {order.orderStatus && (
                    <Text style={[{ color: statusColor }, styles.statusText]}>
                        {order.orderStatus}
                    </Text>
                )}
                <View style={Styles.row}>
                    {canReOrder && (
                        <PrimarySmallButton
                            text={'Reorder'}
                            onClick={() => {
                                reorderCart();
                            }}
                        />
                    )}
                    {canReOrder && !isOrderDetail && (
                        <PrimarySmallButton
                            text={'View Info'}
                            onClick={() => {
                                navigation.navigate('OrderDetailsScreen', {
                                    order: order,
                                });
                            }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 5,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    container: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        width: dimensions.fullWidth / 2.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        ...fonts.NUNITO_800_12,
    },
    icon: {
        margin: 10,
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        ...Styles.default_text_color,
    },
    foodItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER_GREY,
    },
    dateContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.BORDER_GREY,
        margin: 10,
        paddingBottom: 10,
    },
    totalAmountContainer: {
        margin: 5,
        marginHorizontal: 10,
    },
    statusText: {
        ...fonts.NUNITO_800_12,
    },
});
export default OrderCardComponent;
