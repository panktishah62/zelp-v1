import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
const LeftSimple = props => { 
    const {text}=props   
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:20,
        width:dimensions.fullWidth-dynamicSize(50)
    },
    text:{
        color: '#3D3D3D',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    }
})

export default LeftSimple;