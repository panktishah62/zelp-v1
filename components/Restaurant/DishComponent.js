import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DishListItem from './DishListItem';

const DishComponent = ({ dishData, restaurant }) => {
    const [enable, setEnable] = useState(false);

    return (
        <View style={{}}>
            <DishListItem dishDetails={dishData} restaurant={restaurant} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default DishComponent;
