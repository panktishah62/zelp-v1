
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import TextSurroundedByLine from "./TextSurroundedByLine";
import { dimensions } from "../../../styles";
import { getPartnerRestaurants } from "../../../redux/services/subscriptionService";








const PartnersComponent = props => {

    const data = [
        {
            id: '1',
            imageSource: require('../../../assets/images/Subscription/up_wala_logo.png'),
            text: 'Up wala'
        },
        {
            id: '2',
            imageSource: require('../../../assets/images/Subscription/kfc_logo.png'),
            text: 'KFC'
        },
        {
            id: '3',
            imageSource: require('../../../assets/images/Subscription/domino\'s_logo.png'),
            text: 'Domino\'s Pizza'
        },
        {
            id: '4',
            imageSource: require('../../../assets/images/Subscription/empire_restaurant_logo.png'),
            text: 'Empire Restaurant'
        },
        {
            id: '5',
            imageSource: require('../../../assets/images/Subscription/kfc_logo.png'),
            text: 'KFC'
        }


        // Add more items as needed
    ];

    const [partnerRestaurants, setPartnerRestaurantsArr] = useState([]);

    useEffect(() => {
        fetchData();
    }
        , [setPartnerRestaurantsArr])

    const fetchData = async () => {
        const response = await getPartnerRestaurants();
        setPartnerRestaurantsArr(response?.data?.data);
    }

    const renderItems = () => {


        return partnerRestaurants && partnerRestaurants.map((item) => (
            <View key={item.id} style={styles.item}>
                <View style={styles.imageText}>
                    <Image style={styles.imageTextImage} source={{
                        uri: item.restaurantImage,
                    }} />
                    <Text style={styles.imageTextText}>{item.restaurantName}</Text>
                </View>
            </View>
        ));
    };


    return (
        <View style={{ marginHorizontal: 4 }}>
            <TextSurroundedByLine text="Partner Restaurants" />
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
                {renderItems()}
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    item: {
        display: 'flex',
        width: dimensions.fullWidth / 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },

    imageText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageTextImage: {
        width: 80,
        height: 80,
        flexShrink: 0,
        borderRadius: 50,
    },   
    imageTextText: {
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Nunito',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    }
})


export default PartnersComponent