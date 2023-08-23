import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ navigation }) => {
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
    },
    button: {
        padding: 10,
    },
});

export default Header;
