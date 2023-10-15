import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSubscribedItemToCart,
    removeSubscribedItemFromCart,
    selectMenu,
    setSubscriptionMealType,
} from '../../../redux/actions/subscriptionActions';
import moment from 'moment';
import {
    getCombos,
    getMealPlansForSubscription,
} from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';
import VEGICON from '../../../assets/icons/VegIcon.svg';
import NONVEGICON from '../../../assets/icons/nonveg.svg';
import MealItemCard from './MealItemCard';

const MealCards = props => {
    const selectedPlan = props?.data;
    const planID = selectedPlan?._id;
    const [selectedMealPlan, setSelectedMealPlan] = useState(null);
    const [mealPlans, setMealPlans] = useState([]);
    const [combosArray, setCombosArray] = useState([]);

    const fetchMealPlanType = async () => {
        if (planID) {
            const response = await getMealPlansForSubscription(planID);
            if (response?.data?.data) {
                const respData = response.data.data;
                setMealPlans(respData);
                if (respData.length) {
                    setSelectedMealPlan(respData[0]);
                    dispatch(
                        setSubscriptionMealType(
                            respData[0].type,
                            respData[0]._id,
                            respData[0].timing,
                        ),
                    );
                }
            }
        }
    };
    useEffect(() => {
        fetchMealPlanType();
    }, [planID]);

    const {
        isButtonVisible,
        isCart,
        isHeadingVisible,
        activeOrangeButton,
        showRatingNumber,
        showInfoText,
        heading,
        toggleModal,
        isDynamic,
    } = props;

    const dispatch = useDispatch();

    const {
        isSelectedAny,
        index: gotIndex,
        componentName,
    } = useSelector(state => state.subscriptionSelectMenu);

    const selectButtonHandler = (
        index,
        componentName,
        itemName,
        itemImage,
        itemType,
        foodItemId,
    ) => {
        dispatch(selectMenu(index, componentName));
        itemAddToCartHandler(index, itemName, itemImage, itemType, foodItemId);
    };

    const handleKnowMore = item => {
        toggleModal(item);
    };

    const itemAddToCartHandler = (
        index,
        itemName,
        itemImage,
        itemType,
        foodItemId,
    ) => {
        const cartObj = {
            itemName,
            itemImage,
            itemType,
            itemId: index,
            foodItemId,
        };

        dispatch(addSubscribedItemToCart(cartObj));
    };

    const { isVegButtonActive } = useSelector(state => state.vegbutton);
    const removeCartHandler = () => {
        dispatch(removeSubscribedItemFromCart());
    };

    const filterData = isVegButtonActive
        ? combosArray.filter(item => item.vegText === 'Veg')
        : combosArray;
    const renderItem = () => {
        return (
            filterData &&
            filterData?.map((item, index) => (
                <View key={index}>
                    <MealItemCard
                        item={item}
                        isSelectable={false}
                        handleKnowMore={handleKnowMore}
                    />
                </View>
            ))
        );
    };

    const findTiming = () => {
        if (selectedMealPlan) {
            const timing = selectedMealPlan.timing;
            return `${timing?.openingTime} - ${timing?.closingTime}`;
        }
    };

    const handleMenuType = item => {
        setSelectedMealPlan(item);
        dispatch(setSubscriptionMealType(item?.type, item?._id, item?.timing));
    };

    const onSelectMealPlan = async plan => {
        const response = await getCombos(plan?._id, plan?.type);
        setCombosArray(response?.data?.data);
    };

    useEffect(() => {
        if (selectedMealPlan) {
            onSelectMealPlan(selectedMealPlan);
        }
    }, [selectedMealPlan]);

    return (
        <View>
            {isButtonVisible && (
                <View style={buttonStyles.buttonContainer}>
                    {mealPlans &&
                        selectedMealPlan &&
                        mealPlans.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => handleMenuType(item)}
                                key={index}>
                                <View
                                    style={[
                                        buttonStyles.eachButtonStyle,
                                        selectedMealPlan.type === item.type &&
                                            buttonStyles.changeStyle,
                                    ]}>
                                    <Text
                                        style={[
                                            buttonStyles.textStyle,
                                            selectedMealPlan.type ===
                                                item.type &&
                                                buttonStyles.changeTextStyle,
                                        ]}>
                                        {item.type}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            )}
            {isHeadingVisible && mealPlans.length > 0 && (
                <View style={belowButtonStyle.container}>
                    <Text style={belowButtonStyle.textStyle}>
                        Available from {findTiming()}
                    </Text>
                </View>
            )}

            {combosArray && combosArray.length > 0 && (
                <View>{renderItem()}</View>
            )}
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>
                    & Lot more meals to choose
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    imageContainer: {
        width: dynamicSize(100),
    },
    image: {
        width: dynamicSize(100),
    },
    nextImage: {
        marginLeft: dynamicSize(10),
    },
    wrapperContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: dynamicSize(10),
        marginVertical: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 14,
        elevation: 5,
    },
    middleTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemConainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: dynamicSize(20),
        height: 129.5,
        margin: dynamicSize(8),
    },
    leftContainer: {
        width: dynamicSize(90),
        height: 100,
        flexShrink: 0,
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: dimensions.fullWidth - dynamicSize(160),
        gap: dynamicSize(10),
    },
    firstContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        height: 100,
        flexShrink: 0,
        width: dimensions.fullWidth / 2 + dynamicSize(30),
    },
    secondContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 100,
    },
    vegContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: dynamicSize(6),
        marginLeft: dynamicSize(4),
    },
    boldText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(17),
        fontStyle: 'normal',
        fontWeight: '600',
        marginVertical: dynamicSize(6),
        marginLeft: dynamicSize(4),
    },
    lastText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    firstText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    gradient: {
        borderRadius: 14,
    },

    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: dynamicSize(6),
    },
    vegText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    selectButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 22,
        width: dynamicSize(84),
        height: 25,
        marginTop: dynamicSize(10),
    },
    tickIcon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
    selectedButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.GREEN_SHADE,
        borderRadius: 22,
        width: dynamicSize(84),
        height: 28,
        marginTop: dynamicSize(10),
    },
    selectButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
    },
    selectDisableButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors,
        borderRadius: 22,
        width: dynamicSize(84),
        height: 25,
        marginTop: dynamicSize(10),
    },
    selectDisableButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
    },
    bottomTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        ...fonts.POPPINS_500_16,
        color: colors.DARKER_GRAY,
    },
});

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        borderRadius: dynamicSize(5),
        borderWidth: 1,
        borderColor: colors.ORANGE_WHITE,
        height: dynamicSize(30),
        margin: dynamicSize(14),
        flexShrink: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eachButtonStyle: {
        borderRadius: dynamicSize(5),

        width: dimensions.fullWidth / 3 - dynamicSize(10),
        height: dynamicSize(30),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeStyle: {
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(5),
        color: colors.WHITE,
    },
    textStyle: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_700_14.fontFamily,
        textTransform: 'capitalize',
    },
    changeTextStyle: {
        color: colors.WHITE,
    },
});

const belowButtonStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',

        textTransform: 'capitalize',
    },
});

export default MealCards;
