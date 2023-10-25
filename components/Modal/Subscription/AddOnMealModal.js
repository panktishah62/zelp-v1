import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
// import Modal from 'react-native-modal';
import { dimensions, fonts } from '../../../styles';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import SubscribeNowAddMeal from '../../Buttons/Subscription/SubscribeNowAddMeal';
import { useDispatch, useSelector } from 'react-redux';
import {
    finalPlanDetails,
    mealDetailsDecreased,
    mealDetailsIncreased,
    selectSubscriptionPlan,
} from '../../../redux/actions/subscriptionActions';
import { colors } from '../../../styles/colors';
import { hideDialog, showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateTotal } from '../../../redux/services/subscriptionCartCalculations';
import { Modal, Portal } from 'react-native-paper';

// const AddOnMealModal = props => {
//     const dispatch = useDispatch();
//     const addMeals = props?.addMeals;
//     const subtractMeals = props?.subtractMeals;
//     const numOfMealsSelected = props?.numOfMealsSelected;
//     const validityBasedOnMeals = props?.validityBasedOnMeals;
//     const data = props?.data;
//     const itemId = props.itemId;
//     const isVisible = props?.isVisible;
//     const planID = itemId;
//     const isModalVisible = props?.isModalVisible;
//     const setModalVisible = props?.setModalVisible;

//     const { navigationHandler, navigationToLogin } = props;

//     // const [isModalVisible, setModalVisible] = useState(false);

//     const handleAddMeal = () => {
//         addMeals();
//     };

//     const handleRemoveMeal = () => {
//         subtractMeals();
//     };
//     const { config } = useSelector(state => state.subscriptionDetails);
//     const { finalPrice } = useSelector(state => state.finalSubscriptionPrice);

//     const toggleModal = async () => {
//         const token = await AsyncStorage.getItem('token');
//         if (token != null) {
//             setModalVisible(!isModalVisible);
//         } else {
//             dispatch(
//                 showDialog({
//                     isVisible: true,
//                     titleText: 'Please LogIn',
//                     subTitleText: 'You are not Logged In!',
//                     buttonText1: 'LOGIN',
//                     buttonFunction1: () => {
//                         navigationToLogin();
//                         dispatch(hideDialog());
//                     },
//                     type: DialogTypes.WARNING,
//                 }),
//             );
//         }
//     };

//     const handleSubscribe = async () => {
//         const token = await AsyncStorage.getItem('token');
//         if (token != null) {
//             const resultData = calculateTotal(data, numOfMealsSelected, config);
//             dispatch(selectSubscriptionPlan(resultData));
//             // dispatch(finalPlanDetails({ finalPrice, planID }));
//             // toggleModal()
//             navigationHandler();
//         } else {
//             toggleModal();
//             dispatch(
//                 showDialog({
//                     isVisible: true,
//                     titleText: 'Please LogIn',
//                     subTitleText: 'You are not Logged In!',
//                     buttonText1: 'LOGIN',
//                     buttonFunction1: () => {
//                         navigationToLogin();
//                         dispatch(hideDialog());
//                     },
//                     type: DialogTypes.WARNING,
//                 }),
//             );
//         }
//     };

//     return (
//         <View>
//             <SubscribeNowAddMeal
//                 itemId={itemId}
//                 data={data}
//                 isModalVisible={isModalVisible}
//                 navigationHandler={navigationHandler}
//                 toggleModal={toggleModal}
//                 navigationToLogin={navigationToLogin}
//                 numOfMealsSelected={numOfMealsSelected}
//             />
//             <Modal
//                 style={styles.wrapperModalContainer}
//                 animationType="slide"
//                 transparent={true}
//                 visible={isModalVisible}>
//                 <View style={styles.innerContainer}>
//                     <View style={styles.modalContainer}>
//                         <View style={addOnMealStyles.container}>
//                             <Text style={addOnMealStyles.text}>
//                                 Add on Meal
//                             </Text>
//                             <View style={styles.imageContainer}>
//                                 <TouchableOpacity onPress={toggleModal}>
//                                     <Image
//                                         source={require('../../../assets/images/Subscription/cross.png')} // Replace with your image source
//                                         style={styles.image}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={mealsStyles.container}>
//                             <Text style={mealsStyles.firstText}>
//                                 Select No. of Meals
//                             </Text>
//                             <View style={mealsStyles.buttonContainer}>
//                                 <TouchableOpacity onPress={handleRemoveMeal}>
//                                     <View style={[mealsStyles.minusButton]}>
//                                         <View
//                                             style={
//                                                 mealsStyles.minusButtonInner
//                                             }>
//                                             <Text style={{ fontSize: 26 }}>
//                                                 -
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 </TouchableOpacity>
//                                 {numOfMealsSelected && (
//                                     <Text style={viewStyles.buttonText}>
//                                         {numOfMealsSelected}
//                                     </Text>
//                                 )}
//                                 <TouchableOpacity onPress={handleAddMeal}>
//                                     <View style={mealsStyles.plusButton}>
//                                         <View
//                                             style={mealsStyles.plusButtonInner}>
//                                             <Text
//                                                 style={{
//                                                     color: '#fff',
//                                                     fontSize: 22,
//                                                 }}>
//                                                 +
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={viewStyles.container}>
//                             <Text style={viewStyles.text}>
//                                 {' '}
//                                 Validity of the plan
//                             </Text>
//                             <View style={viewStyles.buttonContainer}>
//                                 <Text style={viewStyles.buttonText}>
//                                     {validityBasedOnMeals} days
//                                 </Text>
//                             </View>
//                         </View>
//                         <TouchableOpacity onPress={handleSubscribe}>
//                             <View style={styles.buttonContainer}>
//                                 <Text style={styles.buttonText}>
//                                     Subscribe Now
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

