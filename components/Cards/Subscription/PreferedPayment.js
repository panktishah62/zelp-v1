import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import TextSurroundedByLine from "./TextSurroundedByLine";
import { dimensions } from "../../../styles";
import { dynamicSize } from "../../../utils/responsive";


const PreferedPayment=props=>{
    return (
        <View>
            <View style={{margin:10}}>
            <TextSurroundedByLine text="Prefered Payment Method"/>
            </View>
            <View style={styles.wrapperContainer}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}><Image source={require('../../../assets/images/Subscription/phoneCard.png')}/></View>
                <Text style={styles.text}>Pay Online using Wallet / card</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:  14,
    },
    imageContainer:{
        position:'absolute',
        left:20,
        top:20

    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
        width:dimensions.fullWidth-dynamicSize(60),
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:5,
        height:75
    },
    text: {
        color: '#606060', // Default color
        fontFamily: 'IBM Plex Sans',
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        marginLeft:dynamicSize(10)
      },
})

export default PreferedPayment;