import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../../styles';
import Rupee from '../../../assets/icons/rupee.svg';
import OrangeRupee from '../../../assets/icons/orangeRupee.svg';
import { colors } from '../../../styles/colors';

const BillDetails = props => {
    const { cart, isOrderPaid, config } = props;
    return (
        <View>
            <Text style={styles.titleText}>Bill Details</Text>
            <View style={[Styles.margin_10, Styles.center, styles.container]}>
                <View style={styles.subContainer}>
                    {cart && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Item Total</Text>
                            <View style={styles.amount}>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart.totalItemsPrice}
                                </Text>
                            </View>
                        </View>
                    )}
                    {cart && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Delivery Fee</Text>
                            <View style={styles.amount}>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart.deliveryPartnerFees}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.subContainer}>
                    {cart && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Money From Wallet</Text>
                            <View style={styles.amount}>
                                <Text style={styles.priceText}> - </Text>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart.walletMoney}
                                </Text>
                            </View>
                        </View>
                    )}
                    {cart && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>
                                Money From Referral Coins
                            </Text>
                            <View style={styles.amount}>
                                <Text style={styles.priceText}> - </Text>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart?.referralCoinsUsed}
                                </Text>
                            </View>
                        </View>
                    )}
                    {cart && cart.couponDiscount >= 0 && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Coupon Discount</Text>
                            <View style={styles.amount}>
                                <Text style={styles.priceText}> - </Text>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart.couponDiscount}
                                </Text>
                            </View>
                        </View>
                    )}
                    {cart && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>
                                Govt Taxes & Other Charges ({config.GSTtaxes}%)
                            </Text>
                            <View style={styles.amount}>
                                <Rupee />
                                <Text style={styles.priceText}>
                                    {cart?.taxes}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View>
                    {cart && cart._id && (
                        <View style={styles.innerContainer}>
                            {isOrderPaid ? (
                                <Text style={styles.orangeText}>
                                    Amount Paid:
                                </Text>
                            ) : (
                                <Text style={styles.orangeText}>To Pay</Text>
                            )}
                            <View style={styles.amount}>
                                <OrangeRupee />
                                <Text
                                    style={[
                                        styles.priceText,
                                        styles.orangeText,
                                    ]}>
                                    {cart.totalAmount}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
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
    amount: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        ...fonts.NUNITO_800_12,
        ...Styles.default_text_color,
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_MEDIUM,
        margin: 10,
        marginBottom: 0,
    },
    innerContainer: {
        width: dimensions.fullWidth * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    subContainer: {
        marginBottom: 10,
        // marginTop: 10,
        paddingBottom: 5,
        borderBottomColor: colors.BORDER_GREY,
        borderBottomWidth: 1,
    },
    text: {
        ...fonts.NUNITO_500_12,
        ...Styles.default_text_color,
    },
    orangeText: {
        ...fonts.NUNITO_700_12,
        color: colors.ORANGE,
    },
});

export default BillDetails;
