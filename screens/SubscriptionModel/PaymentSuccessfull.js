import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import PaymentSuccessfullCard from '../../components/Cards/Subscription/PaymentSuccessfullCard';

const PaymentSuccessfull=props=>{
    return(
        <ScrollView >
        <View style={styles.container}>
            
           <PaymentSuccessfullCard/>
           
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E1740F',
        height:dimensions.fullHeight,
    }
})

export default PaymentSuccessfull;

