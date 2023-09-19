import React from "react";
import { StyleSheet, View, Text, Image, ScrollView,TouchableOpacity } from "react-native";
import { dimensions } from "../../../styles";
import { Touchable } from "react-native";

const TextLogo=props=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Froker Subscription Active</Text>
                <Image style={styles.imageStyle} source={require('../../../assets/images/Subscription/check.png')}/>
               
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:dimensions.fullWidth-7,
        marginTop:10
    },
    buttonContainer:{
        display: 'flex',
    flexDirection: 'row',
    width: 312,
    height: 40,
    padding: 10.094,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    backgroundColor:'#E1740F',
    borderRadius:20.189
    },
    imageStyle:{
        width: 16,
        height: 16,
    },
    buttonText:{
        color: '#FFF',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 22.208, 
        letterSpacing: 0.59,
    }
})

export default TextLogo;