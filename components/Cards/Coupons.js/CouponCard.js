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
import CardIcon from '../../../assets/icons/CreditCardIcon.svg';
import { useDispatch } from 'react-redux';
import { redeemCoupon } from '../../../redux/actions/cartActions';

const CouponCard = props => {
    const { coupon, isActive = false, navigation } = props;
    const dispatch = useDispatch();
    const code = coupon.code;
    const typeOfDiscount = coupon.discount.type;
    const type = typeOfDiscount == 'fixed' ? '/-' : '%';
    const typeOf = typeOfDiscount == 'fixed' ? 'FLAT OFF' : 'DISCOUNT';
    const minOrderValue = coupon.bagConstraints.minOrderAmount;
    const valueUpto = coupon.commonConstraints.valueUpto;
    const description = coupon.description;
    let applicablePaymentMethods = [
        coupon.bagConstraints.applicablePaymentMethods.map(item => {
            return item === 'OTHERS'
                ? 'Pay using wallet/card'
                : 'Cash On delivery';
        }),
    ];
    applicablePaymentMethods = applicablePaymentMethods.join(',');

    const Touchable = isActive ? TouchableOpacity : View;

    const applyCoupon = () => {
        dispatch(redeemCoupon(coupon));
        navigation.goBack();
    };

    return (
        <Touchable
            style={[
                styles.container,
                isActive ? styles.activeContainer : styles.inActiveContainer,
            ]}
            onPress={() => applyCoupon()}>
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
                        <CardIcon />
                        <Text style={styles.titleText}>{code}</Text>
                    </View>

                    {isActive ? (
                        <TouchableWithoutFeedback onPress={() => applyCoupon()}>
                            <Text style={styles.activeText}>Avail Coupon</Text>
                        </TouchableWithoutFeedback>
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
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subtitleText}>
                            Maximum discount upto {valueUpto}
                            /- on orders above {minOrderValue}/-
                        </Text>
                    </View>
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
        height: dynamicSize(170),
        width: dimensions.fullWidth - dynamicSize(30),
        flexDirection: 'row',
        backgroundColor: colors.WHITE,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
                height: dynamicSize(210),
            },
            android: {
                elevation: 5,
            },
        }),
    },
    leftContainer: {
        // height: '100%',
        height: '100%',
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
        marginVertical: 10,
        // justifyContent: 'space-evenly',
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
        marginLeft: 10,
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
        marginVertical: 3,
        color: colors.GREY_MEDIUM,
    },
    subTitleContainer: {},
    subtitleText: {
        ...fonts.INTER_600_12,
        marginVertical: 5,
        color: colors.GREY_DARK,
    },
});
export default CouponCard;
