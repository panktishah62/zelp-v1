import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import WhiteLocation from '../../../assets/images/Subscription/WhiteLocation.svg';
import { dimensions, fonts } from '../../../styles';
import DeliveryBoy from '../../../assets/images/Subscription/DeliveryBoy.svg';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';

const CartDetails = props => {
    const { address, navigation } = props;
    const onChangeAddress = () => {
        navigation.navigate('Address');
    };
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <View style={styles.topLeftContainer}>
                    <View style={styles.imageContainer}>
                        <WhiteLocation />
                    </View>
                    <Text
                        style={styles.firstText}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        Delivery to{' '}
                        <Text style={styles.secondText}>
                            {address?.typeOfAddress}
                            {'\n'}
                        </Text>
                        {address?.address}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={onChangeAddress}>
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles1.secondContainer}>
                <DeliveryBoy />
                <View style={styles1.rightContainer}>
                    <Text style={styles1.thirdText}>
                        Time <Text style={styles1.secondText}>20-30 Mins</Text>
                    </Text>
                </View>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        height: dynamicSize(70),
        gap: dynamicSize(10),
        marginTop: dynamicSize(0),
        marginHorizontal: dynamicSize(20),
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(15),
        elevation: 5,
    },
    firstContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        // marginTop: dynamicSize(10),
        flexDirection: 'row',
    },
    buttonContainer: {
        width: dynamicSize(80),
        height: dynamicSize(25),
        marginRight: dynamicSize(25),
        backgroundColor: colors.DARK_GREEN,
        borderRadius: 27,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstText: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: dynamicSize(14),
        width: '70%',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
    },
    secondText: {
        flex: 1,
        color: colors.DARK_GREEN,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: dynamicSize(14),
    },
    buttonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'right',
    },
    imageContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '80%',
        right: 0,
    },
});

const styles1 = StyleSheet.create({
    secondContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: dynamicSize(20),
        flexDirection: 'row',
        marginBottom: 10,
        left: dynamicSize(20),
    },
    leftContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: dynamicSize(10),
        flexDirection: 'row',
    },
    firstText: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    secondText: {
        color: colors.DARK_GREEN,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    thirdText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default CartDetails;
