import React from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Text, View } from 'react-native';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
import { Styles, dimensions, fonts } from '../../../styles';
import CardIcon from '../../../assets/icons/FrokerLogo.svg';
import { useDispatch } from 'react-redux';
import { redeemCoupon, redeemWallet } from '../../../redux/actions/cartActions';
import { applySubscriptionCoupon } from '../../../redux/actions/subscriptionCoupon';

const CouponCard = props => {
    const { coupon, isActive = false, navigation, isSubscription } = props;
    const dispatch = useDispatch();
    const code = coupon.name;
    const typeOfDiscount = coupon.discount.type;
    const type = typeOfDiscount == 'fixed' ? '/-' : '%';
    const typeOf = typeOfDiscount == 'fixed' ? 'FLAT OFF' : 'DISCOUNT';
    const minOrderValue = coupon?.bagConstraints?.minOrderAmount;
    const valueUpto = coupon?.commonConstraints?.valueUpto;
    const description = coupon?.description;
    let applicablePaymentMethods = [
        coupon.bagConstraints
            ? coupon?.bagConstraints?.applicablePaymentMethods?.map(item => {
                  return item === 'OTHERS'
                      ? 'Pay using wallet/card'
                      : 'Cash On delivery';
              })
            : ['OTHERS'],
    ];
    applicablePaymentMethods = applicablePaymentMethods.join(',');

    const Touchable = isActive ? TouchableOpacity : View;

    const applyCoupon = () => {
        if (isSubscription) {
            dispatch(applySubscriptionCoupon(coupon));
            navigation.goBack();
        } else {
            dispatch(redeemCoupon(coupon));
            navigation.goBack();
        }
    };

    const redeemWalletAmount = () => {
        dispatch(redeemWallet(coupon));
        navigation.goBack();
    };

    return (
        <Touchable
            style={[
                styles.container,
                isActive ? styles.activeContainer : styles.inActiveContainer,
            ]}
            onPress={() => {
                if (coupon?.bagConstraints?.isApplicableOnWallet) {
                    redeemWalletAmount();
                } else {
                    applyCoupon();
                }
            }}>
            <View
                style={[
                    styles.leftContainer,
                    isActive
                        ? styles.activeLeftContainer
                        : styles.inActiveLeftContainer,
                ]}>
                <Text style={styles.leftTitleText}>{typeOf}</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.titleContainer}>
                    <View style={Styles.row_flex_start}>
                        <CardIcon
                            height={dynamicSize(25)}
                            width={dynamicSize(25)}
                        />
                        <Text style={styles.titleText}>{code}</Text>
                    </View>

                    {isActive ? (
                        coupon?.bagConstraints?.isApplicableOnWallet ? (
                            <TouchableWithoutFeedback
                                onPress={() => redeemWalletAmount()}>
                                <Text style={styles.activeText}>
                                    Redeem Furos
                                </Text>
                            </TouchableWithoutFeedback>
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() => applyCoupon()}>
                                <Text style={styles.activeText}>
                                    Avail Coupon
                                </Text>
                            </TouchableWithoutFeedback>
                        )
                    ) : (
                        <View>
                            <Text style={styles.inActiveText}>
                                Not Applicable
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                    </View>
                    {minOrderValue && valueUpto && (
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subtitleText}>
                                Maximum discount upto {valueUpto}
                                /- on orders above {minOrderValue}/-
                            </Text>
                        </View>
                    )}
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subtitleText}>
                            Applicable on {applicablePaymentMethods} payment
                            method
                        </Text>
                    </View>
                </View>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: dynamicSize(10),
        borderRadius: dynamicSize(5),
        borderWidth: dynamicSize(1),
        width: dimensions.fullWidth - dynamicSize(30),
        flexDirection: 'row',
        backgroundColor: colors.WHITE,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: dynamicSize(6) },
                shadowOpacity: 0.09,
                shadowRadius: dynamicSize(10),
                height: dynamicSize(210),
            },
            android: {
                elevation: 5,
            },
        }),
    },
    leftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dynamicSize(35),
        padding: 0,
        margin: 0,
    },
    rightContainer: {
        padding: dynamicSize(15),
        flex: 1,
    },
    bottomContainer: {
        flex: 1,
        marginTop: dynamicSize(10),
    },
    activeContainer: {
        borderColor: colors.ORANGE_GRADIENT_MEDIUM,
    },
    activeLeftContainer: {
        backgroundColor: colors.ORANGE_GRADIENT_MEDIUM,
    },
    inActiveContainer: {
        borderColor: colors.GREY_BORDER,
    },
    inActiveLeftContainer: {
        backgroundColor: colors.GREY_BORDER,
    },
    activeText: {
        color: colors.ORANGE,
    },
    inActiveText: {
        color: colors.GREY_BORDER,
    },
    leftTitleText: {
        ...fonts.NUNITO_700_14,
        transform: [{ rotate: '-90deg' }],
        textAlign: 'center',
        width: dynamicSize(160),
        color: colors.GREY_DARK,
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        marginLeft: dynamicSize(10),
        color: colors.GREY_DARK,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    descriptionContainer: {},
    descriptionText: {
        ...fonts.NUNITO_500_12,
        marginVertical: dynamicSize(3),
        color: colors.GREY_MEDIUM,
    },
    subTitleContainer: {},
    subtitleText: {
        ...fonts.INTER_600_12,
        marginVertical: dynamicSize(5),
        color: colors.GREY_DARK,
    },
});
export default CouponCard;
