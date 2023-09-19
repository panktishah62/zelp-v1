import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const SubscriptionDetailsHeading = props => {
    return(
        <View style={styles.container}>
            <View style={styles.headingSection}>
                <Text style={styles.offerMeal}>₹450 - 5 Meals <Text style={styles.planText}> Plan</Text></Text>
            <Text style={styles.validityText}>10 Days Validity</Text></View>
            <View style={styles.buttonContainer}>
                <Image source={require('../../../assets/images/Subscription/bronze_medal.png')}/>
                <Text style={styles.buttonText}>Bronze</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        width:dimensions.fullWidth-90,
    },
    headingSection:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',
        gap:4,
        marginTop:20,
      
    },
    offerMeal:{
        color: '#E1740F',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    planText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    validityText:{
        color: '#8C8A9D',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    buttonText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'justify',
        letterSpacing: 0.48,
        textTransform: 'capitalize',
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        gap:5,
        alignItems:'center',
        flexDirection:'row',
        width:105,
        height:36,
        borderColor:'#E1740F',
        borderRadius:30,
        borderWidth:1,
        marginTop:10,
    }
})

export default SubscriptionDetailsHeading;