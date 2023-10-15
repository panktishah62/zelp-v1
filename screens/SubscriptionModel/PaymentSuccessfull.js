import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import PaymentSuccessfullCard from '../../components/Cards/Subscription/PaymentSuccessfullCard';
import { colors } from '../../styles/colors';

const PaymentSuccessfull = props => {
    const { navigation, route } = props;
    const { data } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                <PaymentSuccessfullCard navigation={navigation} data={data} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ORANGE_WHITE,
        height: dimensions.fullHeight,
    },
});

export default PaymentSuccessfull;
