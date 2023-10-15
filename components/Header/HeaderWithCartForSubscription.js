import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/whiteArrow.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import CartButton from '../Buttons/Subscription/CartButton';
import { dynamicSize } from '../../utils/responsive';

const HeaderWithCartForSubscription = props => {
    const { navigation, onBack, onClick } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (onBack) {
                        onBack();
                    }
                    onClick ? onClick() : navigation.goBack();
                }}>
                <BackButton />
            </TouchableOpacity>
            <View style={styles.cartButton}>
                <CartButton
                    navigation={navigation}
                    color={'WHITE'}
                    backgroundStyles={styles?.backgroundStyles}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: dynamicSize(20),
    },
    button: {
        // padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(43),
        width: dynamicSize(43),
        marginHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: dynamicSize(25),
    },
    cartButton: {
        padding: 15,
    },
    backgroundStyles: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: dynamicSize(43),
        width: dynamicSize(43),
        borderRadius: dynamicSize(25),
    },
});

export default HeaderWithCartForSubscription;
