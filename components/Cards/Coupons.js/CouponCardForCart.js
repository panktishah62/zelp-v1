import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Styles, dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import AddIcon from '../../../assets/icons/plus-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeCoupon } from '../../../redux/actions/cartActions';
import { showDialogBox } from '../../../utils';
const CouponCardForCart = props => {
    const { coupon, navigation } = props;
    const cart = useSelector(state => state.cartActions);
    const dispatch = useDispatch();

    const showCoupons = () => {
        if (cart?.isWalletMoneyUsed) {
            showDialogBox(
                'Cannot apply coupon!',
                'Coupon Cannot be applied along with wallet. Remove wallet to apply coupon',
                'warning',
                'OK',
                true,
            );
        } else {
            navigation.navigate('Coupons');
        }
    };

    const removeAppliedCoupon = () => {
        dispatch(removeCoupon());
    };

    const content = () => {
        return coupon ? (
            <View>
                <Text style={styles.titleText}>Coupon Applied</Text>

                <Text style={styles.subtitleText}>{coupon.code}</Text>
            </View>
        ) : (
            <Text style={styles.titleText}>Apply Coupons & Offers</Text>
        );
    };
    const IconButton = () => {
        return coupon ? (
            <TouchableOpacity
                onPress={() => {
                    removeAppliedCoupon();
                }}>
                <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
        ) : (
            <AddIcon />
        );
    };

    const Touchable = coupon ? View : TouchableOpacity;

    return (
        <Touchable
            style={styles.container}
            onPress={() => {
                if (coupon) {
                    removeAppliedCoupon();
                } else {
                    showCoupons();
                }
            }}>
            {content()}
            {IconButton()}
        </Touchable>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 20,

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        ...Styles.default_text_color,
        marginHorizontal: 10,
        // marginBottom: 0,
    },
    subtitleText: {
        // ...fonts.NUNITO_700_12,
        // color: colors.BLACK,
        marginHorizontal: 10,
        ...fonts.NUNITO_500_12,
        ...Styles.default_text_color,
    },
    removeButton: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
    },
});

export default CouponCardForCart;
