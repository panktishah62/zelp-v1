import React from "react";
import { StyleSheet, View,Text,Image, ScrollView,TouchableOpacity } from "react-native";
import { dimensions } from "../../../styles";

const SubscribeNowAddMeal=props=>{

  const {navigationHandler} = props

    const {isModalVisible,toggleModal}=props;
    return(
        <View style={buttonStyles.wrapperContainer}>
    {/* <View style={buttonStyles.container}> */}
    <TouchableOpacity onPress={navigationHandler}>
    <View style={buttonStyles.orangeButton}><Text style={buttonStyles.orangeButtonText}>Subscribe Now</Text></View>
    </TouchableOpacity>
     <TouchableOpacity onPress={toggleModal}>
     <View style={buttonStyles.whiteButton}><Text style={buttonStyles.whiteButtonText}>Add Meal</Text></View>
     </TouchableOpacity>
   
     {/* </View> */}
     </View>
    )
}


const buttonStyles=StyleSheet.create({
    wrapperContainer:{
        position:"absolute",
        bottom:0,
        left:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        flexDirection:'row',
        height:87,
       
        marginTop:20,
        backgroundColor: '#EBECF0', // Background color
          elevation: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: '#000000',
      },
      android: {
        elevation: 12, // Android uses elevation for shadows
      },
    }),
    },
    container:{
        position:"absolute",
        bottom:0,
        left:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        flexDirection:'row',
        height:87,
        marginTop:20,
        backgroundColor: '#EBECF0', // Background color
          elevation: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: '#000000',
      },
      android: {
        elevation: 12, // Android uses elevation for shadows
      },
    }),
    },
    orangeButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:dimensions.fullWidth/2+10,
        height:47,
        backgroundColor:'#E1740F',
        borderRadius:5,
        marginHorizontal:15,
    
    },
    whiteButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:dimensions.fullWidth/2-70,
        height:47,
        borderColor:'#3D3D3D',
        borderWidth:1,
        borderRadius:5,
        marginHorizontal:15,
    },
    orangeButtonText:{
        color: '#FFF',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        
        textTransform: 'capitalize',
    },
    whiteButtonText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        
        textTransform: 'capitalize',
    }
})


export default SubscribeNowAddMeal;