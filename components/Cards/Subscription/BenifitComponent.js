import React from 'react'
import { View,Text,StyleSheet,Image } from 'react-native'



const BenifitComponent = props => { 

    
        const {data}=props


    return(
        <View style={styles.container}>
            {data && data.map((item,index)=>(
            <View style={styles.innerContainer} key={index}>
            <Image style={styles.innerImage} source={item.image} />
            <Text style={styles.innerText}>{item.text}</Text>
            </View>
            ))
            }   
           
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
    display: 'flex',
    justifyContent: 'space-around',
    gap:10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10, 
    },
    innerContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        width:92,
        gap: 10,
        flexDirection: 'column',
        padding: 10, // Add padding to mimic gap
        
    },
    innerImage:{
        width: 44.5,
        height: 44.5,
        flexShrink: 0,
    },
    innerText:{
        fontFamily: 'Nunito',    
        fontSize: 12,            
        fontStyle: 'normal',     
        fontWeight: '800',       
        color: '#000000',       
        textTransform: 'capitalize',
    }
    })



export default BenifitComponent