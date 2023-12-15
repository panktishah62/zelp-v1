import React, { useEffect, useState } from 'react';
import { AppState, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { cancelOrder } from '../../redux/actions/currentOrder';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Popup } from 'react-native-popup-confirm-toast';

const CancelOrderButton = ({ orderTime, orderId, timeToCancel }) => {
    const [timeLeft, setTimeLeft] = useState(
        timeToCancel - parseInt((new Date() - new Date(orderTime)) / 1000, 10),
    );

    useEffect(() => {
        let interval;
        if (timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }

        const handleAppStateChange = nextAppState => {
            if (nextAppState === 'active') {
                // App has come to the foreground, restart the timer if it's still running
                if (timeLeft > 0) {
                    const remainingTime =
                        timeToCancel -
                        parseInt((new Date() - new Date(orderTime)) / 1000, 10);
                    setTimeLeft(remainingTime);
                    interval = setInterval(() => {
                        setTimeLeft(remainingTime - 1);
                    }, 1000);
                    // interval = setInterval(handleInterval, 1000);
                }
            } else {
                // App has gone to the background, clear the interval
                clearInterval(interval);
            }
        };

        const appFocusSubscription = AppState.addEventListener(
            'change',
            handleAppStateChange,
        );

        return () => {
            clearInterval(interval);
            appFocusSubscription.remove();
        };
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(
            timeToCancel -
                parseInt((new Date() - new Date(orderTime)) / 1000, 10),
        );
    }, [orderTime, timeToCancel]);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cancelHandler = () => {
        Popup.show({
            type: 'confirm',
            title: 'Cancel Order',
            textBody: 'Are you sure you want to cancel this order?',
            buttonText: 'No',
            confirmText: 'Yes',
            confirmButtonTextStyle: { color: '#FD7A33' },
            timing: 10000,
            callback: () => {
                Popup.hide();
            },
            cancelCallback: () => {
                dispatch(cancelOrder(orderId));
                navigation.popToTop();
                Popup.hide();
            },
        });
    };

    if (timeLeft < 0) {
        return null;
    }

    return (
        <TouchableOpacity
            style={[styles.container, timeLeft > 0 ? styles.active : {}]}
            onPress={cancelHandler}>
            <Text style={styles.text}>Cancel Order ({timeLeft})</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.RED,
        minWidth: dynamicSize(130),
        padding: dynamicSize(10),
        zIndex: 1,
        borderTopLeftRadius: dynamicSize(10),
        borderBottomLeftRadius: dynamicSize(10),
        right: dynamicSize(0),
        top: dynamicSize(240),
        transform: [{ translateX: 200 }],
    },
    active: {
        transform: [{ translateX: 0 }],
    },
    text: {
        color: colors.WHITE,
    },
});

export default CancelOrderButton;
