import React,{useState} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { dimensions } from '../../../styles';
import { Touchable } from 'react-native';
import CarouselModal from '../../Modal/Subscription/CarouselModal';

const PlanDetailsHeading = props => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
        <View>
        <View style={styles.wrapperContainer}>
            <View style={styles.container}>
                <View style={styles.basicContainer}>
                    <Text style={styles.basicText}>Basic</Text>
                    <Image
                        source={require('../../../assets/images/Subscription/coin_1.png')}
                    />
                </View>
                <TouchableOpacity onPress={toggleModal}>
                <View style={styles.modifyContainer}>
                    <Text style={styles.modifyText}>Modify</Text>
                    <Image
                        source={require('../../../assets/images/Subscription/edit.png')}
                    />
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}><Text style={styles.secondaryText}>Froker Subscription Plan</Text></View>
        </View>
        <View style={planModelStyles.wrapperContainer}>
           <View style={planModelStyles.container}>
           <View style={planModelStyles.leftContainer}>
                <Text style={planModelStyles.leftTopText}>Plan Model :</Text>
                <Text style={planModelStyles.leftBottomText}>5 Meals with 10 Days validity</Text>
            </View>
            <View style={planModelStyles.rightContainer}>
                <Text style={planModelStyles.rightContainerText}>₹450</Text>
            </View>
           </View>
        </View>
        <CarouselModal isModalVisible={isModalVisible} toogleModal={toggleModal}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer:{
        width: dimensions.fullWidth - 60,
        marginTop: 4,
    },

    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        width: dimensions.fullWidth - 60,
        justifyContent: 'space-between',
    },
    basicContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexDirection: 'row',
    },
    basicText: {
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        letterSpacing: 0.6,
        textTransform: 'capitalize',
        textAlign: 'justify',
    },
    modifyContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 24,
        backgroundColor: '#E1740F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    modifyText: {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    secondaryText:{
        color: '#3D3D3D',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    
        textTransform: 'capitalize',
    }
});

const planModelStyles=StyleSheet.create({
    wrapperContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        width: dimensions.fullWidth - 60,
        justifyContent: 'space-between',   
    },
    leftContainer:{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    rightContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    rightContainerText:{
        color: '#E1740F',
        fontFamily: 'Nunito',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    leftTopText:{
        color: '#E1740F',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
    },
    leftBottomText:{
        color: '#3D3D3D',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
    }
});



export default PlanDetailsHeading;
