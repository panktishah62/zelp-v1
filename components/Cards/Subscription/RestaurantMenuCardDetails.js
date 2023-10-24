import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { colors } from '../../../styles/colors';
import { dimensions, fonts } from '../../../styles';
import { SvgUri } from 'react-native-svg';
import { dynamicSize } from '../../../utils/responsive';
import FastImage from 'react-native-fast-image';

const RestaurantMenuCardDetails = props => {
    const subscriptionPlan = props.subscriptionPlan;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                {subscriptionPlan?.image && (
                    <FastImage
                        source={{ uri: subscriptionPlan?.image }}
                        style={styles.image}
                    />
                )}
            </View>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.buttonContainer}>
                        {!subscriptionPlan.icon && (
                            <FastImage
                                source={require('../../../assets/images/Subscription/bronze_medal.png')}
                            />
                        )}
                        {subscriptionPlan.icon && (
                            <SvgUri
                                width={dynamicSize(18)}
                                height={dynamicSize(18)}
                                uri={subscriptionPlan.icon}
                            />
                        )}
                        <Text style={styles.buttonText}>
                            {subscriptionPlan?.name}
                        </Text>
                    </View>
                    <View style={styles.rightTextContainer}>
                        <Text style={styles.rightText}>
                            Froker Subscription
                        </Text>
                    </View>
                </View>
                <View style={styles1.secondContainer}>
                    <FastImage
                        source={require('../../../assets/images/Subscription/cycle.png')}
                    />
                    <Text style={styles1.firstText}>
                        Delivery time{' '}
                        <Text style={styles1.secondText}>
                            {subscriptionPlan?.averageDeliveryTime}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        marginBottom: dynamicSize(50),
    },
    imageContainer: {
        borderBottomEndRadius: dynamicSize(25),
    },
    image: {
        width: dimensions.fullWidth,
        height: dynamicSize(230),
        borderBottomLeftRadius: dynamicSize(25),
        borderBottomRightRadius: dynamicSize(25),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        width: dimensions.fullWidth - dynamicSize(40),
        gap: dynamicSize(10),
        height: dynamicSize(110),
        elevation: 5,
        borderRadius: dynamicSize(20),
        position: 'absolute',
        bottom: dynamicSize(-50),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: dynamicSize(30),
        borderColor: colors.ORANGE_WHITE,
        width: dynamicSize(105),
        height: dynamicSize(36),
        gap: dynamicSize(5),
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
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    firstContainer: {
        display: 'flex',
        gap: dynamicSize(14),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: dynamicSize(20),

        marginHorizontal: dynamicSize(20),
    },
});
const styles1 = StyleSheet.create({
    secondContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: dynamicSize(10),
        marginHorizontal: dynamicSize(20),
    },
    firstText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    secondText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
    },
});

export default RestaurantMenuCardDetails;
