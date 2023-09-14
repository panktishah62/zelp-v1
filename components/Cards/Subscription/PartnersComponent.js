
import React,{ useState } from "react";
import { StyleSheet,View,Image,Text,ScrollView } from "react-native";
import TextSurroundedByLine from "./TextSurroundedByLine";
import { dimensions } from "../../../styles";








const PartnersComponent = props => {

    const data = [
        {
            id: '1',
            imageSource:require('../../../assets/images/Subscription/up_wala_logo.png'),
            text:'Up wala'
        },
        {
            id: '2',
            imageSource:require('../../../assets/images/Subscription/kfc_logo.png'),
            text:'KFC'
        },
        {
            id: '3',
            imageSource:require('../../../assets/images/Subscription/domino\'s_logo.png'),
            text:'Domino\'s Pizza'
        },
        {
            id: '4',
            imageSource:require('../../../assets/images/Subscription/empire_restaurant_logo.png'),
            text:'Empire Restaurant'
        },
        {
            id: '5',
            imageSource:require('../../../assets/images/Subscription/kfc_logo.png'),
            text:'KFC'
        }
        
       
        // Add more items as needed
      ];


    const renderItems = () => {
        
    
        return data.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.imageText}>
                <Image style={styles.imageTextImage}  source={item.imageSource}/>
                <Text style={styles.imageTextText}>{item.text}</Text>
            </View>
          </View>
        ));
      };
    

    return(
        <View>
        <TextSurroundedByLine text="Partner Restaurants"/>
        <ScrollView horizontal >
        {renderItems()}
      </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    item:{
        display: 'flex',
        width: dimensions.fullWidth/4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    
    },
    
    imageText:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
      
    },
    imageTextImage:{
        width: 97.203,
        height: 81.855,
    flexShrink: 0,
    },
    imageTextText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Nunito',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    }
})


export default PartnersComponent