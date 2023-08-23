import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HeaderWithButtons = props => {
    const { navigation, text, setText, placeholder, keyboardType } = props;

    onClick = () => {};
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.goBack();
                }}>
                <BackButton />
            </TouchableOpacity>
            <View style={Styles.row}>
                <SecondaryButton
                    text="Go To Favs"
                    onClick={onClick}
                    color={colors.BLACK}
                />
                <SecondaryButton
                    text="Ready To Order"
                    onClick={onClick}
                    color={colors.ORANGE}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
    },
    button: {
        padding: 10,
    },
});

export default HeaderWithButtons;
