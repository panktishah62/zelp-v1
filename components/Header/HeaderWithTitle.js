import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HeaderWithTitle = props => {
    const { navigation, title, onBack, onClick } = props;
    const insets = useSafeAreaInsets();
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
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
    },
    button: {
        padding: 10,
    },
    title: {
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
    },
});

export default HeaderWithTitle;
