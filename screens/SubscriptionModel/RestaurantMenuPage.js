import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import RestaurantMenuCardDetails from "../../components/Cards/Subscription/RestaurantMenuCardDetails";
import SearchBar from "../../components/Cards/Search/Subscription/SearchBar";
import MultipleButtonFoodType from "../../components/Buttons/Subscription/MultipleButtonFoodType";
import QuickCheckout from "../../components/Cards/Subscription/QuickCheckout";
import HeadingCardComp from "../../components/Cards/Subscription/HeadingCardComp";
import RestaurantMenuModal from "../../components/Modal/Subscription/RestaurantMenuModal";
import LeftSimple from "../../components/Heading/Subscription/LeftSimple";

const RestaurantMenuPage=props=>{   

    const mealCardData= [
        {
            id:'1',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        {
            id:'2',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'NonVeg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },

         {
            id:'3',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'NonVeg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        
    ]


    return(
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
           <RestaurantMenuCardDetails/>
           <SearchBar/>
           <MultipleButtonFoodType/>
           <LeftSimple text={"Best Sellers"}/>
           <QuickCheckout firstActive={true} secondActive={false}/>
        <HeadingCardComp mealCardData={mealCardData}/>
        </View>
        </ScrollView>
        <RestaurantMenuModal/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
    }
})


export default RestaurantMenuPage;