import React,{useEffect,useState} from "react";
import { View,Text,Image, StyleSheet } from "react-native";
import Carousel from 'react-native-new-snap-carousel';
import { dimensions,Styles } from "../../../styles";
import { colors } from "../../../styles/colors";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { getBannerImages } from "../../../redux/services/subscriptionService";

//static data
// const data = [
//     {
//         id: '1',
//         caroselImage:require('../../../assets/images/Subscription/carousel_1.png'),
//     },
//     {
//         id: '2',
//         caroselImage:require('../../../assets/images/Subscription/carousel_1.png'),
        
//     },
//     {
//         id: '3',
//         caroselImage:require('../../../assets/images/Subscription/carousel_1.png'),

//     },
//     {
//         id: '4',
//         caroselImage:require('../../../assets/images/Subscription/carousel_1.png'),
//     },
   
//   ];


const CarouselImageAtTop=props=>{
   const {bannerImagesArr,isStatic}=props


    const renderItem = () => {
        return bannerImagesArr?.map((item,index) => (
          <LinearGradient
            key={index}
            colors={['rgba(255, 255, 255, 0.80)', 'rgba(255, 255, 255, 0.25)']}
            style={styles.gradient}
          >
          <View style={[styles.conatiner,styles.shadow]} key={index} >
            
            <View style={styles.imageContainer}>
               { !isStatic && <Image style={styles.imageStyle} source={{
                    uri: item.image,
                }} />}
                {
                    isStatic && <Image style={styles.imageStyle} source={item.caroselImage} />
                }
            </View>
            
            
          </View>
          </LinearGradient>
        )
        );
      };
    

 return(
    <View style={styles.conatiner} >
       {  bannerImagesArr?.length!==0 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderItem()}
            </ScrollView>}

    </View>
 )
}

const styles=StyleSheet.create({
    conatiner:{
        width: dimensions.fullWidth, 
        height:  200.576, 
        flexShrink: 0,
        margin:0,
        padding:0
       
    },
    imageStyle:{
        width: dimensions.fullWidth-60,
        height:  177.576,
        borderRadius:7,
        resizeMode:'cover',
    },
    imageContainer:{
        width: dimensions.fullWidth-60, 
        height:  177.576, 
        resizeMode:'cover',
    },

    shadow:{
         
        width: dimensions.fullWidth-60, 
        margin:10,
        height: 177.576, 
            backgroundColor: '#FFF',
            borderRadius: 5,
            elevation: 5, // Apply elevation for shadow
          
    },
   
})


export default CarouselImageAtTop