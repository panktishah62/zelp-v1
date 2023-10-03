import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ParagraphComp from '../../components/Cards/Subscription/ParagraphComp';
import BenifitComponent from '../../components/Cards/Subscription/BenifitComponent';
import PartnersComponent from '../../components/Cards/Subscription/PartnersComponent';
import MealComponent from '../../components/Cards/Subscription/MealComponent';
import StarHeadingComponent from '../../components/Cards/Subscription/StarHeadinComponent';
import BenifitHeadingComp from '../../components/Cards/Subscription/BenifitHeadingComp';
import CarouselImageAtTop from '../../components/Cards/Subscription/CarouselImageAtTop';
import { getBannerImages } from '../../redux/services/subscriptionService';

const benifitComponentData = [
    {
        image: require('../../assets/images/Subscription/salad_3.png'),
        text: 'Choose your Preferred Meal',
    },
    {
        image: require('../../assets/images/Subscription/clock.png'),
        text: 'Wide Variety of options',
    },
    {
        image: require('../../assets/images/Subscription/plate.png'),
        text: 'Delivery at your Door Step',
    },
    {
        image: require('../../assets/images/Subscription/delivery_2.png'),
        text: 'No Additional costs',
    },
];

const SubscriptionPage = props => {
    const { navigation } = props;

    const [bannerImagesArr, setBannerImagesArr] = useState([]);
    const [benifitItemArr,setBenifitItemArr] = useState([]);
    const [bestMealArr,setBestMealArr] = useState([])
    const [minValidity,setMinValidity] = useState(null)
 
    useEffect(() => {
        fetchBannerImages();
    }, [setBannerImagesArr]);

    const fetchBannerImages = async () => {
        const response = await getBannerImages();
        setBannerImagesArr(response?.data?.data);
        setBenifitItemArr(response?.data.benifitComponent)
        setBestMealArr(response?.data.bestMealArray)
        setMinValidity(response?.data.minValidity)

    };

    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                <StarHeadingComponent navigation={navigation} />
                <ParagraphComp minValidity={minValidity}/>
                <BenifitHeadingComp />
                <BenifitComponent data={benifitItemArr} isDynamic={true}/>
                <PartnersComponent />
                <MealComponent bestMealArr={bestMealArr}/>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.WHITE,
    },
    // buttonContainer: {
    //     backgroundColor: colors.WHITE,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingVertical: dynamicSize(25),
    // },
    // headerText: {
    //     ...fonts.NUNITO_500_16,
    //     textAlign: 'center',
    //     color: colors.GREY_MEDIUM,
    // },
    // whatsappContainer: {
    //     marginBottom: dynamicSize(10),
    // },
});

export default SubscriptionPage;
