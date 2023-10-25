import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { useDispatch } from 'react-redux';
import { removeSubscriptionCoupon } from '../../../redux/actions/subscriptionCoupon';
import FastImage from 'react-native-fast-image';

const PromoCodesAndOffers = props => {
    const { promoCode = '', offer = '', navigation, data } = props;
    const dispatch = useDispatch();
    const onBrowse = () => {
        navigation.navigate('Coupons', {
            isSubscription: true,
            subscriptionData: {
                subscriptionPlan: data?.subscriptionPlan?._id,
                numOfMealPlans: data?.numOfMealsSelected,
            },
        });
    };
    const onRemoveCoupon = () => {
        dispatch(removeSubscriptionCoupon());
    };
    return (
        <View style={[styles.wrapperContainer]}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.leftContainer}>
                        <FastImage
                            source={require('../../../assets/images/Subscription/promoCode.png')}
                        />
                        <Text style={styles.leftText}>Promocode & Offers</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.rightContainer}
                        onPress={onBrowse}>
                        <Text style={styles.rightText}>Browse</Text>
                    </TouchableOpacity>
                </View>
                {promoCode && offer && (
                    <View style={boxStyle.box}>
                        <View style={boxStyle.left}>
                            <Text style={boxStyle.codeText}>{promoCode}</Text>
                        </View>
                        <View style={boxStyle.right}>
                            <View>
                                <Text style={boxStyle.offerText}>-{offer}</Text>
                            </View>
                            <TouchableOpacity onPress={onRemoveCoupon}>
                                <FastImage
                                    source={require('../../../assets/images/Subscription/cross.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperContainer: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 14,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    container: {
        margin: 20,

        display: 'flex',
        flexDirection: 'column',
        width: dimensions.fullWidth - 60,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - 60,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    leftContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    rightContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: 'black',
        borderRadius: 25,
    },
    rightText: {
        color: '#FFF',
        textAlign: 'right',
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    leftText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',

        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    shadow: {
        backgroundColor: '#fff', // You can set a solid background color here if needed
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,

        elevation: 3,
    },
});

const boxStyle = StyleSheet.create({
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - 60,
        borderRadius: 10,
        height: 54.173,
        borderColor: colors.DARKER_GRAY,
        borderStyle: 'dashed',
        paddingVertical: 10,
        borderWidth: 2,
        paddingHorizontal: 14,
        margin: 10,
        marginBottom: 20,
    },
    left: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    right: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    offerText: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        color: '#FFF',
        textAlign: 'right',
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 25,
    },
    codeText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
    },
});

export default PromoCodesAndOffers;
