import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import CheckIcon from '../../assets/icons/check.svg';
import { getRandomInt } from '../../utils';

const OrderPlaced = ({ navigation }) => {
    const navigationTimer = 4000;
    const currentOrder = useSelector(state => state.currentOrder?.currentOrder);
    const dispatch = useDispatch();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        setTimeout(() => {
            dispatch(getCurrentOrder());
            navigation.navigate('TrackOrder', {
                timeToDeliver: `${getRandomInt(30, 60)} mins`,
            });
        }, navigationTimer);
    }, []);

    useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                e.preventDefault();
                navigation.navigate('Home');
            }),
        [navigation],
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ConfettiCannon
                origin={{ x: -10, y: 0 }}
                count={200}
                autoStart
                explosionSpeed={200}
                fallSpeed={1000}
                colors={['#A6A0F5', '#A0616A', '#A0616A', '#00BAF2']}
            />
            <View style={styles.circle}>
                <CheckIcon />
            </View>
            <Text style={styles.textStylePrimary}>Order Confirmed</Text>
            <Text style={[styles.textStyleSecondary, { marginTop: 6 }]}>
                Thank you for your order.
            </Text>
            <Text style={[styles.textStyleSecondary, { marginTop: 24 }]}>
                You will be redirected to order tracking screen now.
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FD7A33',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStylePrimary: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 13,
        textAlign: 'center',
    },
    textStyleSecondary: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
        marginTop: 6,
        textAlign: 'center',
    },
    image1: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    image2: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        position: 'relative',
        top: 30,
        right: 40,
    },
});

export default OrderPlaced;
