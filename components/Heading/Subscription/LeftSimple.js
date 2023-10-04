import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
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
        color: colors.DARKER_GRAY,
    fontFamily: fonts.POPPINS_500_11.fontFamily,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    }
})

export default LeftSimple;