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
    applyWalletMoney,
    removeCoupon,
    removeRefferalCoinMoney,
    removeWalletMoney,
} from '../../../redux/actions/cartActions';
import { canApplyWallet } from '../../../redux/services/cartService';
import { DialogTypes, getUpto2Decimal } from '../../../utils';
import { showDialog } from '../../../redux/actions/dialog';
import remoteConfig from '@react-native-firebase/remote-config';
import RemoteConfigService from '../../../redux/services/remoteConfigService';
import Currency from '../../Currency';

const RedeemFuro = props => {
    const { setIsLoading, moneyInWallet, config, navigation, currency } = props;
    const cart = useSelector(state => state.cartActions);
    const userProfile = useSelector(state => state.user.userProfile);
    const [rupeesPerFuro, setRupeePerFuro] = useState(
        userProfile?.walletMultiple > 0
            ? Number(userProfile?.walletMultiple)
            : RemoteConfigService.getRemoteValue('RupeesPerFuro').asNumber(),
    );
    const [isActive, setIsActive] = useState(props.isActive);
    const [remainingMoneyInWallet, setRemainingMoneyInWallet] =
        useState(moneyInWallet);
    const canFullWalletBeUsed = RemoteConfigService.getRemoteValue(
        'canFullWalletBeUsed',
    ).asBoolean();
    const walletInstructions =
        RemoteConfigService.getRemoteValue('walletInstructions').asString();
    const dispatch = useDispatch();
    const onClick = () => {
        if (cart?.walletMoney > 0) {
            if (
                Number(
                    cart?.billingDetails &&
                        cart?.billingDetails?.totalItemsPrice,
                ) <= Number(config?.minOrderValueForWallet)
            ) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Cannot apply Furos!',
                        subTitleText: `Cannot apply Furos for the item total less than or equal to ${config.minOrderValueForWallet}`,
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            } else {
                setIsLoading(true);
                dispatch(removeCoupon());
                if (cart?.isReferralCoinsUsed) {
                    dispatch(removeRefferalCoinMoney(setIsLoading));
                }
                navigation.navigate('Coupons', {
                    isSubscription: false,
                    subscriptionData: {},
                });
                setIsActive(true);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (cart.isWalletMoneyUsed) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [cart]);

    useEffect(() => {
        if (cart?.billingDetails?.walletMoney) {
            setRemainingMoneyInWallet(
                getUpto2Decimal(
                    moneyInWallet -
                        getUpto2Decimal(
                            cart?.billingDetails?.walletMoney / rupeesPerFuro,
                        ),
                ),
            );
        } else {
            setRemainingMoneyInWallet(moneyInWallet);
        }
    }, [cart, isActive]);

    useEffect(() => {
        setRupeePerFuro(
            userProfile?.walletMultiple > 0
                ? Number(userProfile?.walletMultiple)
                : RemoteConfigService.getRemoteValue(
                      'RupeesPerFuro',
                  ).asNumber(),
        );
    }, [userProfile]);

    const removeAppliedCoupon = () => {
        dispatch(removeCoupon());
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.titleText}>
                    {cart?.isWalletMoneyUsed
                        ? remainingMoneyInWallet
                        : moneyInWallet}{' '}
                    Furos
                </Text>
                {!canFullWalletBeUsed && (
                    <Text style={styles.subtitleText}>
                        Max {config.maxWalletMoneyToUse} Furos can be used
                    </Text>
                )}
                <Text style={styles.subtitleText}>
                    {1 / rupeesPerFuro} Furo = 1{' '}
                    <Currency currency={currency} />
                </Text>
                {walletInstructions && (
                    <Text style={styles.subtitleText}>
                        {walletInstructions}
                    </Text>
                )}
            </View>
            {!cart?.coupon?.bagConstraints?.isApplicableOnWallet ? (
                <View style={[Styles.row, styles.rightContainer]}>
                    <TouchableOpacity
                        style={styles.redeemButton}
                        onPress={() => {
                            onClick();
                        }}>
                        <Text style={styles.redeemText}>Redeem</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.removeButtonOuter}>
                    <TouchableOpacity
                        onPress={() => {
                            removeAppliedCoupon();
                        }}>
                        <Text style={styles.subtitleText}>
                            {cart?.coupon?.name}
                        </Text>
                        <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    redeemText: {
        color: colors.WHITE,
        ...fonts.NUNITO_700_14,
    },
    redeemButton: {
        backgroundColor: colors.ORANGE,
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitleText: {
        ...fonts.NUNITO_500_12,
        ...Styles.default_text_color,
    },
    removeButton: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
    },
    removeButtonOuter: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.BLACK,
    },
});

export default RedeemFuro;
