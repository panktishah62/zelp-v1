import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const LineCircleSurroundedHeading = props => {
    const validity = props.validity;
    console.log(validity)

    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
        <View style={styles.firstContainer}>
            <Image source={require('../../../assets/images/Subscription/line.png')}/>
            <Image source={require('../../../assets/images/Subscription/circle.png')}/>

        </View>
        <View style={styles.secondContainer}><Text style={textStyles.firstText}>Just pay <Text style={textStyles.secondText}>₹455</Text> for Min. 5 meals - {validity} days validity</Text></View>
        <View style={styles.thirdContainer}>
        <Image source={require('../../../assets/images/Subscription/circle.png')}/>
        <Image style={styles.image} source={require('../../../assets/images/Subscription/line.png')}/>
        </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: dimensions.fullWidth,
        flexDirection:'row',
    },
    firstContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    
    },
    secondContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:246.73,
        marginHorizontal:13.96,
    },
    thirdContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    image:{
        transform: [{ rotate: '180deg' }],
    }
})

const textStyles=StyleSheet.create({
    firstText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 16 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.48,
        textAlign: 'center',
    },
    secondText:{
        color: '#E1740F',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.54,
    }
})


export default LineCircleSurroundedHeading;