import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/BackWhite.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import CartButton from '../Buttons/CartButton';
import ShotsCoinAnimation from '../Animations/ShotsCoinAnimation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HeaderWithCart = props => {
    const { onBack, onClick } = props;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
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
                <ShotsCoinAnimation />
                <CartButton navigation={navigation} color={'WHITE'} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    button: {
        padding: 25,
    },
    cartButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
});

export default HeaderWithCart;
