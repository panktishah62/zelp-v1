import React,{useState} from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { dimensions } from "../../../styles";
import { Touchable } from "react-native";
import { styles } from "../FollowUnfollow";

const SwitchButtons = props => {
    const {firstActive,secondActive,toggleFirst,toggleSecond}=props;


    return(
        <View style={buttonStyles.container}>
           <TouchableOpacity onPress={toggleFirst}>
           <View style={[buttonStyles.firstContainer,firstActive&&buttonStyles.belowBorder]}>
            <Image source={require('../../../assets/images/Subscription/salad_4.png')}/>
            <Text style={buttonStyles.text}>Quick Checkout</Text>
           </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={toggleSecond}>
           <View style={[buttonStyles.firstContainer,secondActive&&buttonStyles.belowBorder]}>
           <Image source={require('../../../assets/images/Subscription/checkout.png')}/>
            <Text style={buttonStyles.text}>Order History</Text>
           </View>
           </TouchableOpacity>
           
        </View>
    )
}

const buttonStyles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width:dimensions.fullWidth-60,
    },
    firstContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:5,
        paddingHorizontal:15,
        paddingVertical:10,
    },
    belowBorder:{
        borderBottomColor:'#E1740F',
        borderBottomWidth:2,
    },
    text:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    }
});

export default SwitchButtons;