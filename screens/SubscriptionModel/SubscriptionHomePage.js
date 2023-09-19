import React,{useState} from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import LogoHeading from '../../components/Heading/Subscription/LogoHeading';
import SubscriptionDetailsHeading from '../../components/Heading/Subscription/SubscriptionDetailsHeading';
import TextLogo from '../../components/Buttons/Subscription/TextLogo';
import OrderNow from '../../components/Buttons/Subscription/OrderNow';
import SwitchButtons from '../../components/Buttons/Subscription/SwitchButtons';
import QuickCheckout from '../../components/Cards/Subscription/QuickCheckout';
import ManageOrders from '../../components/Carousel/Subscription/ManageOrders';

const SubscriptionHomePage=props=>{
    const [firstActive,setFirstActive]=useState(true);
    const [secondActive,setSecondActive]=useState(false);

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
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <LogoHeading text="Froker Subscription"/>
            <SubscriptionDetailsHeading/>
            <TextLogo/>
            <ManageOrders/>
            <OrderNow/>
            <SwitchButtons firstActive={firstActive} secondActive={secondActive} toggleFirst={toggleFirst} toggleSecond={toggleSecond}/>
            <QuickCheckout firstActive={firstActive} secondActive={secondActive}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff',
        height:dimensions.fullHeight,
    }
})

export default SubscriptionHomePage;