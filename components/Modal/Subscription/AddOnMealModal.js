import React,{useState} from "react";
import { StyleSheet,TouchableOpacity, View, Text,Image, ScrollView } from "react-native";
;
import Modal from 'react-native-modal';
import { dimensions } from "../../../styles";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
const AddOnMealModal = props => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
        <View >
        <View style={buttonStyles.container}>
       <TouchableOpacity>
       <View style={buttonStyles.orangeButton}><Text style={buttonStyles.orangeButtonText}>Subscribe Now</Text></View>
       </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
        <View style={buttonStyles.whiteButton}><Text style={buttonStyles.whiteButtonText}>Add Meal</Text></View>
        </TouchableOpacity>
      
        </View>
  
        <Modal
        style={styles.wrapperModalContainer}
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
            <View style={styles.wrapperModalContainer}>
          <View style={styles.modalContainer}>
      <View style={addOnMealStyles.container}><Text style={addOnMealStyles.text}>Add on Meal</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={toggleModal}>
        <Image
          source={require('../../../assets/images/Subscription/cross.png')} // Replace with your image source
          style={styles.image}
        />
        </TouchableOpacity>
      </View>
      </View>

      <View style={mealsStyles.container}>
        <Text style={mealsStyles.firstText}>Select No. of Meals</Text>
        <View style={mealsStyles.buttonContainer}>
            <View style={mealsStyles.minusButton}><Text>-</Text></View>
            <Text style={{fontWeight:'700',color:'black'}}>5</Text>
            <View style={mealsStyles.plusButton}><Text style={{color:'#fff'}}>+</Text></View>
        </View>
      </View>
      <View style={viewStyles.container}>
        <Text style={viewStyles.text}> Validity of the plan</Text>
        <View style={viewStyles.buttonContainer}><Text style={viewStyles.buttonText}>10 days</Text></View>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity  >
            <Text style={styles.buttonText}>Subscribe Now</Text>
        </TouchableOpacity>

      </View>
      </View>
      </View>
        </Modal>
      </View>
    );
}

const buttonStyles=StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        flexDirection:'row',
        height:87,
        marginTop:20,
        backgroundColor: '#EBECF0', // Background color
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 40,
      },
      android: {
        elevation: 16,
      },
    }),
    },
    orangeButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:dimensions.fullWidth/2+10,
        height:47,
        backgroundColor:'#E1740F',
        borderRadius:5,
        marginHorizontal:15,
    
    },
    whiteButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:dimensions.fullWidth/2-70,
        height:47,
        borderColor:'#3D3D3D',
        borderWidth:1,
        borderRadius:5,
        marginHorizontal:15,
    },
    orangeButtonText:{
        color: '#FFF',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        
        textTransform: 'capitalize',
    },
    whiteButtonText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        
        textTransform: 'capitalize',
    }
})

const styles=StyleSheet.create({
    wrapperModalContainer:{
      position:'absolute',
        bottom:32,
       left:-10,
       right:-10,
       
    },
    modalContainer:{
       
        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',
        gap:10,
        flexDirection:'column',
        backgroundColor:'#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonContainer:{
        display:'flex',
        alignItems:'center',
        paddingHorizontal: 120,
        paddingVertical:10, 
        backgroundColor:'#E1740F',
        borderRadius:5,
        marginBottom:5,
    },
    buttonText:{
        color: '#FFF',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        
        textTransform: 'capitalize',
    },
    imageContainer: {
        position: 'absolute',
        top: 1, 
        right: 16, 
      },
      image: {
        width: 24, 
        height: 24, 
      },
    button:{
        display: 'flex',
        flexShrink: 0,
    }
})

const mealsStyles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        width:dimensions.fullWidth-60,
       
        flexDirection:'row',
    },
    firstText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
       
        letterSpacing: 0.54,
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:90,
        justifyContent:'space-between',

    },
    text:{
        color: '#E1740F',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 'normal',
        letterSpacing: 0.54,
    },
    plusButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:28.28,
        height:28.28,
        borderRadius:28,
       
        backgroundColor:'#E1740F',
    },
    minusButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:28.28,
        height:28.28,
        borderRadius:28,
        borderWidth:1,
        borderColor:'#E1740F',
    
    }
})

const addOnMealStyles=StyleSheet.create({
    container:{
        margin:14,
        display:'flex',
        flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
      
        width:dimensions.fullWidth,
    },
    text:{
        color: '#E1740F',
        textAlign:'center', 
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
   
    letterSpacing: 0.54,
    }
})

const viewStyles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:dimensions.fullWidth-60,
        height:50,
        backgroundColor:'#fff',
        marginBottom:5,
    },
    text:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.54,
    },
    buttonText:{
        color: '#3D3D3D',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    },
    buttonContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:30,
        backgroundColor:'#F4F4F4',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#3D3D3D',
    }
})

export default AddOnMealModal;