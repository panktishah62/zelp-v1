import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ShowOrderDetails from '../../components/TrackOrder/ShowOrderDetails';

const RefundOrder = props => {
    const { route, navigation } = props;
    const { orderId } = route.params;
    return (
        <ScrollView style={styles.container}>
            <ShowOrderDetails navigation={navigation} orderId={orderId} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default RefundOrder;
