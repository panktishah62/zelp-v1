import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { fonts, Styles } from '../../../styles';
import Rupee from '../../../assets/icons/rupee.svg';
import RadioButton from '../../Buttons/RadioButton';
import { colors } from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import SwitchBtn from '../../Buttons/Switch';
import {
    applyReferralCoinMoney,
    removeCoupon,
    removeRefferalCoinMoney,
    removeWalletMoney,
} from '../../../redux/actions/cartActions';
import {
    canApplyWallet,
    canApplyReferralCodeMoney,
} from '../../../redux/services/cartService';
import { DialogTypes, getUpto2Decimal } from '../../../utils';
import { showDialog } from '../../../redux/actions/dialog';
import remoteConfig from '@react-native-firebase/remote-config';
import RemoteConfigService from '../../../redux/services/remoteConfigService';

const RefferalCoins = props => {
    const { setIsLoading, moneyInReferral, config } = props;
    const cart = useSelector(state => state.cartActions);
    const userProfile = useSelector(state => state.user.userProfile);
    const [rupeesPerReferralCoin, setRupeesPerReferralCoin] = useState(
        userProfile?.referralCoinsMultiple > 0
            ? Number(userProfile.referralCoinsMultiple)
            : remoteConfig?.getValue('RupeesPerReferralCoin').asNumber(),
    );
    const [isActive, setIsActive] = useState(props.isActive);
    const [remainingMoneyInReferral, setRemainingMoneyInReferral] =
        useState(moneyInReferral);
    const canFullReferralCoinsBeUsed = RemoteConfigService.getRemoteValue(
        'canFullReferralCoinsBeUsed',
    ).asBoolean();

    const dispatch = useDispatch();
    const onClick = () => {
        if (isActive && cart?.referralCoinsUsed > 0) {
            setIsLoading(true);
            dispatch(removeRefferalCoinMoney(setIsLoading));
            setIsActive(false);
        } else if (cart?.referralCoinsUsed > 0) {
            // if (cart?.coupon && cart?.coupon?._id) {
            //     dispatch(
            //         showDialog({
            //             isVisible: true,
            //             titleText: 'Cannot apply Referral coins!',
            //             subTitleText:
            //                 'Referral Coins Cannot be applied along with coupon. Remove coupon to apply Referral Coins',
            //             buttonText1: 'CLOSE',
            //             type: DialogTypes.WARNING,
            //         }),
            //     );
            // } else
            if (
                Number(
                    cart?.billingDetails &&
                        cart?.billingDetails?.totalItemsPrice,
                ) <= Number(config?.minOrderValueForReferralCoins)
            ) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Wallet Error',
                        subTitleText: `Cannot apply referral coins for the item total less than or equal to ${config.minOrderValueForReferralCoins}`,
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            } else {
                if (cart?.isWalletMoneyUsed) {
                    dispatch(removeWalletMoney(setIsLoading));
                }
                if (cart?.coupon && cart?.coupon?._id) {
                    dispatch(removeCoupon());
                }
                dispatch(applyReferralCoinMoney(setIsLoading));
                setIsActive(true);
            }
        }
    };

    useEffect(() => {
        if (cart.isReferralCoinsUsed) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [cart]);

    useEffect(() => {
        if (isActive) {
            setRemainingMoneyInReferral(
                Math.round(
                    moneyInReferral -
                        getUpto2Decimal(
                            cart?.billingDetails?.referralCoinsUsed /
                                rupeesPerReferralCoin,
                        ),
                ),
            );
        } else {
            setRemainingMoneyInReferral(moneyInReferral);
        }
    }, [cart, isActive]);

    useEffect(() => {
        setRupeesPerReferralCoin(
            userProfile?.referralCoinsMultiple > 0
                ? Number(userProfile.referralCoinsMultiple)
                : remoteConfig?.getValue('RupeesPerReferralCoin').asNumber(),
        );
    }, [userProfile]);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.titleText}>Use Referral Coins</Text>

                <Text style={styles.subtitleText}>
                    {1 / rupeesPerReferralCoin} Referral Coins = 1 Rs
                </Text>

                {!canFullReferralCoinsBeUsed && (
                    <Text style={styles.subtitleText}>
                        Max {config.maxReferralCoinMoneyToUse} Coins can be used
                    </Text>
                )}
            </View>
            <View style={[Styles.row, styles.rightContainer]}>
                <View style={styles.money}>
                    <View style={Styles.row_flex_end}>
                        {/* <Rupee /> */}
                        <Text style={styles.titleText}>
                            {' '}
                            {cart?.isReferralCoinsUsed
                                ? remainingMoneyInReferral
                                : moneyInReferral}{' '}
                            Coins
                        </Text>
                    </View>
                </View>
                <SwitchBtn
                    onColor={colors.ORANGE}
                    offColor={colors.GREY_DARK}
                    thumbColor={colors.WHITE}
                    toggleSwitch={() => {
                        onClick();
                    }}
                    value={isActive}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Styles.row_space_between,
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
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        ...Styles.default_text_color,
    },
    subtitleText: {
        ...fonts.NUNITO_500_12,
        ...Styles.default_text_color,
    },
    money: {
        justifyContent: 'flex-end',
    },
    leftContainer: {
        width: '70%',
    },
    rightContainer: {
        width: '30%',
    },
});

export default RefferalCoins;
