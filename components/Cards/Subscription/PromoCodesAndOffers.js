import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const PromoCodesAndOffers=props=>{
    const {promoCode,offer}=props;
    return(
        <View style={[styles.wrapperContainer]}>
        <View style={styles.container}>
           <View style={styles.firstContainer}>
            <View style={styles.leftContainer}>
                <Image source={require('../../../assets/images/Subscription/promoCode.png')}/>
                <Text style={styles.leftText}>Promocode & Offers</Text>
            </View>
            <View style={styles.rightContainer} ><Text style={styles.rightText}>Browse</Text></View>
           </View>
           <View style={boxStyle.box} >
            <View style={boxStyle.left}>
                <Text style={boxStyle.codeText}>{promoCode}</Text>
            </View>
            <View style={boxStyle.right}><View><Text style={boxStyle.offerText}>-{offer}</Text></View><Image source={require('../../../assets/images/Subscription/cross.png')}/></View>
           </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperContainer:{
       marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin:  14,
        borderRadius:10,
        backgroundColor:'#fff',
        elevation: 5,
    },
    container:{
        
        marginTop: 20,
      
        display: 'flex',
        flexDirection: 'column',
        width: dimensions.fullWidth - 60,
        justifyContent: 'space-between',
        alignItems: 'center',
       
    },
    firstContainer:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        width: dimensions.fullWidth - 60,
        paddingVertical:6 ,
        paddingHorizontal: 14,
      
    },
    leftContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap: 10,
    },
     rightContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor:'black',
        borderRadius: 25,
     },
     rightText:{
        color: '#FFF',
    textAlign: 'right',
    fontFamily: 'Nunito',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    
     },
     leftText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
       
        letterSpacing: 0.25,
        textTransform: 'capitalize',
     },
     shadow:{
        
        backgroundColor: '#fff', // You can set a solid background color here if needed
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.5,
        
        elevation: 3, 
     }
})

const boxStyle = StyleSheet.create({
 box:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    width: dimensions.fullWidth - 60,
    borderRadius: 10,
    height:54.173,
    borderColor:'#3D3D3D',
    borderStyle:'dashed',
    paddingVertical: 10,
    borderWidth:2,
    paddingHorizontal: 14,
    margin:10,
    marginBottom:20
 },
 left:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
 },
 right:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:4,
 },
 offerText:{
    paddingVertical: 6,
    paddingHorizontal: 14,
    color: '#FFF',
    textAlign: 'right',
    fontFamily: 'Nunito',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    backgroundColor:'#E1740F',
    borderRadius: 25,
 },
 codeText:{
    color: '#3D3D3D',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
 }
})

export default PromoCodesAndOffers;