import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../styles/colors';
import FastImage from 'react-native-fast-image';

const PaymentSuccessfullCard = props => {
    const { navigation } = props;
    const data = props?.data;

    const navigationHandler = () => {
        navigation.navigate('SubscribedUserHome');
    };
    const onClose = () => {
        navigation.navigate('SubscribedUserHome');
    };
    useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                e.preventDefault();
                navigation.navigate('SubscribedUserHome');
            }),
        [navigation],
    );
    return (
        <View>
            <Text style={styles.headingText}>Payment Status</Text>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <FastImage
                        source={require('../../../assets/images/Subscription/orange_background.png')}
                    />
                    <View style={styles.tickImage}>
                        <FastImage
                            source={require('../../../assets/images/Subscription/tick-circle.png')}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.paymentSuccessText}>
                        Payment Success!
                    </Text>
                </View>
                <View style={{ marginTop: 4 }}>
                    <Text style={styles.thirdText}>You are now</Text>
                    <Text style={styles.thirdText}>
                        Froker meal plan subscriber
                    </Text>
                </View>
                <View style={styles1.container}>
                    <Text style={styles1.firstText}>Total Payment</Text>
                    <Text style={styles1.secondText}>₹{data?.totalAmount}</Text>
                </View>
                <View style={styles1.line}></View>
                <TouchableOpacity onPress={navigationHandler}>
                    <View style={belowStyles.container}>
                        <Text style={belowStyles.buttonText}>
                            Order Details
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={belowStyles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        elevation: 5,
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        width: 314.916,
        height: 490.239,
        borderTopLeftRadius: 33.308,
        borderTopRightRadius: 33.308,
    },
    headingText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    imageContainer: {},
    tickImage: {
        position: 'absolute',
        top: 40,
        left: 50,
    },
    paymentSuccessText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',

        letterSpacing: 0.48,
    },
    thirdText: {
        color: colors.GRAY_20,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 23.6,
    },
});

const styles1 = StyleSheet.create({
    container: {
        margin: 20,
    },
    firstText: {
        textAlign: 'center',
        color: colors.GRAY_20,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 36.639,
    },
    secondText: {
        marginVertical: 10,
        textAlign: 'center',
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
    },
    line: {
        borderColor: 'rgba(61, 61, 61, 0.27)',
        borderWidth: 1,
        height: 1,
        width: dimensions.fullWidth - 100,
    },
});

const belowStyles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 203.333,
        backgroundColor: colors.ORANGE_WHITE,
        paddingVertical: 10,
        borderRadius: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
    },
    closeText: {
        color: colors.GRAY_20,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 36.639,
    },
});

export default PaymentSuccessfullCard;
