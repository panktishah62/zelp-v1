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
    removeWalletMoney,
} from '../../../redux/actions/cartActions';
import { canApplyWallet } from '../../../redux/services/cartService';
import { DialogTypes } from '../../../utils';
import { showDialog } from '../../../redux/actions/dialog';
import remoteConfig from '@react-native-firebase/remote-config';

const WalletMoney = props => {
    const { setIsLoading, moneyInWallet, config } = props;
    const cart = useSelector(state => state.cartActions);
    const [isActive, setIsActive] = useState(props.isActive);
    const [remainingMoneyInWallet, setRemainingMoneyInWallet] =
        useState(moneyInWallet);
    const canFullWalletBeUsed = remoteConfig()
        .getValue('canFullWalletBeUsed')
        .asBoolean();
    const walletInstructions = remoteConfig()
        .getValue('walletInstructions')
        .asString();
    const dispatch = useDispatch();
    const onClick = () => {
        if (cart?.isReferralCoinsUsed) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Cannot apply Wallet money!',
                    subTitleText:
                        'Wallet Money cannot be applied along with Referral coins. Remove Referral coins to apply wallet',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        }
        if (isActive) {
            setIsLoading(true);
            dispatch(removeWalletMoney(setIsLoading));
            setIsActive(false);
        } else {
            if (cart?.coupon && cart?.coupon?._id) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Cannot apply wallet!',
                        subTitleText:
                            'Wallet Cannot be applied along with coupon. Remove coupon to apply wallet',
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
                        titleText: 'Wallet Error',
                        subTitleText: `Cannot apply wallet money for the item total less than or equal to ${config.minOrderValueForWallet}`,
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            } else {
                setIsLoading(true);
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
                cart?.isWalletMoneyUsed
                    ? cart?.walletMoney - cart?.billingDetails?.walletMoney
                    : config.maxWalletMoneyToUse,
            );
        } else {
            setRemainingMoneyInWallet(moneyInWallet);
        }
    }, [cart, isActive]);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.titleText}>Use Wallet Money</Text>
                {!canFullWalletBeUsed && (
                    <Text style={styles.subtitleText}>
                        Max {config.maxWalletMoneyToUse}/- can be used
                    </Text>
                )}
                {!canFullWalletBeUsed && (
                    <Text style={styles.subtitleText}>
                        ( In Wallet : {remainingMoneyInWallet}/- )
                    </Text>
                )}
                {walletInstructions && (
                    <Text style={styles.subtitleText}>
                        {walletInstructions}
                    </Text>
                )}
            </View>
            <View style={[Styles.row, styles.rightContainer]}>
                <View style={styles.money}>
                    <View style={Styles.row_flex_end}>
                        <Rupee />
                        <Text style={styles.titleText}>
                            {' '}
                            {cart?.isWalletMoneyUsed
                                ? cart?.billingDetails?.walletMoney
                                : cart?.walletMoney < config.maxWalletMoneyToUse
                                ? cart?.walletMoney
                                : config.maxWalletMoneyToUse}{' '}
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
