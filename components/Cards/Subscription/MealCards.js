import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import {
    addSubscribedItemToCart,
    removeSubscribedItemFromCart,
    selectMenu,
    setSubscriptionMealType,
} from '../../../redux/actions/subscriptionActions';
import moment from 'moment';
import { getMealPlansForSubscription } from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';

const MealCards = props => {
    
    const { planID } = useSelector(state => state.finalSubscriptionPrice);
    const { mealType } = useSelector(state => state.mealTypeForSubscription);

    const [mealPlans, setMealPlans] = useState([]);
    const fetchMealPlanType = async () => {
        const response = await getMealPlansForSubscription(planID);
        setMealPlans(response.data.data);
        dispatch(
            setSubscriptionMealType(
                response.data.data[0].type,
                response.data.data[0]._id,
                '',
            ),
        );
    };
    useEffect(() => {
        fetchMealPlanType();
    }, [planID,mealType,setMealPlans]);

    const {
        isButtonVisible,
        isCart,
        isHeadingVisible,
        activeOrangeButton,
        showRatingNumber,
        showInfoText,
        heading,
        data,
        toggleModal,
        isDynamic,
    } = props;

    const dispatch = useDispatch();

    const {
        isSelectedAny,
        index: gotIndex,
        componentName,
    } = useSelector(state => state.subscriptionSelectMenu);
    // console.log(isSelectedAny,gotIndex,componentName)

    const selectButtonHandler = (
        index,
        componentName,
        itemName,
        itemImage,
        itemType,
        foodItemId,
    ) => {
        // dispatch(resetSelectionButton())
        dispatch(selectMenu(index, componentName));
        itemAddToCartHandler(index, itemName, itemImage, itemType, foodItemId);
    };

    const handleKnowMore = () => {  
        toggleModal()
    }


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
        // navigation.navigate('Subscription')
    };

   


    const filterData = isVegButtonActive
        ? data.filter(item => item.vegText === 'Veg')
        : data;
    const renderItem = () => {
        return (
            filterData &&
            filterData?.map((item, index) => (
                <View key={index} style={styles.wrapperContainer}>
                    <View style={styles.itemConainer}>
                        <View style={styles.leftContainer}>
                            <View style={styles.imageContainer}>
                                {isDynamic && (
                                    <Image
                                        style={{
                                            height: dynamicSize(100),
                                            borderRadius: 50,
                                        }}
                                        source={{ uri: item.image }}
                                    />
                                )}
                                {!isDynamic && (
                                    <Image
                                        style={{ height: dynamicSize(100) }}
                                        source={item.image}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.firstContainer}>
                                <View style={styles.vegContainer}>
                                    <Image
                                        source={require('../../../assets/images/Subscription/veg.png')}
                                    />
                                    <Text style={styles.vegText}>
                                        {item.vegText}
                                    </Text>
                                </View>
                                <View style={styles.middleTextContainer}>
                                    <Text style={styles.boldText}>
                                        {item.boldText}
                                    </Text>
                                    {showRatingNumber && (
                                        <Image
                                            style={styles.nextImage}
                                            source={require('../../../assets/images/Subscription/golden_star.png')}
                                        />
                                    )}
                                    {showRatingNumber && (
                                        <Text
                                            style={[
                                                styles.firstText,
                                                { marginLeft: dynamicSize(3) },
                                            ]}>
                                            {item.rating}{' '}
                                        </Text>
                                    )}
                                </View>
                                {showInfoText && (
                                    <TouchableOpacity onPress={handleKnowMore}>
                                    <View style={styles.vegContainer}>
                                        <Text style={styles.lastText}>
                                            Know more
                                        </Text> 
                                        <Image
                                            source={require('../../../assets/images/Subscription/info.png')}
                                        />
                                    </View>
                                    </TouchableOpacity>
                                )}

                                {activeOrangeButton && index !== gotIndex && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            selectButtonHandler(
                                                index,
                                                heading,
                                                item.boldText,
                                                item.image,
                                                item.vegText,
                                                item._id,
                                            )
                                        }>
                                        <View
                                            style={
                                                styles.selectButtonContainer
                                            }>
                                            <Text
                                                style={styles.selectButtonText}>
                                                Select
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                {activeOrangeButton &&
                                    index === gotIndex &&
                                    componentName !== heading && (
                                        <TouchableOpacity
                                            onPress={() =>
                                                selectButtonHandler(
                                                    index,
                                                    heading,
                                                    item.boldText,
                                                    item.image,
                                                    item.vegText,
                                                    item._id,
                                                )
                                            }>
                                            <View
                                                style={
                                                    styles.selectButtonContainer
                                                }>
                                                <Text
                                                    style={
                                                        styles.selectButtonText
                                                    }>
                                                    Select
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                {activeOrangeButton &&
                                    isSelectedAny &&
                                    index === gotIndex &&
                                    componentName === heading && (
                                        <TouchableOpacity>
                                            <View
                                                style={
                                                    styles.selectedButtonContainer
                                                }>
                                                <Image
                                                    style={styles.tickIcon}
                                                    source={require('../../../assets/images/Subscription/tick.png')}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                {isCart && (
                                    <TouchableOpacity
                                        onPress={removeCartHandler}>
                                        <View
                                            style={
                                                styles.selectButtonContainer
                                            }>
                                            <Text
                                                style={styles.selectButtonText}>
                                                Remove
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            ))
        );
    };
    const formatTimeRange = timing => {
  if(timing!==undefined){
    const formattedOpeningTime = moment(timing.openingTime).format(
        'h:mm A',
    );
    const formattedClosingTime = moment(timing.closingTime).format(
        'h:mm A',
    );
    return `${formattedOpeningTime} - ${formattedClosingTime}`;
    };
}
    const findTiming = () => {
      
        const timing = mealPlans?.find(item => item.type === mealType);
        console.log(timing?.timing,"timing")
        const formattedTiming = formatTimeRange(timing?.timing);
        console.log(formattedTiming)
        return formattedTiming; 
    };


    const handleMenuType = type => {
   
        dispatch(setSubscriptionMealType(type));
    };

    return (
        <View>
            {isButtonVisible && (
                <View style={buttonStyles.buttonContainer}>
               {mealPlans && mealPlans.map((item, index) => ( 
                 <TouchableOpacity
                 onPress={() => handleMenuType(item.type)}>
                 <View
                     style={[
                         buttonStyles.eachButtonStyle,
                         mealType === item.type &&
                             buttonStyles.changeStyle,
                     ]}>
                     <Text
                         style={[
                             buttonStyles.textStyle,
                             mealType === item.type &&
                                 buttonStyles.changeTextStyle,
                         ]}>
                       {item.type}
                     </Text>
                 </View>
             </TouchableOpacity>   
                )  )}
                </View>
            )}
            {isHeadingVisible && (
                <View style={belowButtonStyle.container}>
                    <Text style={belowButtonStyle.textStyle}>
                        Available from {findTiming()}
                    </Text>
                </View>
            )}

            <View>{renderItem()}</View>
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
        backgroundColor:colors.WHITE,
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
        backgroundColor:colors.ORANGE_WHITE,
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
});

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.ORANGE_WHITE,
        height: 30,
        margin: dynamicSize(14),
        flexShrink: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eachButtonStyle: {
        borderRadius: 5,

        width: dimensions.fullWidth / 3 - dynamicSize(10),
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeStyle: {
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 5,
        color: colors.WHITE,
    },
    textStyle: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',

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
