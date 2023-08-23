import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/BackWhite.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import CartButton from '../Buttons/CartButton';

const HeaderWithCart = props => {
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
                <CartButton navigation={navigation} color={'WHITE'} />
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
    },
    button: {
        padding: 10,
    },
    cartButton: {
        padding: 15,
    },
});

export default HeaderWithCart;
