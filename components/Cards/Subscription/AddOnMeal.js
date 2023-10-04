import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const AddOnMeals = props => {
    return (
        <View style={styles.wrapeer}>
            <LinearGradient
                colors={[
                    'rgba(255, 255, 255, 0.90)',
                    'rgba(255, 255, 255, 0.25)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}>
                <View style={styles.textSection}>
                    <Text style={styles.firstText}>ADD ON MEALS</Text>
                    <Text style={styles.secondText}>
                        (Every 1 extra meal - 1 day extra validity)
                    </Text>
                </View>
                <View style={styles.iconSection}>
                    <Image
                        source={require('../../../assets/images/Subscription/rightArrow.png')}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapeer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        width: dimensions.fullWidth - 34,
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        borderWidth: 2,
        borderColor: colors.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10, // This property adds shadow on Android
        borderRadius: 12,
        overflow: 'hidden',
    },
    textSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        padding: 10,
    },
    firstText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 18 * 1.408, // Calculated line height for 140.8%
        letterSpacing: 0.54,
    },
    secondText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: 0.42,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3, // This is for Android shadow
    },
    gradient: {
        borderWidth: 2,
        borderColor: colors.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10, // This property adds shadow on Android
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default AddOnMeals;
