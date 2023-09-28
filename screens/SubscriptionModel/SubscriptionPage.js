import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import { getSubscriptionModelData } from '../../redux/services/subscriptionModelService';
import MenuListing from '../../components/SubscriptionModel/MenuListing';
import SubscriptionModel from '../../components/SubscriptionModel/SubscriptionModel';
import IconButton from '../../components/Buttons/IconButton';
import { colors } from '../../styles/colors';
import { DialogTypes } from '../../utils';
import { dynamicSize } from '../../utils/responsive';

import { showDialog } from '../../redux/actions/dialog';
import { useDispatch } from 'react-redux';

import SubscriptionCard from '../../components/Cards/Subscription/SubscriptionCard';
import HeadingComp from '../../components/Cards/Subscription/HeadingComp';
import ParagraphComp from '../../components/Cards/Subscription/ParagraphComp';
import BenifitComponent from '../../components/Cards/Subscription/BenifitComponent';
import CaroselComponent from '../../components/Cards/Subscription/CaroselComponent';
import PartnersComponent from '../../components/Cards/Subscription/PartnersComponent';
import MealComponent from '../../components/Cards/Subscription/MealComponent';
import StarHeadingComponent from '../../components/Cards/Subscription/StarHeadinComponent';
import BenifitHeadingComp from '../../components/Cards/Subscription/BenifitHeadingComp';
import CarouselImageAtTop from '../../components/Cards/Subscription/CarouselImageAtTop';
import PageDetails from './PageDetails';
import { getBannerImages } from '../../redux/services/subscriptionService';
import SubscriptionPayment from './SubscriptionPayment';
import PaymentSuccessfull from './PaymentSuccessfull';
import SubscriptionHomePage from './SubscriptionHomePage';
import RestaurantMenuPage from './RestaurantMenuPage';
import Cart from './Cart';
import Home from './Home';

const benifitComponentData = [
    {
        image: require('../../assets/images/Subscription/salad_3.png'),
        text: "Choose your Preferred Meal",
    },
    {
        image: require('../../assets/images/Subscription/clock.png'),
        text: "Wide Variety of options",
    },
    {
        image: require('../../assets/images/Subscription/plate.png'),
        text: "Delivery at your Door Step",
    },
    {
        image: require('../../assets/images/Subscription/delivery_2.png'),
        text: "No Additional costs",
    },
]




const SubscriptionPage = props => {
    const {navigation} = props
    

    const [bannerImagesArr, setBannerImagesArr] = useState([]);

    useEffect(() => {
        fetchBannerImages();
    }, [setBannerImagesArr])

    const fetchBannerImages = async () => {
        const response = await getBannerImages();
        console.log("banner images", response?.data);
        setBannerImagesArr(response?.data?.data);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                <StarHeadingComponent />
                <CaroselComponent navigation={navigation}/>
                <ParagraphComp />
                <BenifitHeadingComp />
                <BenifitComponent data={benifitComponentData} />
                <PartnersComponent />
                <MealComponent />
            </View>
        </ScrollView>



    )
        ;
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
