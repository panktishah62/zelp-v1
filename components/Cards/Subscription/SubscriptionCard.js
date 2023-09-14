import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';


import { colors } from '../../../styles/colors';



const SubscriptionCard = props => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                
         <Image
         style={styles.upImage}
            source={require('../../../assets/images/Subscription/Intersect.png')}    
            />
            <Image
            style={styles.downImage}
            source={require('../../../assets/images/Subscription/delivery_boy.png')}
            />

        </View>
        
        <View style={styles.rightContainer}>
          <Text style={styles.mainText}>Get Upto 30% off on your <Text style={styles.changeColorText}> Subscription Plan</Text></Text>
          <View style={styles.cheatCodeSection}>
          <Text style={styles.cheatCodeText}>Use code "<Text style={{fontWeight:'bold'}} >MEAL30</Text>"</Text>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        height: 134,
        justifyContent:'space-between',
        borderColor: colors.ORANGE,
        backgroundColor: colors.ORANGE,
    },
    cheatCodeSpan:{
        fontWeight: 'bold', 
        color: colors.WHITE,
    },
    upImage:{
        position: 'absolute',
        top: -1,
        left: -2,
        width: 136.363,
        height: 134,
    },
    downImage:{
        position: 'absolute',
        top: 10,
        left: 8,
        width: 100.328,
        height: 100.328,
    },

    leftContainer:{
        flex: 1,
        width: 100.363,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    rightContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        
    },
  mainText:{
    fontFamily: 'Nunito',    
    fontSize: 16,             
    fontStyle: 'normal',     
    fontWeight: '700',       
    lineHeight: 21,          
    letterSpacing: 0.42,    
    textTransform: 'capitalize', 
   color:"#ffffff"
  },
  changeColorText:{
    color:'#DBFF00'
  },
  cheatCodeSection:{
    display: 'flex',
    width: 144,
    height: 30,
    marginTop:10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
   flexShrink:0,
    gap:10,
    borderRadius:5,
    backgroundColor: '#3D3D3D'
   
  },
  cheatCodeText:{
    fontFamily: 'Nunito',   
    fontSize: 12,           
    fontStyle: 'normal',     
    fontWeight: '600',      
    lineHeight: 12,          
    letterSpacing: 0.36,   
    textTransform: 'capitalize', 
    color: '#FFF', 
  }
});

export default SubscriptionCard;
