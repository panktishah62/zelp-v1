import React,{useState} from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
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

const carouSelBannerImageData=[
        {
            id: '1',
            caroselImage:require('../../assets/images/Subscription/carousel_1.png'),
        },
        {
            id: '2',
            caroselImage:require('../../assets/images/Subscription/carousel_1.png'),
            
        },
        {
            id: '3',
            caroselImage:require('../../assets/images/Subscription/carousel_1.png'),
    
        },
        {
            id: '4',
            caroselImage:require('../../assets/images/Subscription/carousel_1.png'),
        },
       
      ];

const benifitComponentData=[
        {
            image:require('../../assets/images/Subscription/salad_3.png'),
            text:"Choose your Preferred Meal",
        },
        {
            image:require('../../assets/images/Subscription/clock.png'),
            text:"Wide Variety of options",
        },
        {
            image:require('../../assets/images/Subscription/plate.png'),
            text:"Delivery at your Door Step",
        },
        {
            image:require('../../assets/images/Subscription/delivery_2.png'),
            text:"No Additional costs",
        },
    ]
    

const PageDetails=props=>{
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    return(
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <SubscriptionPlanImage/>
        <DetailsHeading/>
        <DescriptionOffer/>
        <LineCircleSurroundedHeading/>
            <CarouselImageAtTop isStatic={true} bannerImagesArr={carouSelBannerImageData}/>
            <BenifitHeadingComp/>
            <BenifitComponent data={benifitComponentData}/>
            <AddOnMeals/>

            <HowToStart/>
            <BestMealHeadingWithStars/>
           
           <MealCards isRatingTextVisible={true} isHeadingVisible={true} isButtonVisible={true} 
           showRatingNumber={true} showInfoText={true}
           />
          
          
        </View>
        </ScrollView>
        <AddOnMealModal/>
         </View>

    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F8',

    },

})  

export default PageDetails;
