import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../../styles';

const OrderSummary = props => {
    return (
        <View style={styles.wrapperContainer}>
            <View style={styles.container}>
                <View><Text style={styles.headingText}>Order Summary</Text></View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>Selected Items</Text>
                    <Text style={styles.rightText}>Rs. 430</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>Government Tax</Text>
                    <Text style={styles.rightText}>Rs. 20</Text>
                </View>
                <View style={lineStyles.container}></View>
                <View style={styles.firstContainer}>
                    <Text style={buttonStyles.changeText}>Total Charge</Text>
                    <Text style={styles.rightText}>Rs. 430</Text>
                </View>
                <View style={buttonStyles.container}><Text style={buttonStyles.text}>Pay Online Now</Text></View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:dimensions.fullWidth-40,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 10,
        elevation: 5,
    },
    firstContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        width:dimensions.fullWidth-60,
    },
    leftText:{
        color: '#000',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
       
    },
    rightText:{
        color: '#E1740F',
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    },
    headingText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    
    },
    headingContainer:{
        textAlign:'center',
    }
});

const buttonStyles = StyleSheet.create({
   container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E1740F',
    borderRadius:12,
    width:dimensions.fullWidth-80,
    paddingVertical:16,
    marginVertical:10,
    
   },
   text:{
    color: '#FFF',
    fontFamily: 'Rubik',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    
    letterSpacing: 0.25,
    textTransform: 'uppercase',
   },
   changeText:{
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  
    textTransform: 'capitalize',
   }
});

const lineStyles=StyleSheet.create({
    container:{
        height: 1,
        width: dimensions.fullWidth-80, 
    backgroundColor: 'transparent', 
        borderBottomWidth: 1, 
        borderColor: 'black', 
        borderStyle: 'dashed', 
    }
})

export default OrderSummary;
