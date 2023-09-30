import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { useDispatch } from 'react-redux';
import { selectAllMenu, selectVegMenu, setSubscriptionMealType } from '../../../redux/actions/subscriptionActions';

const MultipleButtonFoodType = props => {
    const data = [
        {
            id: 1,
            text: 'Breakfast',
            time: '(9:00 am - 12:00 AM)',
            image: require('../../../assets/images/Subscription/grey_icons/breakfast.png'),
            whiteImage: require('../../../assets/images/Subscription/white_icons/breakfast.png'),
        },
        {
            id: 2,
            text: 'Lunch',
            time: '(12:00 pm - 3:00 PM)',
            image: require('../../../assets/images/Subscription/grey_icons/lunch.png'),
            whiteImage: require('../../../assets/images/Subscription/white_icons/lunch.png'),
        },
        {
            id: 3,
            text: 'Dinner',
            time: '(6:00 pm - 9:00 PM)',
            image: require('../../../assets/images/Subscription/grey_icons/dinner.png'),
            whiteImage: require('../../../assets/images/Subscription/white_icons/dinner.png'),
        },
    ];

    const dispatch=useDispatch();

    const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = () =>{
    // console.log(isEnabled)
     setIsEnabled(!isEnabled);
    if(isEnabled){
        dispatch(selectVegMenu())
    }else{
        dispatch(selectAllMenu())
    }
}
    const [active, setActive] = useState(0);
    const clicked = (index,text) => {
        setActive(index);
        dispatch(setSubscriptionMealType(text))
    };

    const renderItems = () => {
        return data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => clicked(index,item.text)}>
                <View
                    style={[
                        active === index && styles.foodTypeButtonContainer,
                        active !== index && styles1.foodTypeButtonContainer,
                    ]}>
                    <View
                        style={[
                            active === index && styles.buttonContainer,
                            active !== index && styles1.buttonContainer,
                        ]}>
                        <View
                            style={[
                                active === index && styles.imageContainer,
                                active !== index && styles1.imageContainer,
                            ]}>
                            <ImageBackground
                                resizeMode="cover"
                                style={[
                                    active === index && styles.icon,
                                    active !== index && styles1.icon,
                                ]}
                                source={
                                    active !== index
                                        ? item.image
                                        : item.whiteImage
                                }
                            />
                        </View>
                        <Text
                            style={[
                                active === index && styles.buttonText,
                                active !== index && styles1.buttonText,
                            ]}>
                            {item.text} {active === index && item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ));
    };
    return (
        <View style={styles.container}>
            <View style={vegButtonStyles.container}>
                <View style={vegButtonStyles.buttonContainer}>
        <Text style={vegButtonStyles.vegButtonText}>Veg</Text>
    
      <Switch
        trackColor={{false: '#3D3D3D', true: '#3D3D3D'}}
        thumbColor={isEnabled ? '#00AB5E' : '#00AB5E'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {renderItems()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        gap: 10,
        flexDirection: 'row',
        height: 46,
        width: dimensions.fullWidth - 40,
    },

    foodTypeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 4,
        
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#E1740F',
       paddingHorizontal: 10,
       height:43,
        borderRadius: 44,
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
    icon: {
        height: 22.461,
        width: 26,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
});

const vegButtonStyles=StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:44
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:1,
        backgroundColor:'#fff',
        paddingHorizontal:14,
        
        height:44,
        borderRadius:35,
    },

    vegButtonText:{
        color: '#3D3D3D',
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22, // 157.143%
        letterSpacing: -0.408,

    }
})


const styles1 = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        gap: 10,

        height: 46,
        width: dimensions.fullWidth - 40,
    },

    foodTypeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 4,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        width: 143,
        height:43,
        backgroundColor: '#fff',
    
       
        borderRadius: 44,
    },
    buttonText: {
        color: '#3D3D3D',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
    icon: {
        height: 22.461,
        width: 30,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
});

export default MultipleButtonFoodType;
