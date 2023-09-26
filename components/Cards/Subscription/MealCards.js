import React from "react";
import { StyleSheet, View,Text,Image, ScrollView,TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { dimensions,colors, fonts } from "../../../styles";
import { dynamicSize } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectionButton, selectMenu } from "../../../redux/actions/subscriptionActions";

const MealCards=props=>{

    const {isButtonVisible,isHeadingVisible,isRatingTextVisible,backendDataArr,activeOrangeButton,orangeButtonText,showRatingNumber,showInfoText,showCrossButton,heading}=props

    const dispatch=useDispatch()

    const {isSelectedAny,index:gotIndex,componentName}=useSelector(state=>state.subscriptionSelectMenu)
    console.log(isSelectedAny,gotIndex,componentName)


    const selectButtonHandler=(index,componentName)=>{
        if(isSelectedAny){
            return;
        }
        // dispatch(resetSelectionButton())
        dispatch(selectMenu(index,componentName))
    }

    const data = [
        {
            id:'1',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        {
            id:'2',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },

         {
            id:'3',
            image:require('../../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        
    ]

    const renderItem=()=>{
        return data.map((item,index)=>(
            <View key={index} style={styles.wrapperContainer}>
           
      
           <View style={styles.itemConainer}>
           <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
               <Image style={styles.image} source={item.image} />
               </View>
               </View>
               <View style={styles.rightContainer}>
                   <View style={styles.firstContainer}>
                   <View style={styles.vegContainer}>
                       <Image  source={item.vegImage} />
                       <Text style={styles.vegText} >{item.vegText}</Text>
                   </View>
                   <View style={styles.middleTextContainer}>
                       <Text style={styles.boldText}>{item.boldText}</Text>
                     {showRatingNumber && <Image style={styles.nextImage} source={require('../../../assets/images/Subscription/golden_star.png')} />}
                    {showRatingNumber &&   <Text style={[styles.firstText,{marginLeft:dynamicSize(3)}]}>{item.rating} </Text>}
                   </View>
                 {showInfoText &&  <View style={styles.vegContainer}>
                       <Text style={styles.lastText}>{item.lastText}</Text>
                       <Image source={require('../../../assets/images/Subscription/info.png')} />
                   </View>}
                  {activeOrangeButton && (isSelectedAny) && (gotIndex!==index) &&
                  <TouchableOpacity onPress={()=>selectButtonHandler(index,heading)}>
                    <View style={styles.selectDisableButtonContainer}>
                        <Text style={styles.selectDisableButtonText}>Select</Text>
                   </View>
                   </TouchableOpacity>}
                   {activeOrangeButton && (isSelectedAny) && (gotIndex===index) && (componentName!==heading) &&
                  <TouchableOpacity onPress={()=>selectButtonHandler(index,heading)}>
                    <View style={styles.selectDisableButtonContainer}>
                        <Text style={styles.selectDisableButtonText}>Select</Text>
                   </View>
                   </TouchableOpacity>}
                   {activeOrangeButton && (!isSelectedAny) &&
                  <TouchableOpacity onPress={()=>selectButtonHandler(index,heading)}>
                    <View style={styles.selectButtonContainer}>
                        <Text style={styles.selectButtonText}>Select</Text>
                   </View>
                   </TouchableOpacity>}
                   {activeOrangeButton && (isSelectedAny) && (index===gotIndex)&& (componentName===heading) && 
                  <TouchableOpacity onPress={()=>selectButtonHandler(index,"MealCards")}>
                    <View style={styles.selectButtonContainer}>
                        <Text style={styles.selectButtonText}>Selected</Text>
                   </View>
                   </TouchableOpacity>}
                   </View>
                 
                   
               </View>
               </View>
             
     </View>
        ))
    }


    return(
        <View>
          {isButtonVisible &&  <View style={buttonStyles.buttonContainer}>
            <View style={[buttonStyles.eachButtonStyle,buttonStyles.changeStyle]}><Text style={[buttonStyles.textStyle,buttonStyles.changeTextStyle]}>Breakfast</Text></View>
            <View style={[buttonStyles.eachButtonStyle]}><Text  style={[buttonStyles.textStyle]}>Lunch</Text></View>
            <View style={buttonStyles.eachButtonStyle}><Text  style={[buttonStyles.textStyle]}>Dinner</Text></View>
            </View>}
         {isHeadingVisible &&   <View style={belowButtonStyle.container}>
                <Text  style={belowButtonStyle.textStyle}>Available from 9:00Am - 11:00 AM </Text>
            </View>}
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
    imageContainer:{
        width:dynamicSize(100),
    },
    image:{
        width:dynamicSize(100)
        
    },
    nextImage:{
        marginLeft:dynamicSize(10),
    },
    wrapperContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:dynamicSize(10),
        marginVertical:10,
        backgroundColor: '#FFFFFF',
        borderRadius:14,
        elevation: 5,
    },
    middleTextContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    itemConainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
       gap:dynamicSize(20),
        height:129.5,
        margin:dynamicSize(8),
    },
    leftContainer:{
        width:dynamicSize(90),
        height:100,
        flexShrink:0,
    },
    rightContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
       justifyContent:'space-between',
       width:dimensions.fullWidth-dynamicSize(160),
       gap:dynamicSize(10),
   
    },
    firstContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
       
        height:100,
        flexShrink:0,
        width:dimensions.fullWidth/2+dynamicSize(30),
    },
    secondContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        height:100,
      
    },
    vegContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:dynamicSize(6),
       marginLeft:dynamicSize(4),
    },
    boldText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: dynamicSize(17),
        fontStyle: 'normal',
        fontWeight: '600',
      marginVertical:dynamicSize(6),
      marginLeft:dynamicSize(4),
    },
    lastText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    firstText:{
        color: '#3D3D3D',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: dynamicSize(12),
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
        gap:dynamicSize(6),
        
    },
    vegText:{
        color: '#3D3D3D',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    },
    selectButtonContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#E1740F',
        borderRadius:22,
        width:dynamicSize(84),
        height:25,
        marginTop:dynamicSize(10),
    },
    selectButtonText:{
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22, 
        letterSpacing: -0.408,
    },
    selectDisableButtonContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5D5956',
        borderRadius:22,
        width:dynamicSize(84),
        height:25,
        marginTop:dynamicSize(10),
    },
    selectDisableButtonText:{
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22, 
        letterSpacing: -0.408,
    }
   

})

const buttonStyles=StyleSheet.create({
    buttonContainer:{
        display:'flex',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E1740F',
        height: 30,
        margin:dynamicSize(14),
        flexShrink: 0, 
        flexDirection:'row',
        alignItems:'center',
     
    },
    eachButtonStyle:{
    borderRadius:5,
   
    width:dimensions.fullWidth/3-dynamicSize(10),
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

const crossButtonStyles=StyleSheet.create({
    container:{
        position:'absolute',
        top:10,
        right:12,
    }
})

export default MealCards;