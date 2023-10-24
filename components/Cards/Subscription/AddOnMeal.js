import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    View,
    Text,
    // Image,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideDialog, showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';
import { useDispatch } from 'react-redux';

const AddOnMeals = props => {
    const toggleModal = props?.toggleModal;
    const navigation = props?.navigation;
    const isModalVisible = props?.isModalVisible;
    const dispatch = useDispatch();

    const navigationToLogin = () => {
        navigation.navigate('LogIn');
    };

    const onAddOnMeal = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token != null) {
            toggleModal();
        } else {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please LogIn',
                    subTitleText: 'You are not Logged In!',
                    buttonText1: 'LOGIN',
                    buttonFunction1: () => {
                        navigationToLogin();
                        dispatch(hideDialog());
                    },
                    type: DialogTypes.WARNING,
                }),
            );
        }
    };
    return (
        <TouchableOpacity style={styles.wrapeer} onPress={onAddOnMeal}>
            <View style={styles.container}>
                <View style={styles.textSection}>
                    <Text style={styles.firstText}>ADD ON MEALS</Text>
                    <Text style={styles.secondText}>
                        (Every 1 extra meal - 1 day extra validity)
                    </Text>
                </View>
                <View style={styles.iconSection}>
                    <FastImage
                        source={require('../../../assets/images/Subscription/rightArrow.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapeer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginHorizontal: dynamicSize(10),
        marginVertical: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 14,
        elevation: 5,
        paddingVertical: dynamicSize(10),
        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: dimensions.fullWidth - dynamicSize(34),
        borderRadius: dynamicSize(14),
        overflow: 'hidden',
    },
    textSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        padding: 10,
    },
    firstText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: dynamicSize(18), // Calculated line height for 140.8%
        letterSpacing: 0.54,
    },
    secondText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: dynamicSize(22),
        letterSpacing: 0.42,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3, // This is for Android shadow
    },
    gradient: {
        borderWidth: 2,
        borderColor: colors.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10, // This property adds shadow on Android
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default AddOnMeals;
