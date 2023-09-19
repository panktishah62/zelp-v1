import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import { colors } from "../../styles/colors";


const AddOnMeals=props=>{
    return(
        <LinearGradient
        colors={['rgba(255, 255, 255, 0.80)', 'rgba(255, 255, 255, 0.25)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
            
    
           <View style={styles.textSection}>
                <Text style={styles.firstText}>ADD ON MEALS</Text>
                <Text style={styles.secondText}>(Every 1 extra meal - 1 day extra validity)</Text>
           </View>
           <View style={styles.iconSection}>
            <Image source={require('../../../assets/images/Subscription/rightArrow.png')}/>
           </View>
        
 
        </View>
        </LinearGradient>
    )
}

const styles=StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        overflow: 'hidden', // Clip the shadow if it overflows
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
        height: 76.25,
    },
    textSection:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
       gap:6,
     padding:10,

    },
    firstText:{
        color: '#E1740F',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 18 * 1.408, // Calculated line height for 140.8%
    letterSpacing: 0.54,
    },
    secondText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: 0.42,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3, // This is for Android shadow
      },
      gradient: {
        borderRadius: 5,
   
       marginVertical:10,
       marginHorizontal:16,
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 10, // Adjust this as needed
        height: 76.25,
       
      },

})

export default AddOnMeals;