import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DishListItem from './DishListItem';

const DishComponent = ({ dishData, restaurant }) => {
    const [enable, setEnable] = useState(false);

    return (
        <View style={{}}>
            {dishData.map((dish, index) => (
                <DishListItem
                    key={index}
                    dishDetails={dish}
                    restaurant={restaurant}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({});

export default DishComponent;
