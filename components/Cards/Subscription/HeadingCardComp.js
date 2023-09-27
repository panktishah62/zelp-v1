import React,{useEffect, useRef} from 'react'
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import { dimensions } from '../../../styles'
import TextSurroundedByLine from './TextSurroundedByLine'
import { dynamicSize } from '../../../utils/responsive'
import MealCards from './MealCards'
import { useSelector } from 'react-redux'

const HeadingCardComp = (props) => {
    
    const {catagoryId} = useSelector((state)=>state.menuModal)

    
  
    

    const data=[
        {
            id:1,
            headingText:"Starters",
            dataArr:[]
        },
        {
            id:2,
            headingText:"Rice Items",
            dataArr:[]
        },
        {
            id:3,
            headingText:"Curries",
            dataArr:[]
        },

    ]

    const scrollViewRef = useRef();
    const handleButtonPress = index => {
        console.log(index)
        scrollViewRef?.current?.scrollTo({
            y: index,
            animated: true,
        });
    };
 useEffect(()=>{
  handleButtonPress(catagoryId);
  

 },[catagoryId])

 const renderItems=()=>{
    return data.map((item,index)=>(
       
        <View key={index} style={styles.container}>
        <TextSurroundedByLine text={item.headingText}/>
        <MealCards  activeOrangeButton={true} orangeButtonText={"Select"} showRatingNumber={true} showInfoText={true}/>
    </View>
   
       ))
 }

    return(
        <ScrollView ref={scrollViewRef}>
      {renderItems()}
       </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:dimensions.fullWidth,
        marginTop:dynamicSize(20),
    }
})

export default HeadingCardComp