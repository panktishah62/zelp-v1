import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const DescriptionOffer = props => {
    const discount =  props.discount ;
    const price = props.price || 100
    const afterPrice = price * (1- discount /100);
    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
            <View style={styles.topContainer}><Text style={textStyles.firstText}>{discount}% off on Froker Meals</Text></View>
            <View style={styles.bottomContainer}>
                <Text style={[discount!=0 ? textStyles.withDiscout:textStyles.withOutDiscout]}>₹{price}/Meal</Text>
                {discount!=0 && <Text style={textStyles.fourthText}><Text style={textStyles.thirdText}>₹{afterPrice}</Text>/ 1 Meal</Text>}
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
        justifyContent:'flex-start',
        alignItems:'flex-start',
        width:dimensions.fullWidth-40,
        gap : 6,
        borderWidth:1,
        borderRadius:10,
    },
    topContainer:{
        marginLeft:20,
        marginTop:10,
    },
    bottomContainer:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        gap:16.24,
        marginLeft:20,
        marginBottom:10,

    }
})

const textStyles=StyleSheet.create({
    firstText:{
        color: '#E1740F',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.7,
    },
    withDiscout:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        textDecorationLine: 'line-through',
        letterSpacing: 0.9,
    },
    withOutDiscout:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.9,
    },

    thirdText:{
        color: '#E1740F',
        fontFamily: 'Nunito',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '900',
        letterSpacing: 1.3,
    },
    fourthText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.8,
    }
})

export default DescriptionOffer;