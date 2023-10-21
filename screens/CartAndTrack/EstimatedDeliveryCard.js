import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TimerCircle from './Timer';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const EstimatedDeliveryCard = ({ timeToDeliver, orderStatus }) => {
    const now = new Date();
    const estimatedDeliveryTime = new Date(
        now.getTime() + timeToDeliver * 60000,
    );

    const formattedDeliveryTime = `${String(
        estimatedDeliveryTime.getHours(),
    ).padStart(2, '0')}:${String(estimatedDeliveryTime.getMinutes()).padStart(
        2,
        '0',
    )}`;

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <TimerCircle minutes={timeToDeliver} />
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.orderStatus}>{orderStatus}</Text>
                <Text style={styles.deliveryTime}>
                    Estimated delivery by {formattedDeliveryTime}
                </Text>
            </View>
            <View style={styles.gif} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.ORANGE,
        borderTopLeftRadius: dynamicSize(20),
        borderTopRightRadius: dynamicSize(20),
        alignItems: 'center',
    },
    leftSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightSection: {
        flex: 2,
        padding: dynamicSize(16),
    },
    orderStatus: {
        fontSize: normalizeFont(20),
        fontWeight: 'bold',
        marginBottom: dynamicSize(4),
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
    },
    deliveryTime: {
        fontSize: normalizeFont(18),
        color: 'white',
    },
    gif: {
        // flex: 1,
    },
});

export default EstimatedDeliveryCard;
