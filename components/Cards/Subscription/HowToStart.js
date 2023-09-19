import React from "react";

import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import { colors } from "../../../styles/colors";


const HowToStart=props=>{
    return(
        <View style={styles.wrapperHowToStart}>
        <View style={styles.howToStartContainer}>
        <Text style={styles.howToStartText}>How to subscribe & Order</Text>
        <Image source={require('../../../assets/images/Subscription/play_button.png')}/>
</View>
</View>
    )
}

const styles = StyleSheet.create({  
    howToStartContainer:{
        display: 'flex',
      width: 254,
    height: 31,
  padding:3,
   margin:20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // For horizontal alignment of children
    flexWrap: 'wrap', // To allow multiple lines (if needed)
    gap: 5,
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E1740F',
    },
    wrapperHowToStart:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    howToStartText:{
        color: colors.ORANGE,
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
       
        textTransform: 'capitalize',
    }
})

export default HowToStart;  