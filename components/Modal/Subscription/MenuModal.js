import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView,TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { dehydrate } from 'react-query';

const MenuModal=props=>{
    const{active,toggleModal}=props


    const data=[
        {
            id:1,
            text:"Best Sellers",
            number:3
        },
        {
            id:1,
            text:"Breakfast",
            number:10
        },
        {
            id:1,
            text:"Dosas",
            number:5
        }
        ,
        {
            id:1,
            text:"Dosas",
            number:5
        }
        ,
        {
            id:1,
            text:"Dosas",
            number:5
        }
        ,
        {
            id:1,
            text:"Dosas",
            number:5
        }
    ]

    const renderItem=()=>{
        return data.map((item,index)=>(
            <View key={index} style={styles.firstContainer}>
            <Text style={styles.secondText}>{item.text}</Text>
            <Text style={styles.thirdText}>{item.number}</Text>

        </View>
        ))
    }

    return(
        <View style={styles.container}>
  <Modal
        style={styles.wrapperModalContainer}
          animationType="slide"
          transparent={true}
          visible={active}
        >
            <View style={styles1.headingWrapper}>
            <View style={styles1.topHeading}><Text style={styles1.topHeadingText}>Menu</Text></View>
            </View>
            <ScrollView style={styles.scroll}>
                {
                    renderItem()
            }
            </ScrollView>
            <TouchableHighlight onPress={toggleModal} style={styles1.crossButtonContainer}>
           
                <Image source={require('../../../assets/images/Subscription/orange_cross.png')}/>
           
            </TouchableHighlight>
        </Modal>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    scroll:{
        marginVertical:dynamicSize(20)

    },
    wrapperModalContainer:{
        
        position:'absolute',
          bottom:dimensions.fullHeight/2-dynamicSize(300),
         left:-10,
         right:-10,
         borderRadius: 20,
         backgroundColor: 'rgba(50, 50, 50, 0.95)',
        marginVertical:dynamicSize(20)
         
      },
      firstContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:dynamicSize(26),
      },
      firstText:{
        color: '#FD7A33',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
      },
      secondText:{
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
      },
      thirdText:{
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
      },
      
})

const styles1=StyleSheet.create({
    topHeading:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        width:100,
        borderBottomWidth:3,
        borderColor:'#fff'
    },
    topHeadingText:{
        color: '#FFF',
    fontFamily: fonts.POPPINS_500_11.fontFamily,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingBottom:8
    },
    headingWrapper:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    },
    crossButtonContainer:{
        position:'absolute',
        top:dynamicSize(16),
        right:0,
    }
})

export default MenuModal