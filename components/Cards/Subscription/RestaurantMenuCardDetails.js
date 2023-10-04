import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { colors } from '../../../styles/colors';
import { dimensions, fonts } from '../../../styles';

const RestaurantMenuCardDetails = props => {
    const name = props.name;
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <View style={styles.buttonContainer}>
                    <Image
                        source={require('../../../assets/images/Subscription/bronze_medal.png')}
                    />
                    <Text style={styles.buttonText}>{name.slice(0, -5)}</Text>
                </View>
                <View style={styles.rightTextContainer}>
                    <Text style={styles.rightText}>Froker Subscription</Text>
                </View>
            </View>
            <View style={styles1.secondContainer}>
                <Image
                    source={require('../../../assets/images/Subscription/cycle.png')}
                />
                <Text style={styles1.firstText}>
                    Delivery time{' '}
                    <Text style={styles1.secondText}>30-45 Min</Text>
                </Text>
            </View>
            <View style={styles2.thirdContainer}>
                <Image
                    source={require('../../../assets/images/Subscription/location.png')}
                />
                <Text style={styles2.firstText}>Kundalahalli Gate</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        width: dimensions.fullWidth - 40,
        gap: 10,
        height: 138.88,
        elevation: 5,
        borderRadius: 20,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#E1740F',
        width: 105,
        height: 36,
        gap: 5,
    },
    buttonText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.48,
        textAlign: 'justify',
        textTransform: 'capitalize',
    },
    rightText: {
        color: '#E1740F',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    firstContainer: {
        display: 'flex',
        gap: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,

        marginHorizontal: 20,
    },
});
const styles1 = StyleSheet.create({
    secondContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 20,
    },
    firstText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    secondText: {
        color: '#E1740F',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
});
const styles2 = StyleSheet.create({
    thirdContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 20,
    },
    firstText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
    },
});

export default RestaurantMenuCardDetails;
