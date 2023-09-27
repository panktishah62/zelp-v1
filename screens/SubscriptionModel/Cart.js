import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import CartDetails from "../../components/Cards/Subscription/CartDetails";
import DeliveryInstruction from "../../components/Cards/Subscription/DeliveryInstruction";
import OrangeButton from "../../components/Buttons/Subscription/OrangeButton";
import LeftSimple from "../../components/Heading/Subscription/LeftSimple";
import SimpleHeading from "../../components/Heading/Subscription/SimpleHeading";
import MealCards from "../../components/Cards/Subscription/MealCards";

const Cart=props=>{


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
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            
            <CartDetails /> 
            <DeliveryInstruction/>
           <SimpleHeading text={"Food in your cart"}/>
           <MealCards data={mealCardData} activeOrangeButton={true} orangeButtonText={"Change"} showCrossButton={true} />
            <OrangeButton text="Place Your Order"/> 
          
        </View>
        </ScrollView>
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

export default Cart