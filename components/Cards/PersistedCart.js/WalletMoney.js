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
    removeRefferalCoinMoney,
    removeWalletMoney,
} from '../../../redux/actions/cartActions';
import { canApplyWallet } from '../../../redux/services/cartService';
import { DialogTypes, getUpto2Decimal } from '../../../utils';
import { showDialog } from '../../../redux/actions/dialog';
import remoteConfig from '@react-native-firebase/remote-config';
import RemoteConfigService from '../../../redux/services/remoteConfigService';
import Currency from '../../Currency';

const WalletMoney = props => {
    const { setIsLoading, moneyInWallet, config } = props;
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
        if (isActive && cart?.walletMoney > 0) {
            setIsLoading(true);
            dispatch(removeWalletMoney(setIsLoading));
            setIsActive(false);
        } else if (cart?.walletMoney > 0) {
            if (cart?.coupon && cart?.coupon?._id) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Cannot apply Furos!',
                        subTitleText:
                            'Furos Cannot be applied along with coupon. Remove coupon to apply Furos',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            } else if (
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
                if (cart?.isReferralCoinsUsed) {
                    dispatch(removeRefferalCoinMoney(setIsLoading));
                }
                dispatch(applyWalletMoney(setIsLoading));
                setIsActive(true);
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
        if (isActive) {
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

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.titleText}>Use Furos</Text>
                {!canFullWalletBeUsed && (
                    <Text style={styles.subtitleText}>
                        Max {config.maxWalletMoneyToUse} Furos can be used
                    </Text>
                )}
                <Text style={styles.subtitleText}>
                    {1 / rupeesPerFuro} Furo = 1{' '}
                    <Currency currency={userProfile?.currency} />
                </Text>
                {walletInstructions && (
                    <Text style={styles.subtitleText}>
                        {walletInstructions}
                    </Text>
                )}
            </View>
            <View style={[Styles.row, styles.rightContainer]}>
                <View style={styles.money}>
                    <View style={Styles.row_flex_end}>
                        <Text style={styles.titleText}>
                            {' '}
                            {cart?.isWalletMoneyUsed
                                ? remainingMoneyInWallet
                                : moneyInWallet}{' '}
                            Furo
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

export default WalletMoney;
