import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const DetailsHeading=props=>{
    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.firstLeft}>
                        <Image source={require('../../../assets/images/Subscription/coin_1.png')}/>
                        <Text style={textStyels.firstText}>Basic</Text>
                    </View>
                    <Text style={textStyels.thirdText}>Froker Subscription Plan</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Image source={require('../../../assets/images/Subscription/discount.png')}/>
                    <View style={styles.secondRight}>
                        <Text style={textStyels.secondText}>Limited Offer</Text>
                        <Text style={textStyels.fourthText}>24:00 Hrs</Text>

                    </View>
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

    },
    container:{
     display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        width:dimensions.fullWidth-40,
        flexDirection:'row',
        marginVertical:10,
    },
    leftContainer:{
        marginLeft:10,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:6,
    },
    firstLeft:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        gap:4
    },
    rightContainer:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
        gap:10,
        marginRight:10,
    }
})

const textStyels=StyleSheet.create({
    firstText:{
        color: '#3D3D3D',
        textAlign: 'justify',
        fontFamily: 'Nunito',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        letterSpacing: 0.6,
        textTransform: 'capitalize',
    },
    secondText:{
        color: '#3D3D3D',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    },
    thirdText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        textTransform: 'capitalize',
        marginLeft:5
    },
    fourthText:{
        color: '#E1740F',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '800',
    textTransform: 'capitalize',
    }   
})

export default DetailsHeading;