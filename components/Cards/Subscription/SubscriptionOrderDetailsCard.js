import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles/colors';
import { dimensions, fonts, Styles } from '../../../styles';
import VegIcon from '../../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../../assets/icons/nonveg.svg';
import { sliceText } from '../../../utils';
import { format, parseISO } from 'date-fns';

const FoodItemField = props => {
    let { foodItem, count, navigation } = props;
    return (
        <View style={styles.container}>
            {foodItem && foodItem.name && (
                <View style={styles.leftContainer}>
                    <View style={styles.icon}>
                        {foodItem.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            {count} x {sliceText(foodItem.name, 30)}
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

const SubscriptionOrderDetailsCard = props => {
    const { order, navigation } = props;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.foodItemContainer}>
                {order?.subscriptionOrder && order.subscriptionOrder?.combo && (
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText}>
                            {order.subscriptionOrder?.combo?.title}
                        </Text>
                    </View>
                )}
                {order?.subscriptionOrder &&
                    order.subscriptionOrder?.combo?.FoodItems &&
                    order.subscriptionOrder.combo.FoodItems.map(
                        (foodItem, index) => {
                            return (
                                <View key={index}>
                                    <FoodItemField
                                        foodItem={foodItem}
                                        count={1}
                                    />
                                </View>
                            );
                        },
                    )}
            </View>
            <View style={[styles.container, styles.dateContainer]}>
                {order.createdAt && (
                    <Text style={Styles.default_text_color}>
                        {getFormattedDate(order.createdAt)}
                    </Text>
                )}
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
    titleTextContainer: {
        marginBottom: 10,
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
    activityIndicator: {
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
});

export default SubscriptionOrderDetailsCard;
