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
import { showDialogBox } from '../../../utils';

const WalletMoney = props => {
    const { setIsLoading, moneyInWallet, config } = props;
    const cart = useSelector(state => state.cartActions);
    const [isActive, setIsActive] = useState(props.isActive);
    const [remainingMoneyInWallet, setRemainingMoneyInWallet] =
        useState(moneyInWallet);
    const dispatch = useDispatch();
    const onClick = () => {
        if (isActive) {
            setIsLoading(true);
            dispatch(removeWalletMoney(setIsLoading));
            setIsActive(false);
        } else {
            if (cart?.coupon && cart?.coupon?._id) {
                showDialogBox(
                    'Cannot apply wallet!',
                    'Wallet Cannot be applied along with coupon. Remove coupon to apply wallet',
                    'warning',
                    'OK',
                    true,
                );
            } else if (remainingMoneyInWallet < config.maxWalletMoneyToUse) {
                showDialogBox(
                    `Wallet dosen't have enough amount!`,
                    'Earn Wallet money by watching shots and referring the app to your friends and family!',
                    'warning',
                    'OK',
                    true,
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
                Number(moneyInWallet - config.maxWalletMoneyToUse),
            );
        } else {
            setRemainingMoneyInWallet(moneyInWallet);
        }
    }, [isActive]);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.titleText}>Use Wallet Money</Text>
                <Text style={styles.subtitleText}>
                    Max {config.maxWalletMoneyToUse}/- can be used
                </Text>
                <Text style={styles.subtitleText}>
                    ( In Wallet : {remainingMoneyInWallet}/- )
                </Text>
            </View>
            <View style={[Styles.row, styles.rightContainer]}>
                <View style={styles.money}>
                    <View style={Styles.row_flex_end}>
                        <Rupee />
                        <Text style={styles.titleText}>
                            {' '}
                            {config.maxWalletMoneyToUse}{' '}
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
