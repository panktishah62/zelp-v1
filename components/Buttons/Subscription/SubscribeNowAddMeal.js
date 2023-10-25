import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    finalPlanDetails,
    selectSubscriptionPlan,
} from '../../../redux/actions/subscriptionActions';
import { colors } from '../../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideDialog, showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';
import { calculateTotal } from '../../../redux/services/subscriptionCartCalculations';
import { dynamicSize } from '../../../utils/responsive';

const SubscribeNowAddMeal = props => {
    const { navigationHandler, navigationToLogin, data, numOfMealsSelected } =
        props;
    // const planID = props.itemId;

    const dispatch = useDispatch();
    const { config } = useSelector(state => state.subscriptionDetails);
    const { finalPrice } = useSelector(state => state.finalSubscriptionPrice);

    const handleSubscribe = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token != null) {
            const resultData = calculateTotal(data, numOfMealsSelected, config);
            dispatch(selectSubscriptionPlan(resultData));
            navigationHandler();
        } else {
            toggleModal();
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

    const { isModalVisible, toggleModal } = props;

    return (
        <View style={buttonStyles.wrapperContainer}>
            <View style={buttonStyles.container}>
                <TouchableOpacity onPress={handleSubscribe}>
                    <View style={buttonStyles.orangeButton}>
                        <Text style={buttonStyles.orangeButtonText}>
                            Subscribe Now
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                    <View style={buttonStyles.whiteButton}>
                        <Text style={buttonStyles.whiteButtonText}>
                            Add Meal
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const buttonStyles = StyleSheet.create({
    wrapperContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        height: dynamicSize(87),
        marginTop: dynamicSize(20),
        backgroundColor: colors.BACKGROUND_LIGHT, // Background color
        elevation: dynamicSize(12),
        ...Platform.select({
            ios: {
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                shadowColor: colors.BLACK,
            },
            android: {
                elevation: 12, // Android uses elevation for shadows
            },
        }),
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        height: dynamicSize(87),
        marginTop: dynamicSize(20),
        borderWidth: dynamicSize(2),
        borderColor: colors.BORDER_GREY,
        backgroundColor: colors.BACKGROUND_LIGHT, // Background color
    },
    orangeButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.fullWidth / 2 + 10,
        height: 47,
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 5,
        marginHorizontal: 15,
    },
    whiteButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.fullWidth / 2 - 70,
        height: 47,
        borderColor: colors.DARKER_GRAY,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 15,
    },
    orangeButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_700_16.fontFamily,
        fontSize: 18,
        textTransform: 'capitalize',
    },
    whiteButtonText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',

        textTransform: 'capitalize',
    },
});

export default SubscribeNowAddMeal;
