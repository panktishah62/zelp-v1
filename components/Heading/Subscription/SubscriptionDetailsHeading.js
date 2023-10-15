import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
import { SvgUri } from 'react-native-svg';

const SubscriptionDetailsHeading = props => {
    const { details, data, name } = props;

    return (
        <View style={styles.container}>
            <View style={styles.headingSection}>
                <Text style={styles.offerMeal}>
                    ₹{details.price} - {details.meals} Meals{' '}
                    <Text style={styles.planText}> Plan</Text>
                </Text>
                <Text style={styles.validityText}>
                    {details.validity} Days Validity
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                {!data.icon && (
                    <Image
                        source={require('../../../assets/images/Subscription/bronze_medal.png')}
                    />
                )}
                {data.icon && (
                    <SvgUri
                        width={dynamicSize(18)}
                        height={dynamicSize(18)}
                        uri={data.icon}
                    />
                )}
                <Text style={styles.buttonText}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - dynamicSize(80),
    },
    headingSection: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: dynamicSize(4),
        marginTop: dynamicSize(20),
    },
    offerMeal: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    planText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(18),
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
        marginBottom: dynamicSize(6),
    },
    validityText: {
        color: '#8C8A9D',
        ...fonts.POPPINS_600_16,
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    buttonText: {
        color: colors.DARKER_GRAY,
        ...fonts.POPPINS_700_16,
        textAlign: 'justify',
        letterSpacing: 0.48,
        textTransform: 'capitalize',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: dynamicSize(5),
        alignItems: 'center',
        flexDirection: 'row',
        width: dynamicSize(105),
        height: dynamicSize(36),
        borderColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(30),
        borderWidth: dynamicSize(1),
        marginTop: dynamicSize(10),
    },
});

export default SubscriptionDetailsHeading;
