import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from 'react-native-new-snap-carousel';
import { dimensions, fonts, Styles } from "../../../styles";
import { colors } from "../../../styles/colors";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { getSubscriptionPlanDetails } from "../../../redux/services/subscriptionService";
import { useSelector } from "react-redux";



const CaroselComponent = props => {

    const { planID } = useSelector((state) => state.finalSubscriptionPrice);

    const { navigation, showKnowMore } = props
    const navigateHandler = (id, string) => {
        if (string === "priceButton" && !showKnowMore) {
            navigation.navigate('PlanDetails', { itemId: id })
        }
        if (string === "knowMoreButton" && showKnowMore) {
            navigation.navigate('PlanDetails', { itemId: id })
        }
        else {
            return
        }
    }


    const [responseDataArr, setResponseDataArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, [setResponseDataArr])


    const fetchData = async () => {
        const response = await getSubscriptionPlanDetails();

        setResponseDataArr(response?.data?.data);
    }

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
        return responseDataArr && responseDataArr?.map((item, index) => (
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.80)', 'rgba(255, 255, 255, 0.25)']}
                style={styles.gradient}
                key={index}
            >
                <View style={[styles.conatiner, styles.shadow]} key={index} >

                    <View style={styles.imageContainer}>
                        {(item.image) && <Image style={styles.imageStyle} source={
                            { uri: item.image }
                        } />}
                        {!(item.image) && <Image style={styles.imageStyle} source={require('../../../assets/images/Subscription/food_item_1.png')} />}
                    </View>
                    <View style={styles.iconTextContainer}>
                        <Text style={styles.iconTextText}>{item.name}</Text>
                        <Image source={item.iconImage} />
                    </View>
                    <View style={styles.simpleTextConatiner}>
                        <Text style={styles.simpleTextText}>Starts From</Text>
                    </View>
                    <View style={styles.buttonWrapperContainer}>
                        {planID === '' || planID !== item?._id ? <TouchableOpacity onPress={() => navigateHandler(item?._id, "priceButton")}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>₹{item?.pricePerMeal * (1 - item?.appliedDiscount / 100)}/Meal</Text>
                            </View>
                        </TouchableOpacity> : <TouchableOpacity onPress={() => navigateHandler(item?._id, "priceButton")}><View style={styles.selectedbuttonContainer}>
                            <Text style={styles.buttonText}>Selected</Text>
                        </View></TouchableOpacity>}
                    </View>
                    {!showKnowMore && <View style={styles.lastTextContainer}>
                        <Text style={styles.lastTextText}>₹{item?.pricePerMeal}/Meal</Text>
                    </View>}
                    {
                        showKnowMore &&
                        <TouchableOpacity onPress={() => navigateHandler(item?._id, "knowMoreButton")}>
                            <View style={styles.lastTextContainer}>
                                <Text style={styles.knowMoreText}>Know More</Text>
                                <Image source={require('../../../assets/images/Subscription/info.png')} />
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </LinearGradient>
        )
        );
    };



    return (
        <View style={styles.conatiner} >
            {responseDataArr && (responseDataArr?.length !== 0) && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {renderItem()}
            </ScrollView>}

        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        width: dimensions.fullWidth,
        height: 270.433,
        flexShrink: 0,


    },
    imageStyle: {
        width: dimensions.fullWidth / 2 - 20,
        height: 120.848,
        borderRadius: 7,
    },
    imageContainer: {
        width: dimensions.fullWidth / 2 - 20,
        height: 123.848,

    },
    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    knowMoreText: {
        color: '#3D3D3D',
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    },
    shadow: {

        width: dimensions.fullWidth / 2 - 20,
        margin: 10,
        height: 250.433,
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 5, // Apply elevation for shadow

    },
    iconTextText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#3D3D3D',
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
        fontFamily: 'Nunito',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#3D3D3D',
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
        borderRadius: 5
    },
    selectedbuttonContainer: {
        width: 118.937,
        height: 29.77,
        padding: 4,
        backgroundColor: colors.GREEN,
        borderRadius: 5
    },
    buttonText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '900',
        color: '#FFF',
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

        fontFamily: 'Nunito',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#3D3D3D',
        letterSpacing: 0.6,
        textDecorationLine: 'line-through',
    }
})


export default CaroselComponent