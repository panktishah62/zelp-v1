import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Location from '../../assets/icons/map-pin.svg';
import { cancelOrder } from '../../redux/actions/currentOrder';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { sliceText } from '../../utils';
import { Popup } from 'react-native-popup-confirm-toast';

const ReverseTimer = ({ currentOrder, navigation, setIsCancelable }) => {
    const dispatch = useDispatch();
    const date = currentOrder.updatedAt;
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diffSeconds = Math.round(
                (new Date() - new Date(date)) / 1000,
            );
            if (diffSeconds > 60) {
                setSecondsLeft(0);
            } else {
                setSecondsLeft(60 - diffSeconds);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    useEffect(() => {
        if (Number(secondsLeft) > 0) {
            setIsCancelable(true);
        } else {
            setIsCancelable(false);
        }
    }, [secondsLeft]);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View>
            {secondsLeft > 0 && (
                <TouchableOpacity
                    style={styles.timerContainer}
                    onPress={() =>
                        Popup.show({
                            type: 'confirm',
                            title: 'Cancel Order',
                            textBody:
                                'Are you sure you want to cancel this order?',
                            buttonText: 'No',
                            confirmText: 'Yes',
                            confirmButtonTextStyle: { color: '#FD7A33' },
                            timing: 10000,
                            callback: () => {
                                Popup.hide();
                            },
                            cancelCallback: () => {
                                dispatch(cancelOrder(currentOrder._id));
                                navigation.popToTop();
                                Popup.hide();
                            },
                        })
                    }>
                    <Text style={styles.cancelText}>Cancel Order</Text>
                    <Text style={styles.timerText}>
                        {formatTime(secondsLeft)}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const AddressCard = props => {
    const { navigation } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const [initialTime, setInitialTime] = useState('');
    const [endTime, setEndTime] = useState('');
    // const { address } = props;
    // const address = orderData.order.cart.user.address;
    const [address, setAddress] = useState({});
    const [isCancelable, setIsCancelable] = useState(false);
    useEffect(() => {
        if (currentOrder?.cart && currentOrder?.cart?.address) {
            setAddress(currentOrder.cart.address);
            setInitialTime(new Date(currentOrder.updatedAt));
            setEndTime(initialTime + 60);
        } else if (
            currentOrder?.subscriptionOrder &&
            currentOrder?.subscriptionOrder?.address
        ) {
            setAddress(currentOrder?.subscriptionOrder?.address);
            setInitialTime(new Date(currentOrder.updatedAt));
            setEndTime(initialTime + 60);
        }
    }, [currentOrder]);

    return (
        <View style={[styles.container]}>
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    <Location height={24} />
                </View>
                {address.address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.name}>
                            {sliceText(address.name, 30)}
                        </Text>
                        <Text
                            style={[
                                styles.address,
                                {
                                    width: isCancelable
                                        ? dimensions.fullWidth * 0.55
                                        : dimensions.fullWidth * 0.85,
                                },
                            ]}>
                            {sliceText(address.address, 45)}
                        </Text>
                        <Text style={styles.phone}>
                            Phone Number: {address.mobNo}
                        </Text>
                    </View>
                )}
                {!address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.name}>Select Address</Text>
                    </View>
                )}
            </View>
            {currentOrder &&
                currentOrder.updatedAt &&
                currentOrder.orderStatus === 'Placed' && (
                    <View>
                        <ReverseTimer
                            currentOrder={currentOrder}
                            navigation={navigation}
                            setIsCancelable={setIsCancelable}
                        />
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 10,
    },
    innerContainer: {
        width: dimensions.fullWidth * 0.5,
        flexDirection: 'row',
        padding: 5,
    },
    iconContainer: {},
    addressContainer: {},
    name: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
        marginBottom: 5,
    },
    address: {
        marginBottom: 5,
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
        width: dimensions.fullWidth * 0.55,
    },
    phone: {
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
    },
    addressFound: {
        height: 130,
    },
    addressNotFound: {
        height: 60,
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        ...fonts.INTER_700_16,
        color: colors.RED,
        ...Platform.select({
            ios: {
                ...fonts.INTER_700_12,
            },
            android: {
                ...fonts.INTER_700_16,
            },
        }),
    },
    timerText: {
        ...fonts.INTER_400_14,
        color: colors.RED,
    },
});

export default AddressCard;
