import React,{useEffect,useState} from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import CartDetails from "../../components/Cards/Subscription/CartDetails";
import DeliveryInstruction from "../../components/Cards/Subscription/DeliveryInstruction";
import OrangeButton from "../../components/Buttons/Subscription/OrangeButton";
import LeftSimple from "../../components/Heading/Subscription/LeftSimple";
import SimpleHeading from "../../components/Heading/Subscription/SimpleHeading";
import MealCards from "../../components/Cards/Subscription/MealCards";
import { useSelector } from "react-redux";
import { getOneSubscriptionOrder } from "../../redux/services/subscriptionService";

const Cart=props=>{
    const {navigation,route}=props
    const {itemName,itemId,itemImage,itemType}=useSelector(state=>state.subscriptionCart);
    console.log(itemName,itemId,itemType,itemImage)
    const mealCardData= [
        {
            id:itemId,
            image:itemImage,
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:itemType,
            boldText:itemName,
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },   
    ]
    const [isReorder,setIsReorder]=useState(false)  
    const [orderData,setOrderData]=useState([])
    let subscriptionId;
    if(route.params.subscriptionId){
     subscriptionId=route.params.subscriptionId
}

    // console.log(subscriptionId,"subscriptionId")

    const fetchOneOrder=async()=>{
        const response =await getOneSubscriptionOrder(subscriptionId)
        console.log(response.data,"response.data")
        setIsReorder(true)
      const data=
        {
            id:response.data.data.foodItem._id,
            image:response.data.data.foodItem.image,
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:response.data.data.foodItem.isVeg?'Veg':'NonVeg',
            boldText:response.data.data.foodItem.name,
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        }
      orderData.push(data)
      setOrderData(orderData)
    }
    console.log(orderData,"orderData")
    if(route){
    useEffect(()=>{
        fetchOneOrder()
    },[subscriptionId])
}

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            
            <CartDetails /> 
            <DeliveryInstruction/>
           <SimpleHeading text={"Food in your cart"}/>
          {isReorder && <MealCards isDynamic={true} data={orderData} activeOrangeButton={true} orangeButtonText={"Change"} showCrossButton={true} />}
          {!isReorder && <MealCards isDynamic={true} data={mealCardData} activeOrangeButton={true} orangeButtonText={"Change"} showCrossButton={true} />}
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