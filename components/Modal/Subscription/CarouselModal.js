import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    requireNativeComponent,
} from 'react-native';
import Modal from 'react-native-modal';
import CaroselComponent from '../../Cards/Subscription/CaroselComponent';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    mealDetailsDecreased,
    mealDetailsIncreased,
    selectSubscriptionPlan,
} from '../../../redux/actions/subscriptionActions';
import { colors } from '../../../styles/colors';
import { calculateTotal } from '../../../redux/services/subscriptionCartCalculations';

const CarouselModal = props => {
    const dispatch = useDispatch();
    const {
        data,
        isModalVisible,
        toogleModal,
        navigation,
        addMeals,
        subtractMeals,
    } = props;
    const { config, selectedSubscription } = useSelector(
        state => state.subscriptionDetails,
    );
    const mealCount = selectedSubscription?.numOfMealsSelected;
    const validityPerMeal =
        selectedSubscription?.subscriptionPlan?.validityPerMeal;

    const calculate = numOfMealsSelected => {
        if (selectedSubscription && numOfMealsSelected && config) {
            const resultData = calculateTotal(
                selectedSubscription?.subscriptionPlan,
                numOfMealsSelected,
                config,
            );
            dispatch(selectSubscriptionPlan(resultData));
        }
    };

    const handleAddMeal = () => {
        if (
            selectedSubscription &&
            selectedSubscription?.subscriptionPlan?.minimunNumOfMeals <=
                selectedSubscription?.numOfMealsSelected
        ) {
            calculate(selectedSubscription?.numOfMealsSelected + 1);
        }
    };

    const handleRemoveMeal = () => {
        if (
            selectedSubscription &&
            selectedSubscription?.subscriptionPlan?.minimunNumOfMeals <
                selectedSubscription?.numOfMealsSelected
        ) {
            calculate(selectedSubscription?.numOfMealsSelected - 1);
        }
    };

    return (
        <Modal
            style={styles.wrapperModalContainer}
            animationType="slide"
            transparent={true}
            visible={isModalVisible}>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Choose your plan</Text>
            </View>

            <View>
                <CaroselComponent navigation={navigation} showKnowMore={true} />
            </View>
            <View style={mealsStyles.container}>
                <View>
                    <Text style={mealsStyles.firstText}>Add on Meal</Text>
                    <Text>
                        (Every 1 extra meal-{' '}
                        {
                            selectedSubscription?.subscriptionPlan
                                ?.validityPerMeal
                        }{' '}
                        day extra validity)
                    </Text>
                </View>
                <View style={mealsStyles.buttonContainer}>
                    <TouchableOpacity onPress={handleRemoveMeal}>
                        <View style={[mealsStyles.minusButton]}>
                            <Text>-</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '700', color: 'black' }}>
                        {selectedSubscription?.numOfMealsSelected}
                    </Text>
                    <TouchableOpacity onPress={handleAddMeal}>
                        <View style={mealsStyles.plusButton}>
                            <Text style={{ color: '#fff' }}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={mealsStyles.crossContainer}>
                <TouchableOpacity onPress={toogleModal}>
                    <Image
                        source={require('../../../assets/images/Subscription/cross.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapperButton}>
                <TouchableOpacity onPress={toogleModal}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapperModalContainer: {
        position: 'absolute',
        bottom: -10,
        left: -20,
        right: -20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.fullWidth - 60,
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 12,
        marginVertical: 14,
        height: 48,
    },
    buttonText: {
        color: '#FFF',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',

        textTransform: 'capitalize',
    },
    imageContainer: {
        position: 'absolute',
        top: 1,
        right: 16,
    },
    image: {
        width: 24,
        height: 24,
    },
    button: {
        display: 'flex',
        flexShrink: 0,
    },
    wrapperButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
        marginLeft: 20,
        textTransform: 'capitalize',
    },
    heading: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        margin: 10,
    },
});
const mealsStyles = StyleSheet.create({
    container: {
        marginVertical: 8,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth,
    },
    firstText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',

        letterSpacing: 0.54,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 90,
        justifyContent: 'space-between',
    },
    text: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 'normal',
        letterSpacing: 0.54,
    },
    plusButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28.28,
        height: 28.28,
        borderRadius: 28,

        backgroundColor: colors.ORANGE_WHITE,
    },
    changeBackground: {
        borderColor: colors.ORANGE_WHITE,
    },
    minusButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28.28,
        height: 28.28,
        borderRadius: 28,
        borderWidth: 1,
    },
    firstText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',

        letterSpacing: 0.48,
    },
    secondText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.36,
    },
    crossContainer: {
        position: 'absolute',
        top: 10,
        right: 16,
    },
});

export default CarouselModal;
