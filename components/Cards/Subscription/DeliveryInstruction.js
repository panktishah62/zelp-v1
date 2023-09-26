import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";
import { dynamicSize } from "../../../utils/responsive";
import PlusCircle from '../../../assets/images/Subscription/PlusCircle.svg';
const DeliveryInstruction=props=>{
    return(
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Text style={styles.firstText}>Add Delivery Instructions</Text>
              <View style={styles.icon}><PlusCircle/></View>  
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:dimensions.fullWidth-dynamicSize(40),
        marginTop:dynamicSize(20),
        
    },
    firstContainer:{
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:'#FFF',
        elevation:8,
        borderRadius:10,
        width:dimensions.fullWidth-dynamicSize(40),
        height:56.808,
        alignItems:'center',
        marginHorizontal:10,
        flexDirection:'row',
    },
    firstText:{
        color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft:16,
    letterSpacing: -0.28,
    },
    icon:{
        marginRight:16,
        
    }

})

export default DeliveryInstruction