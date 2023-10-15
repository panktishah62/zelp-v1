import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { getSubscriptionPlanDetails } from '../../../redux/services/subscriptionService';
import { useDispatch, useSelector } from 'react-redux';
import { dynamicSize } from '../../../utils/responsive';
import { SvgUri } from 'react-native-svg';
import { calculateTotal } from '../../../redux/services/subscriptionCartCalculations';
import { selectSubscriptionPlan } from '../../../redux/actions/subscriptionActions';

const CaroselComponent = props => {
    const { navigation, showKnowMore } = props;
    const dispatch = useDispatch();
    const { config, selectedSubscription } = useSelector(
        state => state.subscriptionDetails,
    );
    const navigateHandler = (item, string) => {
        if (string === 'priceButton' && !showKnowMore) {
            const resultData = calculateTotal(
                item,
                item?.minimunNumOfMeals,
                config,
            );
            dispatch(selectSubscriptionPlan(resultData));
            navigation.navigate('PlanDetails', { itemId: item?._id });
        } else if (string === 'priceButton') {
            const resultData = calculateTotal(
                item,
                item?.minimunNumOfMeals,
                config,
            );
            dispatch(selectSubscriptionPlan(resultData));
        }
        if (string === 'knowMoreButton' && showKnowMore) {
            navigation.navigate('PlanDetails', { itemId: item?._id });
        } else {
            return;
        }
    };

    const [responseDataArr, setResponseDataArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getSubscriptionPlanDetails();

        setResponseDataArr(response?.data?.data);
    };

    const renderItem = () => {
        //make this another component
        return (
            responseDataArr &&
            responseDataArr?.map((item, index) => (
                <View style={[styles.conatiner, styles.shadow]} key={index}>
                    <View style={styles.imageContainer}>
                        {item.image && (
                            <Image
                                style={styles.imageStyle}
                                source={{ uri: item.image }}
                            />
                        )}
                        {!item.image && (
                            <Image
                                style={styles.imageStyle}
                                source={require('../../../assets/images/Subscription/food_item_1.png')}
                            />
                        )}
                    </View>
                    <View style={styles.iconTextContainer}>
                        <Text style={styles.iconTextText}>{item.name}</Text>
                        {item.icon && (
                            <SvgUri
                                width={dynamicSize(18)}
                                height={dynamicSize(18)}
                                uri={item.icon}
                            />
                        )}
                    </View>
                    <View style={styles.simpleTextConatiner}>
                        <Text style={styles.simpleTextText}>Starts From</Text>
                    </View>
                    <View style={styles.buttonWrapperContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                navigateHandler(item, 'priceButton')
                            }>
                            <View style={[styles.buttonContainer]}>
                                <Text style={styles.buttonText}>
                                    ₹{item?.discountedPrice}
                                    /Meal
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {!showKnowMore && (
                        <View style={styles.lastTextContainer}>
                            <Text style={styles.lastTextText}>
                                ₹{item?.pricePerMeal}/Meal
                            </Text>
                        </View>
                    )}
                    {showKnowMore && (
                        <TouchableOpacity
                            onPress={() =>
                                navigateHandler(item, 'knowMoreButton')
                            }>
                            <View style={styles.lastTextContainer}>
                                <Text style={styles.knowMoreText}>
                                    Know More
                                </Text>
                                <Image
                                    source={require('../../../assets/images/Subscription/info.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ))
        );
    };

    return (
        <View style={styles.conatiner}>
            {responseDataArr &&
                responseDataArr?.length !== 0 &&
                selectedSubscription && (
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}>
                        {renderItem()}
                    </ScrollView>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        width: dimensions.fullWidth,
        height: dynamicSize(270),
        flexShrink: 0,
    },
    scrollView: {
        height: dynamicSize(270),
        marginHorizontal: dynamicSize(10),
    },
    imageStyle: {
        width: dimensions.fullWidth / 2 - dynamicSize(20),
        height: dynamicSize(120),
        borderRadius: 7,
    },
    imageContainer: {
        width: dimensions.fullWidth / 2 - dynamicSize(20),
        height: dynamicSize(124),
        padding: dynamicSize(2),
    },
    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: dynamicSize(10),
        gap: dynamicSize(8),
    },
    knowMoreText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    },
    shadow: {
        width: dimensions.fullWidth / 2 - dynamicSize(15),
        margin: 10,
        height: dynamicSize(250),
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        elevation: 5, // Apply elevation for shadow
    },
    iconTextText: {
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        color: colors.DARKER_GRAY,
        textAlign: 'justify',
        lineHeight: dynamicSize(20),
        letterSpacing: 0.48,
        textTransform: 'capitalize',
    },
    iconTextIcon: {
        width: dynamicSize(18),
        height: dynamicSize(18),
    },
    simpleTextConatiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: dynamicSize(8),
    },
    simpleTextText: {
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '600',
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        letterSpacing: 0.6,
    },
    buttonWrapperContainer: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 0,
        paddingTop: 10,
    },
    buttonContainer: {
        width: dynamicSize(118),
        height: dynamicSize(30),
        padding: dynamicSize(4),
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(5),
    },
    selectedbuttonContainer: {
        width: dynamicSize(118),
        height: dynamicSize(30),
        padding: dynamicSize(4),
        backgroundColor: colors.GREEN,
        borderRadius: dynamicSize(5),
    },
    buttonText: {
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: dynamicSize(16),
        fontStyle: 'normal',
        fontWeight: '900',
        color: colors.WHITE,
        textAlign: 'center',
        letterSpacing: 0.8,
    },
    lastTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(8),
        gap: dynamicSize(8),
    },
    lastTextText: {
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: colors.DARKER_GRAY,
        letterSpacing: 0.6,
        textDecorationLine: 'line-through',
    },
});

export default CaroselComponent;