const AddOnMealModal = props => {
    const dispatch = useDispatch();
    const addMeals = props?.addMeals;
    const subtractMeals = props?.subtractMeals;
    const numOfMealsSelected = props?.numOfMealsSelected;
    const validityBasedOnMeals = props?.validityBasedOnMeals;
    const data = props?.data;
    const itemId = props.itemId;
    const isVisible = props?.isVisible;
    const planID = itemId;
    const isModalVisible = props?.isModalVisible;
    const setModalVisible = props?.setModalVisible;

    const { navigationHandler, navigationToLogin } = props;

    // const [isModalVisible, setModalVisible] = useState(false);

    const handleAddMeal = () => {
        addMeals();
    };

    const handleRemoveMeal = () => {
        subtractMeals();
    };
    const { config } = useSelector(state => state.subscriptionDetails);
    const { finalPrice } = useSelector(state => state.finalSubscriptionPrice);

    const toggleModal = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token != null) {
            setModalVisible(!isModalVisible);
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

    const handleSubscribe = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token != null) {
            const resultData = calculateTotal(data, numOfMealsSelected, config);
            dispatch(selectSubscriptionPlan(resultData));
            // dispatch(finalPlanDetails({ finalPrice, planID }));
            // toggleModal()
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

    return (
        <View>
            <SubscribeNowAddMeal
                itemId={itemId}
                data={data}
                isModalVisible={isModalVisible}
                navigationHandler={navigationHandler}
                toggleModal={toggleModal}
                navigationToLogin={navigationToLogin}
                numOfMealsSelected={numOfMealsSelected}
            />
            <Portal>
                <Modal
                    contentContainerStyle={styles.container}
                    visible={isModalVisible}>
                    <View style={styles.innerContainer}>
                        <View style={styles.addOnMealStylesContainer}>
                            <Text style={styles.titleText}>Add on Meal</Text>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Image
                                        source={require('../../../assets/images/Subscription/cross.png')} // Replace with your image source
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewStylesContainer}>
                            <Text style={styles.subtitleText}>
                                Select No. of Meals
                            </Text>
                            <View style={styles.addSub}>
                                <TouchableOpacity onPress={handleRemoveMeal}>
                                    <View style={[styles.minusButton]}>
                                        <View styles={styles.minusButtonInner}>
                                            <Text
                                                style={{
                                                    fontSize: dynamicSize(26),
                                                }}>
                                                -
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {numOfMealsSelected && (
                                    <Text style={styles.buttonTextAddSub}>
                                        {numOfMealsSelected}
                                    </Text>
                                )}
                                <TouchableOpacity onPress={handleAddMeal}>
                                    <View style={styles.plusButton}>
                                        <View style={styles.plusButtonInner}>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 22,
                                                }}>
                                                +
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewStylesContainer}>
                            <Text style={styles.viewStylesText}>
                                {' '}
                                Validity of the plan
                            </Text>
                            <View style={styles.viewStylesButtonContainer}>
                                <Text style={styles.viewStylesButtonText}>
                                    {validityBasedOnMeals} days
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubscribe}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>
                                    Subscribe Now
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: dynamicSize(250),
        backgroundColor: colors.WHITE,
        top: dynamicSize(250),
        borderTopLeftRadius: dynamicSize(20),
        borderTopRightRadius: dynamicSize(20),
    },
    containerStyles: {},
    titleText: {
        color: colors.ORANGE_WHITE,
        textAlign: 'center',
        fontFamily: fonts.NUNITO_800_18.fontFamily,
        fontSize: 18,
        letterSpacing: 0.54,
    },
    subtitleText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.54,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        width: dimensions.fullWidth - dynamicSize(60),
        paddingVertical: 10,
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFF',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',

        textTransform: 'capitalize',
    },
    minusButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dynamicSize(28),
        height: dynamicSize(28),
        borderRadius: dynamicSize(28),
        borderWidth: 1,
    },
    minusButtonInner: {
        backgroundColor: 'black',
        height: 1.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusButtonInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dynamicSize(28),
        height: dynamicSize(28),
        borderRadius: dynamicSize(28),
        elevation: 5,
        backgroundColor: colors.ORANGE_WHITE,
    },
    minusButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dynamicSize(28),
        height: dynamicSize(28),
        borderRadius: dynamicSize(28),
        borderWidth: 1,
    },
    smallButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: dynamicSize(90),
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    buttonTextAddSub: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_600_16.fontFamily,
        fontSize: normalizeFont(16),
    },
    viewStylesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth - 60,
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    viewStylesText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.54,
    },
    viewStylesButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 30,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.DARKER_GRAY,
    },
    viewStylesButtonText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_600_16.fontFamily,
        fontSize: 16,
    },
    addSub: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: dynamicSize(90),
        justifyContent: 'space-between',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    addOnMealStylesContainer: {
        margin: 14,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        width: dimensions.fullWidth,
    },
});

