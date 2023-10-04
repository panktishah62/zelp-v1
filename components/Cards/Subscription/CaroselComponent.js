import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { getSubscriptionPlanDetails } from '../../../redux/services/subscriptionService';
import { useSelector } from 'react-redux';
import { dynamicSize } from '../../../utils/responsive';

const CaroselComponent = props => {
    const { planID } = useSelector(state => state.finalSubscriptionPrice);

    const { navigation, showKnowMore } = props;
    const navigateHandler = (id, string) => {
        if (string === 'priceButton' && !showKnowMore) {
            navigation.navigate('PlanDetails', { itemId: id });
        }
        if (string === 'knowMoreButton' && showKnowMore) {
            navigation.navigate('PlanDetails', { itemId: id });
        } else {
            return;
        }
    };

    const [responseDataArr, setResponseDataArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, [setResponseDataArr]);

    const fetchData = async () => {
        const response = await getSubscriptionPlanDetails();

        setResponseDataArr(response?.data?.data);
    };

    //static data for testing
    // const data = [
    //     {
    //         id: '1',
    //         caroselImage:require('../../../assets/images/Subscription/food_item_1.png'),
    //         iconImage:require('../../../assets/images/Subscription/coin_1.png'),
    //         iconText:'Basic',
    //         simpleText:'Starts From',
    //         buttonText:'₹89/Meal',
    //         lastText:'₹99/Meal',
    //     },
    //     {
    //         id: '2',
    //         caroselImage:require('../../../assets/images/Subscription/food_item_2.png'),
    //         iconImage:require('../../../assets/images/Subscription/diamond_1.png'),
    //         iconText:'Standard',
    //         simpleText:'Starts From',
    //         buttonText:'₹119/Meal',
    //         lastText:'₹175/Meal',
    //     },
    //     {
    //         id: '3',
    //         caroselImage:require('../../../assets/images/Subscription/food_item_1.png'),
    //         iconImage:require('../../../assets/images/Subscription/coin_1.png'),
    //         iconText:'Basic',
    //         simpleText:'Starts From',
    //         buttonText:'₹89/Meal',
    //         lastText:'₹99/Meal',
    //     },
    //     {
    //         id: '4',
    //         caroselImage:require('../../../assets/images/Subscription/food_item_2.png'),
    //         iconImage:require('../../../assets/images/Subscription/diamond_1.png'),
    //         iconText:'Standard',
    //         simpleText:'Starts From',
    //         buttonText:'₹119/Meal',
    //         lastText:'₹175/Meal',
    //     },

    //   ];

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
                        <Image source={item.iconImage} />
                    </View>
                    <View style={styles.simpleTextConatiner}>
                        <Text style={styles.simpleTextText}>Starts From</Text>
                    </View>
                    <View style={styles.buttonWrapperContainer}>
                        {planID === '' || planID !== item?._id ? (
                            <TouchableOpacity
                                onPress={() =>
                                    navigateHandler(item?._id, 'priceButton')
                                }>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>
                                        ₹
                                        {item?.pricePerMeal *
                                            (1 - item?.appliedDiscount / 100)}
                                        /Meal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    navigateHandler(item?._id, 'priceButton')
                                }>
                                <View style={styles.selectedbuttonContainer}>
                                    <Text style={styles.buttonText}>
                                        Selected
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
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
                                navigateHandler(item?._id, 'knowMoreButton')
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
            {responseDataArr && responseDataArr?.length !== 0 && (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {renderItem()}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        width: dimensions.fullWidth,
        height: 270.433,
        flexShrink: 0,
    },
    imageStyle: {
        width: dimensions.fullWidth / 2 - dynamicSize(20),
        height: 120.848,
        borderRadius: 7,
    },
    imageContainer: {
        width: dimensions.fullWidth / 2 - dynamicSize(20),
        height: 123.848,
        padding: dynamicSize(2),
    },
    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        gap: 8,
    },
    knowMoreText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    },
    shadow: {
        width: dimensions.fullWidth / 2 - dynamicSize(15),
        margin: 10,
        height: 250.433,
        backgroundColor:colors.WHITE,
        borderRadius: 5,
        elevation: 5, // Apply elevation for shadow
    },
    iconTextText: {
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        color: colors.DARKER_GRAY,
        textAlign: 'justify',
        lineHeight: 20,
        letterSpacing: 0.48,
        textTransform: 'capitalize',
    },
    iconTextIcon: {
        width: 18,
        height: 18,
    },
    simpleTextConatiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    simpleTextText: {
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 12,
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
        width: 118.937,
        height: 29.77,
        padding: 4,
        backgroundColor: colors.ORANGE,
        borderRadius: 5,
    },
    selectedbuttonContainer: {
        width: 118.937,
        height: 29.77,
        padding: 4,
        backgroundColor: colors.GREEN,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 16,
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
        marginTop: 8,
        gap: 8,
    },
    lastTextText: {
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color:colors.DARKER_GRAY,
        letterSpacing: 0.6,
        textDecorationLine: 'line-through',
    },
});

export default CaroselComponent;
