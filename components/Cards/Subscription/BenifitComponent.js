import React from 'react'
import { View,Text,StyleSheet,Image } from 'react-native'
import { dynamicSize } from '../../../utils/responsive'
import Svg, { Path } from 'react-native-svg';


const BenifitComponent = props => { 

    
        const {data,hi}=props
        console.log("data",hi)


    return(
        <View style={styles.container}>
            {data && data.map((item,index)=>(
            <View style={styles.innerContainer} key={index}>
           {!hi && <Image style={styles.innerImage} source={item.image} />}
            { hi &&
                   <Svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d={item.svg} fill="#FF5733" />
      </Svg>
            }
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
    gap:dynamicSize(10),
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10, 
    },
    innerContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        width:dynamicSize(92),
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