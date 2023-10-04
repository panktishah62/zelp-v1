import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dynamicSize, normalizeFont } from "../../../utils/responsive";
import { dimensions, fonts } from "../../../styles";
import { colors } from "../../../styles/colors";

const SimpleHeading = props=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:20,
        width:dimensions.fullWidth-dynamicSize(50)
    },
    text:{
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 20, // 125%
    }
})

export default SimpleHeading
