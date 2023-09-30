import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import LogoHeading from '../../components/Heading/Subscription/LogoHeading';
import SubscriptionDetailsHeading from '../../components/Heading/Subscription/SubscriptionDetailsHeading';
import TextLogo from '../../components/Buttons/Subscription/TextLogo';
import OrderNow from '../../components/Buttons/Subscription/OrderNow';
import SwitchButtons from '../../components/Buttons/Subscription/SwitchButtons';
import QuickCheckout from '../../components/Cards/Subscription/QuickCheckout';
import ManageOrders from '../../components/Carousel/Subscription/ManageOrders';
import { useSelector } from 'react-redux';
import AbsoluteOrangeButton from '../../components/Buttons/Subscription/AbsoluteOrangeButton';
import { getBestSellerFoodItems } from '../../redux/services/subscriptionService';

const SubscriptionHomePage=props=>{
    const [firstActive,setFirstActive]=useState(true);
    const [secondActive,setSecondActive]=useState(false);
    const {isSelectedAny}=useSelector(state=>state.subscriptionSelectMenu)

    const {navigation}=props;
    const toggleFirst=()=>{
        if(firstActive){
            return
        }
        setFirstActive(!firstActive);
        setSecondActive(false);
    }
    const toggleSecond=()=>{
        if(secondActive){
            return
        }
        setSecondActive(!secondActive);
        setFirstActive(false);
    }
    const {planID}=useSelector(state=>state.finalSubscriptionPrice)

    const fetcheBestSellerItems=async()=>{
        const currentTime = new Date();
        const currentHour = 5;
        const currentMinutes = 50;
     
        let type;
        
        if ((currentHour === 6 && currentMinutes >= 0 && currentMinutes < 60) ||
            (currentHour === 7 && currentMinutes >= 0 && currentMinutes < 60) ||
            (currentHour === 8 && currentMinutes >= 0 && currentMinutes < 60)) {
          type = "Breakfast";
        } else if ((currentHour === 12 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 13 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 14 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 15 && currentMinutes >= 0 && currentMinutes < 60)) {
          type = "Lunch";
        } else if ((currentHour === 18 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 19 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 20 && currentMinutes >= 0 && currentMinutes < 60) ||
                   (currentHour === 21 && currentMinutes >= 0 && currentMinutes < 60)) {
          type = "Dinner";
        } 
        const response=await getBestSellerFoodItems(planID,type)
        console.log(response.data,"response.data")
    }


    useEffect(() => {
        fetcheBestSellerItems()
    }, []);

    return(
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <LogoHeading text="Froker Subscription"/>
            <SubscriptionDetailsHeading/>
            <TextLogo/>
            <ManageOrders/>
            <OrderNow navigation={navigation}/>
            <SwitchButtons firstActive={firstActive} secondActive={secondActive} toggleFirst={toggleFirst} toggleSecond={toggleSecond}/>
            <QuickCheckout firstActive={firstActive} secondActive={secondActive}/>
        </View>
        </ScrollView>
        {isSelectedAny && <AbsoluteOrangeButton navigation={navigation} text={"Proceed to checkout"}/>}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff',

    }
})

export default SubscriptionHomePage;