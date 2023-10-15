import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
import FROKER_SUBSCRIPTION_ICON from '../../../assets/icons/FrokerSubscriptionIcon.svg';
import CartButton from '../../Buttons/Subscription/CartButton';

const LogoHeading = props => {
    const { text, navigation } = props;
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <FROKER_SUBSCRIPTION_ICON />
                <Text style={styles.logoText}>{text}</Text>
            </View>
            <View style={styles.cartButton}>
                <CartButton navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: dynamicSize(20),
        width: dimensions.fullWidth - dynamicSize(80),
        gap: dynamicSize(10),
        flexDirection: 'row',
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoStyle: {
        width: dynamicSize(39),
        height: dynamicSize(40),
    },
    logoText: {
        color: colors.ORANGE_WHITE,
        ...fonts.POPPINS_700_18,
        // fontSize: 18,
        // fontStyle: 'normal',
        // fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    cartButton: {
        marginRight: 25,
    },
});

export default LogoHeading;
