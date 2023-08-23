import React from 'react';
import { View } from 'react-native';
import FoodAffairScreenSaver from '../../assets/icons/FoodAffairScreenSaver.svg';

const FoodAffairScreen = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FoodAffairScreenSaver />
        </View>
    );
};

export default FoodAffairScreen;
