import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const data=[
    {
        image:require('../../../assets/images/Subscription/salad_3.png'),
        text:"Choose your Preferred Meal",
    },
    {
        image:require('../../../assets/images/Subscription/clock.png'),
        text:"Wide Variety of options",
    },
    {
        image:require('../../../assets/images/Subscription/plate.png'),
        text:"Delivery at your Door Step",
    },
]



const BestSellerItemCard = () => {
    return data.map((item, index) => (
        <View key={index} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/Subscription/dish_image.png')} style={styles.dishImage} />
        </View>
        <Text style={styles.dishName}>Chicken Tikka</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.priceText}>Rating</Text>
            <Image source={require('../../../assets/images/Subscription/golden_star.png')} style={styles.starImage} />
            <Text style={styles.ratingValue}>4.1</Text>
        </View>
        <TouchableOpacity style={styles.selectButton} >
            <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
    </View>
    ));
};

const OrderHistoryItemCard = () => {
    return data.map((item, index) => (
        <View key={index} style={styles1.container}>
            <View style={styles1.firstContainer}>
                <View style={styles1.imageContainer}><Image style={styles1.image} source={require('../../../assets/images/Subscription/dish_image.png')}/></View>
                <View style={styles1.textContainer}><Text style={styles1.name}>Noodles</Text><Text style={styles1.time}>01-08-2023 5:30 PM</Text></View>
            </View>
            <View style={styles1.secondContainer}>
                <View style={styles1.iconContainer}>
                    <Image style={styles1.icon} source={require('../../../assets/images/Subscription/leftRoundArrow.png')}/>
                    <Image style={styles1.icon}source={require('../../../assets/images/Subscription/rightRoundArrow.png')}/>

                </View>
                <View style={styles1.textContainerTwo}><Text style={styles1.buttonText}>Reorder</Text></View>
            </View>

            </View> 
    ));
};


const QuickCheckout = props => {
    const {firstActive,secondActive}=props;
   if(firstActive){
    return(
        <View style={styles.wrapperContainer}>
           {BestSellerItemCard()}
        </View>
    
    )
   }
   else{
         return(
          <View style={styles1.wrapperContainer}>
          {OrderHistoryItemCard()}
      </View>
         )
   }
}

//style for the Order History Item Card
const styles1=StyleSheet.create({
    wrapperContainer:{
        display:'flex',
        marginTop:40,

        justifyContent:'center',
        alignItems:'center',
        gap:10,
        flexDirection:'column',
        width:dimensions.fullWidth-60,
    },
    name:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    time:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    buttonText:{
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    container:{
        display:'flex',

        justifyContent:'space-between',
        alignItems:'center',
        width:dimensions.fullWidth-60,
        borderWidth:1,
        borderRadius:10,
        
        height:75,
        flexDirection:'row',
        

    },
    firstContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        flexDirection:'row',
        gap:8
    },
    secondContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:6,
        elevation:5,
        marginRight:10,
        backgroundColor:'#E1740F',
        borderRadius:28.5,
        width:93.319,
        height:26.625
    },
    image:{
        width:51.52,
        height:51.52,
    },
    imageContainer:{
    },
    textContainer:{
    },
    iconContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:2,
        

    },
    icon:{
        width:10.496,
        height:3.751,
        
    }
})


const styles = StyleSheet.create({
    wrapperContainer:{

        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:dimensions.fullWidth-60,
        gap:10,
        marginTop:80,
      
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 10,
        justifyContent: 'center',
        elevation: 5,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
    },
   
    dishImage: {
        width:98.29,
        height:98.29,
        borderRadius: 50,
        marginTop: -50,
    },
    dishName: {
        color: '#000',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 19,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 5,
    },
    priceText: {
        color: '#000',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
       
    },
    starImage: {
        width: 14,
        height: 14,
        marginRight: 4,
        marginLeft:5,
    },
    ratingValue: {
        color: '#000',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    
    },
    selectButton: {
        backgroundColor: '#E1740F',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
    
        width: 88,
        height: 28,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    selectButtonText: {
        color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22, // You can use the exact value provided
    letterSpacing: -0.408,
    },
});


export default QuickCheckout;