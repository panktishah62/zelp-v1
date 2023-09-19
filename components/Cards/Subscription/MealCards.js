import React from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { dimensions,colors } from "../../../styles";

const MealCards=props=>{

    const data = [
        {
            id:'1',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0 Rating',
        },
        {
            id:'2',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0 Rating',
        },

         {
            id:'3',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0 Rating',
        },
        
    ]

    const renderItem=()=>{
        return data.map((item,index)=>(
            <View key={index} style={styles.wrapperContainer}>
           
      
           <View style={styles.itemConainer}>
           <View style={styles.leftContainer}>
               <Image source={item.image} />
               </View>
               <View style={styles.rightContainer}>
                   <View style={styles.firstContainer}>
                   <View style={styles.vegContainer}>
                       <Image source={item.vegImage} />
                       <Text>{item.vegText}</Text>
                   </View>
                   <View>
                       <Text style={styles.boldText}>{item.boldText}</Text>
                   </View>
                   <View style={styles.vegContainer}>
                       <Text style={styles.lastText}>{item.lastText}</Text>
                       <Image source={require('../../../assets/images/Subscription/info.png')} />
                   </View>
                   </View>
                   <View style={styles.secondContainer}>
                   <View style={styles.starContainer}>
                   <Image  source={require('../../../assets/images/Subscription/golden_star.png')} />
                       <Text style={styles.firstText}>{item.rating}</Text>
                   </View>
                   </View>
                   
               </View>
               </View>
               
     </View>
        ))
    }


    return(
        <View>
            <View style={buttonStyles.buttonContainer}>
            <View style={[buttonStyles.eachButtonStyle,buttonStyles.changeStyle]}><Text style={[buttonStyles.textStyle,buttonStyles.changeTextStyle]}>Breakfast</Text></View>
            <View style={[buttonStyles.eachButtonStyle]}><Text  style={[buttonStyles.textStyle]}>Lunch</Text></View>
            <View style={buttonStyles.eachButtonStyle}><Text  style={[buttonStyles.textStyle]}>Dinner</Text></View>
            </View>
            <View style={belowButtonStyle.container}>
                <Text  style={belowButtonStyle.textStyle}>Available from 9:00Am - 11:00 AM </Text>
            </View>
        <View style={styles.container}>
           {renderItem()}
        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
      
       
    },
    wrapperContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
      
        marginVertical:10,
      backgroundColor: '#FFFFFF',
      borderRadius:14,
      elevation: 5,
        
    
    },
    
    itemConainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        margin:8,
    },
    leftContainer:{
       
        width:100,
        height:100,
        flexShrink:0,
        margin:4,
    },
    rightContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
       justifyContent:'space-between',
     
       gap:10,
       margin:8,
    },
    firstContainer:{

    },
    secondContainer:{

    },
    vegContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:6,
       
    },
    boldText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
      marginVertical:5,
    },
    lastText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    firstText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
       
    },
    gradient:{
        borderRadius:14,
     },

    starContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        gap:6,
    },
   

})

const buttonStyles=StyleSheet.create({
    buttonContainer:{
        display:'flex',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E1740F',
        height: 30,
        margin:14,
        flexShrink: 0, 
        flexDirection:'row',
        alignItems:'center',
     
    },
    eachButtonStyle:{
    borderRadius:5,
   
    width:dimensions.fullWidth/3-10,
    height:30,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
       
    
    },
    changeStyle:{
        backgroundColor:'#E1740F',
        borderRadius:5,
        color:'#fff',
    },
    textStyle:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
      
        textTransform: 'capitalize',
    },
    changeTextStyle:{
        color: '#FFFFFF',
    }
})

const belowButtonStyle=StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

    },
    textStyle:{
        color: '#3D3D3D',
        textAlign:'center',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
    
        textTransform: 'capitalize',
    }
})

export default MealCards;