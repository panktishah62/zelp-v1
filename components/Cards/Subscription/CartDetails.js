import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WhiteLocation from '../../../assets/images/Subscription/WhiteLocation.svg';
import { dimensions, fonts } from '../../../styles';
import DeliveryBoy from '../../../assets/images/Subscription/DeliveryBoy.svg';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';

const CartDetails = props => {
    const { address } = props;
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <View style={styles.imageContainer}>
                    <WhiteLocation />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.firstText}>
                        Delivery to <Text style={styles.secondText}>Home</Text>
                    </Text>
                    <Text style={styles.firstText}>{address}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Change</Text>
                </View>
            </View>
            <View style={styles1.secondContainer}>
                <View style={styles1.leftContainer}>
                    <DeliveryBoy />
                    <Text style={styles1.firstText}>
                        Distance <Text style={styles1.secondText}>2.4 KM</Text>
                    </Text>
                </View>
                <View style={styles1.rightContainer}>
                    <Text style={styles1.thirdText}>
                        Time <Text style={styles1.secondText}>30-35 mins</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(100),
        gap: dynamicSize(10),
        width: dimensions.fullWidth - dynamicSize(40),
        backgroundColor: '#FFF',
        borderRadius: 15,
        elevation: 5,
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 10,
        flexDirection: 'row',
        gap: dynamicSize(14),
    },
    buttonContainer: {
        width: dynamicSize(80),
        height: dynamicSize(25),
        backgroundColor: '#26A65B',
        borderRadius: 27,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: dynamicSize(14),
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
    },
    secondText: {
        color: '#26A65B',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: dynamicSize(14),
    },
    buttonText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'right',
    },
});

const styles1 = StyleSheet.create({
    secondContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: dynamicSize(20),
        flexDirection: 'row',
        marginBottom: 10,
    },
    leftContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: dynamicSize(10),
        flexDirection: 'row',
    },
    firstText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    secondText: {
        color: '#26A65B',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    thirdText: {
        color: '#3D3D3D',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default CartDetails;
