import React from "react";
import { View,Text } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

const HeadingComp= props=>{
    const {text,color,containerStyle}=props
    return(
        
           <View style={[styles.container,containerStyle]}>
                  <Text style={[styles.text,{color:color}]}>{text} </Text>
           </View>
        
    )
}
const styles=StyleSheet.create({
    container:{
      
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    text:{
        fontFamily: 'Nunito',    
        fontSize: 16,             
        fontStyle: 'normal',    
        fontWeight: '800',      
        lineHeight: 21.6,        
        letterSpacing: 0.48,     
        textTransform: 'capitalize', 
            
        textAlign: 'center', 
    }
})

export default HeadingComp