import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const ManageOrders = props => {
    const data=[
        {id:'1',
        imageSource:require('../../../assets/images/Subscription/greenTick.png')
},
        {id:'2',
        imageSource:require('../../../assets/images/Subscription/greenTick.png')
    },
        {id:'3',
        imageSource:require('../../../assets/images/Subscription/greenTick.png')
    },
        {id:'4',
        imageSource:require('../../../assets/images/Subscription/greenTick.png')
    },
        {id:'4',
        imageSource:require('../../../assets/images/Subscription/golden_star.png')
    },
    ]

    const renderItem=()=>{
        const length=data.length;
        return data.map((item,index)=>(
           
                <View key={index} style={styles.itemContainer}>
                    <View style={styles.innerContainer}>
                        <Image style={styles.increaseDimension} source={item.imageSource}/>
                   {  !(index+1===length) &&   <View style={styles.line}></View>}
                    </View>
                    <View style={styles.textContainer}><Text style={styles.mealText}>Meal {index+1}</Text></View>
                </View>
        )
        )
    }

    return(
        <View>
        <View style={styles.container}>
                <View style={styles.section}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

               {renderItem()}
            </ScrollView>
               </View>

        </View>
        <View style={styles.manageOrderTextSection}><Text style={styles.manageOrderText}>Manage Orders</Text></View>

        </View>
    )
}

const styles = StyleSheet.create({
    section:{
        display:'flex',
       
        alignItems:'center',
        flexDirection:'row',
        width:dimensions.fullWidth-100,
        height:100.79,
    },
    container:{
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:100.79,
        borderRadius:15,
        borderColor:'black',
        width:dimensions.fullWidth-60,
        borderWidth:2,
    },
    itemContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
     
        width:dimensions.fullWidth/4-26,
       
       
    },
    innerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    textContainer:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:4,
    },
    line:{
        height:1,
        borderColor:'black',
        borderWidth :1,
        borderStyle:'dashed',
        width:46,
    },
    manageOrderText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
       
    },
    mealText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    manageOrderTextSection:{
        position:'absolute',
        top:10,
        left:(dimensions.fullWidth-190)/2,
        backgroundColor:'#fff',
       
        paddingHorizontal:5,
       height:30

    },
    increaseDimension:{
        width:27.5,   
        height:27.5

    }
})

export default ManageOrders;
