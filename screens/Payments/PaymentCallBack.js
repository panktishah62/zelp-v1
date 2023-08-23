import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
    PAYMENT_CODES,
    STATUS_TO_TEXT,
} from '../../redux/constants/paymentConstants';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { resetCartActions } from '../../redux/actions/cartActions';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import { useDispatch } from 'react-redux';

const PaymentCallBackScreen = props => {
    const { transactionCode, navigation } = props;
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [subText, setSubText] = useState('');
    const [type, setType] = useState('');
    const [textColor, setTextColor] = useState(colors.BLACK);
    const [icon, setIcon] = useState();
    useEffect(() => {
        if (transactionCode && STATUS_TO_TEXT[transactionCode]) {
            setText(STATUS_TO_TEXT[transactionCode].text);
            setType(transactionCode);
            if (STATUS_TO_TEXT[transactionCode].type === 'success') {
                setTextColor(colors.GREEN);
                setIcon(require('../../assets/icons/success.png'));
                setSubText('You will be redirected to Track Order');
            } else if (STATUS_TO_TEXT[transactionCode].type === 'pending') {
                setTextColor(colors.WARNING_YELLOW);
                setIcon(require('../../assets/icons/warning.png'));
            } else if (STATUS_TO_TEXT[transactionCode].type === 'error') {
                setTextColor(colors.RED);
                setIcon(require('../../assets/icons/error.png'));
                setSubText('You will be redirected to Home Screen');
            }
        }
    }, [transactionCode]);

    // useEffect(
    //     () =>
    //         navigation.addListener('beforeRemove', e => {
    //             dispatch(resetCartActions());
    //             dispatch(getCurrentOrder());
    //         }),
    //     [navigation],
    // );

    return (
        <View style={styles.constainer}>
            {icon && <Image source={icon} />}
            <Text style={[styles.type, { color: textColor }]}>{type}</Text>
            <Text style={styles.text}>{text}</Text>
            {subText && <Text style={styles.subText}>{subText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    constainer: {
        alignItems: 'center',
        paddingTop: dimensions.fullHeight / 4,
    },
    type: {
        ...fonts.NUNITO_500_24,
        color: colors.GREY_DARK,
    },
    text: {
        margin: 20,
        textAlign: 'center',
        color: colors.GREY_DARK,
    },
    subText: {
        ...fonts.NUNITO_700_16,
        color: colors.GREY_DARK,
    },
});

export default PaymentCallBackScreen;
