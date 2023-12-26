import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeartIcon from '../../assets/ZelpIcons/HeartIcon.svg';
import NotificationIcon from '../../assets/ZelpIcons/NotificationIcon.svg';
import ShoppingBagButton from '../Buttons/ShoppingBagButton';
import { dynamicSize } from '../../utils/responsive';

const HeaderWithProductDetails = props => {
    const { navigation, title, onBack, onClick, containerStyles } = props;
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity
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
            <View style={styles.actionButtonViewStyle}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <NotificationIcon height="22" width="22" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <HeartIcon height="22" width="22" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <ShoppingBagButton navigation={navigation} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // paddingLeft: dynamicSize(20),
        // paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        paddingHorizontal: 5,
        height: dynamicSize(50),
        // backgroundColor: colors.BLUE_DARK,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    actionButtonViewStyle: {
        flexDirection: 'row',
    },
    userButton: {
        padding: 10,
        paddingRight: 15,
        alignItems: 'center',
        width: dimensions.fullWidth * 0.2,
    },
    actionButton: {
        padding: dynamicSize(10),
        // paddingRight: 15,
        // alignItems: 'center',
        // width: dimensions.fullWidth * 0.2,
    },

    title: {
        paddingLeft: 5,
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
    },
});

export default HeaderWithProductDetails;
