import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import RestaurantMenuCardDetails from "../../components/Cards/Subscription/RestaurantMenuCardDetails";
import SearchBar from "../../components/Cards/Search/Subscription/SearchBar";
import MultipleButtonFoodType from "../../components/Buttons/Subscription/MultipleButtonFoodType";
import BestSellerHeading from "../../components/Heading/Subscription/BestSellerHeading";
import QuickCheckout from "../../components/Cards/Subscription/QuickCheckout";
import HeadingCardComp from "../../components/Cards/Subscription/HeadingCardComp";
import RestaurantMenuModal from "../../components/Modal/Subscription/RestaurantMenuModal";

const RestaurantMenuPage=props=>{   
    return(
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
           <RestaurantMenuCardDetails/>
           <SearchBar/>
           <MultipleButtonFoodType/>
           <BestSellerHeading/>
           <QuickCheckout firstActive={true} secondActive={false}/>
        <HeadingCardComp/>
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