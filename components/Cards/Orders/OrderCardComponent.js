import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';
import VegIcon from '../../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../../assets/icons/nonveg.svg';
import { DialogTypes, sliceText } from '../../../utils';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import Rupee from '../../../assets/icons/rupee.svg';
import { format, parseISO } from 'date-fns';
import { PrimarySmallButton } from '../../Buttons/PrimarySmallButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCartForReorder,
    resetCartActions,
} from '../../../redux/actions/cartActions';
import { hideDialog, showDialog } from '../../../redux/actions/dialog';
import Currency from '../../Currency';
import { dynamicSize } from '../../../utils/responsive';

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
    const [isLoading, setIsLoading] = useState(false);
    const [restToItems, setRestToItems] = useState({});
    const [statusColor, setStatusColor] = useState(
        order.orderStatus
            ? order.orderStatus == 'Canceled'
                ? colors.RED
                : colors.GREEN
            : colors.GREEN,
    );

    useEffect(() => {
        let rest = restToItems;
        order.cart.foodItems.map(item => {
            // console.log('item?.id?.restaurant', item?.id?.restaurant, item);
            if (!rest[item?.id?.restaurant?._id]) {
                rest[item?.id?.restaurant?._id] = [];
            }
            if (rest[item?.id?.restaurant?._id]) {
                rest[item?.id?.restaurant?._id].push(item);
            }
            setRestToItems(rest);
        });
    }, [order]);

    const reorderCart = () => {
        if (myCart && myCart.restaurants) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Your Cart is not empty',
                    subTitleText: 'Empty your cart to reorder?',
                    buttonText1: 'Empty Cart',
                    buttonFunction1: () => {
                        setIsLoading(true);
                        dispatch(resetCartActions());
                        dispatch(
                            addToCartForReorder(order._id, () => {
                                navigation.navigate('Cart');
                                setIsLoading(false);
                            }),
                        );
                        dispatch(hideDialog());
                    },
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (currentOrder && currentOrder._id) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in progress',
                    subTitleText:
                        'Your Current Order is in Progress, cannot add item to cart',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (order && order.cart && order.cart._id) {
            setIsLoading(true);
            dispatch(
                addToCartForReorder(order._id, () => {
                    navigation.navigate('Cart');
                    setIsLoading(false);
                }),
            );
        }
    };
    return (
        <>
            {!isLoading && (
                <View style={styles.mainContainer}>
                    <View style={styles.foodItemContainer}>
                        {Object.keys(restToItems).map((rest, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.titleTextRest}>
                                        {
                                            restToItems[rest][0]?.id.restaurant
                                                ?.name
                                        }
                                    </Text>
                                    {restToItems[rest].map(
                                        (foodItem, index) => {
                                            return (
                                                <View key={index}>
                                                    <FoodItemField
                                                        foodItem={foodItem}
                                                        navigation={navigation}
                                                    />
                                                </View>
                                            );
                                        },
                                    )}
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
                                <Text style={Styles.default_text_color}>
                                    <Currency
                                        currency={
                                            order?.cart?.address?.currency
                                        }
                                    />{' '}
                                    {order.cart.totalAmount}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View
                        style={[
                            Styles.row_space_between,
                            styles.totalAmountContainer,
                        ]}>
                        {order.orderStatus && (
                            <Text
                                style={[
                                    { color: statusColor },
                                    styles.statusText,
                                ]}>
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
                                        navigation.navigate(
                                            'OrderDetailsScreen',
                                            {
                                                order: order,
                                            },
                                        );
                                    }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            )}
            {isLoading && (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator color={colors.ORANGE} size={32} />
                </View>
            )}
        </>
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
    titleTextRest: {
        ...fonts.NUNITO_800_18,
        color: colors.GREY_MEDIUM,
        margin: dynamicSize(10),
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
    activityIndicator: {
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
});
export default OrderCardComponent;
