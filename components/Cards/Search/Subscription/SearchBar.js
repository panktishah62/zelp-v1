import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import { dimensions, fonts } from "../../../../styles";
import { colors } from "../../../../styles/colors";

const SearchBar=props=>{
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Image style={styles.image} source={require('../../../../assets/images/Subscription/search.png')}/>
                <Text style={styles.text}>What can we get for you</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#fff',
        width:dimensions.fullWidth-40,
        marginTop:20,
        gap:10,
        height:41,
        borderRadius:32,
        elevation:5
       
    },
    firstContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        marginHorizontal:25,
        gap:10,
        
        flexDirection:'row',
    },
    image:{
        marginTop:2
    },
    text:{
        color:colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    }
})

export default SearchBar;