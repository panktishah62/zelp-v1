import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '../../assets/icons/HomeIcon.svg';
import { normalizeFont } from '../../utils/responsive';
const HeaderWithHome = props => {
    const { navigation, title, onBack, onClick, containerStyles } = props;
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.mainContainer, containerStyles]}>
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
            <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                    navigation.popToTop();
                }}>
                <HomeIcon />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        padding: 10,
    },
    title: {
        color: colors.BLACK,
        ...fonts.NUNITO_600_16,
        fontSize: normalizeFont(18),
    },
    icon: {
        paddingHorizontal: 20,
    },
});

export default HeaderWithHome;