// const styles = StyleSheet.create({
//     mainContainer: {
//         // elevation: 10,
//     },
//     wrapperModalContainer: {
//         // borderWidth: 1,
//         elevation: 10,
//         display: 'flex',
//         position: 'absolute',
//         bottom: dynamicSize(-30),
//         left: dynamicSize(-20),
//         right: dynamicSize(-20),
//         marginVertical: dynamicSize(30),
//         borderTopLeftRadius: dynamicSize(20),
//         borderTopRightRadius: dynamicSize(20),
//         elevation: dynamicSize(10),
//     },
//     innerContainer: {
//         bottom: dynamicSize(0),
//         left: dynamicSize(0),
//         right: dynamicSize(0),
//         borderTopLeftRadius: dynamicSize(20),
//         borderTopRightRadius: dynamicSize(20),
//         elevation: dynamicSize(10),
//         backgroundColor: colors.BLACK,
//     },
//     modalContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         display: 'flex',
//         gap: dynamicSize(10),
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//         borderTopLeftRadius: dynamicSize(20),
//         borderTopRightRadius: dynamicSize(20),
//     },
//     buttonContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         width: dimensions.fullWidth - dynamicSize(60),
//         paddingVertical: 10,
//         backgroundColor: colors.ORANGE_WHITE,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontFamily: fonts.NUNITO_700_12.fontFamily,
//         fontSize: 18,
//         fontStyle: 'normal',
//         fontWeight: '700',

//         textTransform: 'capitalize',
//     },
//     imageContainer: {
//         position: 'absolute',
//         top: 1,
//         right: 16,
//     },
//     image: {
//         width: 24,
//         height: 24,
//     },
//     button: {
//         display: 'flex',
//         flexShrink: 0,
//     },
// });

// const mealsStyles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: dimensions.fullWidth - dynamicSize(60),

//         flexDirection: 'row',
//     },
//     firstText: {
//         color: colors.DARKER_GRAY,
//         fontFamily: fonts.NUNITO_600_12.fontFamily,
//         fontSize: 18,
//         fontStyle: 'normal',
//         fontWeight: '600',

//         letterSpacing: 0.54,
//     },
//     buttonContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: 90,
//         justifyContent: 'space-between',
//     },
//     text: {
//         color: colors.ORANGE_WHITE,
//         fontFamily: fonts.NUNITO_800_12.fontFamily,
//         fontSize: 18,
//         fontStyle: 'normal',
//         fontWeight: '800',
//         lineHeight: 'normal',
//         letterSpacing: 0.54,
//     },
//     plusButton: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 28.28,
//         height: 28.28,
//         borderRadius: 28,
//         elevation: 5,
//         backgroundColor: colors.ORANGE_WHITE,
//     },
//     plusButtonInner: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     changeBackground: {
//         borderColor: colors.ORANGE_WHITE,
//     },
//     minusButton: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 28.28,
//         height: 28.28,
//         borderRadius: 28,
//         borderWidth: 1,
//     },
//     minusButtonInner: {
//         backgroundColor: 'black',
//         height: 1.4,
//     },
//     changeBorder: {
//         borderColor: colors.ORANGE_WHITE,
//     },
// });

// const addOnMealStyles = StyleSheet.create({
//     container: {
//         margin: 14,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',

//         width: dimensions.fullWidth,
//     },
//     text: {
//         color: colors.ORANGE_WHITE,
//         textAlign: 'center',
//         fontFamily: fonts.NUNITO_800_18.fontFamily,
//         fontSize: 18,
//         letterSpacing: 0.54,
//     },
// });

// const viewStyles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: dimensions.fullWidth - 60,
//         height: 50,
//         backgroundColor: '#fff',
//         marginBottom: 5,
//     },
//     text: {
//         color: colors.DARKER_GRAY,
//         fontFamily: fonts.NUNITO_600_12.fontFamily,
//         fontSize: 18,
//         fontStyle: 'normal',
//         fontWeight: '600',
//         letterSpacing: 0.54,
//     },
//     buttonText: {
//         color: colors.DARKER_GRAY,
//         textAlign: 'center',
//         fontFamily: fonts.POPPINS_600_16.fontFamily,
//         fontSize: 16,
//     },
//     buttonContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 90,
//         height: 30,
//         backgroundColor: '#F4F4F4',
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.DARKER_GRAY,
//     },
// });

export default AddOnMealModal;
