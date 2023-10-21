import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { fonts } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cancelOrder } from '../../redux/actions/currentOrder';

const CancelOrderCard = ({ duration, orderId }) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        let interval;
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [remainingTime]);

    return remainingTime > 0 ? (
        <View style={styles.container}>
            <View>
                <Text style={styles.topText}>Ordered by mistake?</Text>
                <Text style={styles.bottomText}>
                    Cancel it within next {remainingTime} seconds!
                </Text>
            </View>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelOrder(orderId)}>
                <Text style={{ color: colors.WHITE }}>Cancel</Text>
            </TouchableOpacity>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: dynamicSize(20),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dynamicSize(10),
    },
    topText: {
        color: colors.BLACK,
        fontSize: normalizeFont(20),
        fontFamily: fonts.NUNITO_600_20.fontFamily,
        textAlign: 'center',
    },
    bottomText: {
        color: colors.BLACK,
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_600_20.fontFamily,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: colors.ORANGE,
        padding: dynamicSize(10),
        borderRadius: dynamicSize(10),
    },
});

export default CancelOrderCard;
