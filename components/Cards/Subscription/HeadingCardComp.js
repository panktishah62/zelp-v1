import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { dimensions } from '../../../styles'
import TextSurroundedByLine from './TextSurroundedByLine'
import { dynamicSize } from '../../../utils/responsive'
import MealCards from './MealCards'

const HeadingCardComp = (props) => {

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


    return(
       data.map((item,index)=>(
        <View key={index} style={styles.container}>
        <TextSurroundedByLine text={item.headingText}/>
        <MealCards/>
    </View>
       ))
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