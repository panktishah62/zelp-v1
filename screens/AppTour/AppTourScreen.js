import React from 'react';
import { View, Text, Image } from 'react-native';
import AppTourScreenComponent from '../../components/AppTour/AppTourScreenComponent';

const AppTourScreen = ({ navigation }) => {
    return (
        <View>
            <View>
                <AppTourScreenComponent navigation={navigation} />
            </View>
        </View>
    );
};

export default AppTourScreen;
