import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";
import { dynamicSize } from "../../../utils/responsive";

const LogoHeading=props=>{
    const {text}=props;
    return(
        <View style={styles.container}>
            <Image style={styles.logoStyle} source={require('../../../assets/images/Subscription/froker_logo.png')}/>
            <Text style={styles.logoText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:20,
        width:dimensions.fullWidth-80,
        gap:10,
        flexDirection:'row'
    },
    logoStyle:{
        width: dynamicSize(39),
        height: 37.206
    },
    logoText:{
        color: '#E1740F',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.25,
    textTransform: 'capitalize',
    }
})

export default LogoHeading;