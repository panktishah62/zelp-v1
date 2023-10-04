import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PlanDetailsHeading from "../../components/Heading/Subscription/PlanDetailsHeading";
import PromoCodesAndOffers from "../../components/Cards/Subscription/PromoCodesAndOffers";
import PreferedPayment from "../../components/Cards/Subscription/PreferedPayment";
import OrderSummary from "../../components/Cards/Subscription/OrderSummary";
import BlockImage from "../../components/Block/Subscription/BlockImage";
import { colors } from "../../styles/colors";


const SubscriptionPayment = props => {


  const { navigation, route } = props
  const subscriptionID = route.params.itemId;
  const name = route.params.name

  const handleNavigation = () => {
    navigation.navigate("PaymentSuccessfull");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <PlanDetailsHeading name={name} navigation={navigation} />{/*Modall is here*/}
        <BlockImage />
        <PromoCodesAndOffers promoCode="Meal30" offer="30%" />
        <PreferedPayment />
        <OrderSummary navigation={navigation} subscriptionID={subscriptionID} handleNavigation={handleNavigation} />
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.WHITE
  }
})


export default SubscriptionPayment;