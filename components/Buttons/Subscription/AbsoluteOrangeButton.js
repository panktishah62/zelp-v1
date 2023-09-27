import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dynamicSize, normalizeFont } from "../../../utils/responsive";
import { dimensions } from "../../../styles";

const AbsoluteOrangeButton = props => {

    const { text } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )


}

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        bottom:dynamicSize(20),
        right:dynamicSize(28),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:dimensions.fullWidth-dynamicSize(60),
        marginTop:dynamicSize(20),
        height:dynamicSize(48),
        borderRadius:12,
        backgroundColor:'#E1740F',
    },
    text:{
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Rubik',
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    }
})

export default AbsoluteOrangeButton;