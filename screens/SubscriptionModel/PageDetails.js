import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { colors } from "../../styles/colors";
import MealCards from "../../components/Cards/Subscription/MealCards";
import CarouselImageAtTop from "../../components/Cards/Subscription/CarouselImageAtTop";
import AddOnMeals from "../../components/Cards/Subscription/AddOnMeal";
import HowToStart from "../../components/Cards/Subscription/HowToStart";
import BestMealHeadingWithStars from "../../components/Cards/Subscription/BestMealHeadingWithStars";
import BenifitComponent from "../../components/Cards/Subscription/BenifitComponent";
import BenifitHeadingComp from "../../components/Cards/Subscription/BenifitHeadingComp";
import AddOnMealModal from "../../components/Modal/Subscription/AddOnMealModal";
import SubscriptionPlanImage from "../../components/Block/Subscription/SubscriptionPlanImage";
import DetailsHeading from "../../components/Heading/Subscription/DetailsHeading";
import DescriptionOffer from "../../components/Cards/Subscription/DescriptionOffer";
import LineCircleSurroundedHeading from "../../components/Heading/Subscription/LineCircleSurroundedHeading";
import SubscribeNowAddMeal from "../../components/Buttons/Subscription/SubscribeNowAddMeal";
import { getCombos, getOneSubscriptionPlanDetails } from "../../redux/services/subscriptionService";
import { useSelector } from "react-redux";

const carouSelBannerImageData = [
    {
        id: '1',
        caroselImage: require('../../assets/images/Subscription/carousel_1.png'),
    },
    {
        id: '2',
        caroselImage: require('../../assets/images/Subscription/carousel_1.png'),

    },
    {
        id: '3',
        caroselImage: require('../../assets/images/Subscription/carousel_1.png'),

    },
    {
        id: '4',
        caroselImage: require('../../assets/images/Subscription/carousel_1.png'),
    },

];

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




const mealCardData = [
    {
        id: '1',
        image: require('../../assets/images/Subscription/golgappa.png'),
        vegImage: require('../../assets/images/Subscription/veg.png'),
        vegText: 'Veg',
        boldText: 'Golgappa 1 plate',
        lastText: 'Made with cauliflower',
        starImage: require('../../assets/images/Subscription/golden_star.png'),
        rating: '4.0',
    },
    {
        id: '2',
        image: require('../../assets/images/Subscription/golgappa.png'),
        vegImage: require('../../assets/images/Subscription/veg.png'),
        vegText: 'NonVeg',
        boldText: 'Golgappa 1 plate',
        lastText: 'Made with cauliflower',
        starImage: require('../../assets/images/Subscription/golden_star.png'),
        rating: '4.0',
    },

    {
        id: '3',
        image: require('../../assets/images/Subscription/golgappa.png'),
        vegImage: require('../../assets/images/Subscription/veg.png'),
        vegText: 'NonVeg',
        boldText: 'Golgappa 1 plate',
        lastText: 'Made with cauliflower',
        starImage: require('../../assets/images/Subscription/golden_star.png'),
        rating: '4.0',
    },

]


const PageDetails = props => {

    const { navigation, route } = props
    const { itemId } = route.params
    console.log(itemId)

    const { mealType } = useSelector(state => state.mealTypeForSubscription)

    const { mealCount } = useSelector((state) => state.mealDetails)
    useEffect(() => {
        console.log("meal count at first",mealCount);
    }, [])

    const [fetchedData, setFetchedData] = useState(null);
    const [bannerImagesArr, setBannerImagesArr] = useState([]);
    const [combosArray, setCombosArray] = useState([]);
    const [benifitComponentArray, setBenifitComponentArray] = useState([]);
    const fetchPlanDetails = async () => {
        const response = await getOneSubscriptionPlanDetails(itemId);

        setFetchedData(response.data.data)
        setBannerImagesArr(response.data.bannerImage)
        setBenifitComponentArray(response.data.benifitComponent)
    }



    const fetchCombos = async () => {
        const response = await getCombos(itemId, mealType);
        console.log(response?.data?.data)
        setCombosArray(response?.data?.data)
    }
    useEffect(() => {
        fetchCombos()
    }, [setCombosArray, mealType])

    console.log(combosArray)

    useEffect(() => {
        fetchPlanDetails()
    }, [itemId, setBannerImagesArr])



    const navigationHandler = (id) => {
        
        navigation.navigate('SubscriptionPayment',{itemId,name:fetchedData?.name})
    }


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <SubscriptionPlanImage image={fetchedData?.image} />
                    <DetailsHeading name={fetchedData?.name} />
                    <DescriptionOffer discount={fetchedData?.appliedDiscount} price={fetchedData?.pricePerMeal} itemId={itemId} />
                    <LineCircleSurroundedHeading discount={fetchedData?.appliedDiscount} price={fetchedData?.pricePerMeal} validity={fetchedData?.validityPerMeal} />

                    <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                    <BenifitHeadingComp />
                    <BenifitComponent data={benifitComponentData} hi={true} />
                    <AddOnMeals />

                    <HowToStart />
                    <BestMealHeadingWithStars />

                    <View style={styles.mealCard}><MealCards isDynamic={true} isRatingTextVisible={true} isHeadingVisible={true} isButtonVisible={true} showRatingNumber={true} data={combosArray} showInfoText={true}
                    /></View>


                </View>
            </ScrollView>
            <AddOnMealModal name={fetchedData?.name} navigationHandler={navigationHandler} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F8',

    },
    mealCard: {
        marginBottom: 100,
    }

})

export default PageDetails;