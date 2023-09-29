import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import PlanDetailsHeading from "../../components/Heading/Subscription/PlanDetailsHeading";
import PromoCodesAndOffers from "../../components/Cards/Subscription/PromoCodesAndOffers";
import PreferedPayment from "../../components/Cards/Subscription/PreferedPayment";
import OrderSummary from "../../components/Cards/Subscription/OrderSummary";
import BlockImage from "../../components/Block/Subscription/BlockImage";


const SubscriptionPayment=props=>{

  const {navigation} = props
  const handleNavigation =() =>{
    navigation.navigate("PaymentSuccessfull");
  }

  return(
    <View style={styles.container}>
      <ScrollView>
        <PlanDetailsHeading navigation={navigation}/>{/*Modall is here*/}
        <BlockImage/>
        <PromoCodesAndOffers promoCode="Meal30" offer="30%"/>
        <PreferedPayment/>
        <OrderSummary handleNavigation={handleNavigation}/>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F3F4F8'
    }
})


export default SubscriptionPayment;