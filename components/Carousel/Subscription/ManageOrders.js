import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";
import { dynamicSize } from "../../../utils/responsive";

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
    const pendingImage=require('../../../assets/images/Subscription/subscription_icons/orange_clock.png')
    const {orderArray}  = props;

    const renderItem=()=>{
        const length=data.length;
        return orderArray && orderArray.map((item,index)=>(
           
                <View key={index} style={styles.itemContainer}>
                    <View style={styles.innerContainer}>  
                       {item.orderStatus==='pending' && <Image source={pendingImage} style={styles.increaseDimension}/>}
                   {  !(index+1===length) && orderArray?.length!==1 &&   <View style={styles.line}></View>}
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
        width:dimensions.fullWidth-dynamicSize(100),
        height:100.79,
    },
    container:{
        marginTop:dynamicSize(20),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:100.79,
        borderRadius:15,
        borderColor:'black',
        width:dimensions.fullWidth-dynamicSize(60),
        borderWidth:2,
    },
    itemContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
     
        width:dimensions.fullWidth/dynamicSize(4)-dynamicSize(26),
       
       
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
        width:dynamicSize(46),
    },
    manageOrderText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
       
    },
    mealText:{
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    manageOrderTextSection:{
        position:'absolute',
        top:10,
        left:(dimensions.fullWidth-dynamicSize(190))/2,
        backgroundColor:'#fff',
       
        paddingHorizontal:dynamicSize(5),
       height:30

    },
    increaseDimension:{
        width:dynamicSize(27.5),   
        height:27.5

    }
})

export default ManageOrders;
