import React from 'react'
import { StyleSheet,Text,View } from 'react-native'
import { dimensions, fonts } from '../../../styles'





const TextSurroundedByLine = props=>{

    const {text}=props
    return(
        <View style={styles.container}>
        <View style={styles.horizontalLine} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.horizontalLine} />
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginHorizontal: 14,
    },
    horizontalLine: {
      flex: 1, 
      height: 1, 
      backgroundColor: 'black', 
    },
    text: {
        fontFamily: fonts.NUNITO_500_14.fontFamily,
      paddingHorizontal: 10,
        fontSize:  fonts.NUNITO_500_14.fontSize,
        fontWeight: fonts.NUNITO_600_14.fontWeight,
        color: 'black',
    },
  });

export default TextSurroundedByLine