import React from 'react';
import { StyleSheet, View,  ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import PaymentSuccessfullCard from '../../components/Cards/Subscription/PaymentSuccessfullCard';

const PaymentSuccessfull=props=>{
    const {navigation} = props
    return(
        <ScrollView >
        <View style={styles.container}>
            
           <PaymentSuccessfullCard navigation={navigation}/>
           
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

