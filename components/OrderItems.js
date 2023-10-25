import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FoodItem from './FoodItem.js';
import { dynamicSize } from '../utils/responsive.js';
import { colors } from '../styles/colors.js';

const OrderItems = ({ foodItems }) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const foodArray = [];
        foodItems.forEach(items => {
            items.items.forEach(item => {
                foodArray.push({
                    name: item.name,
                    count: item.count,
                    isVeg: item.isVeg,
                    price: item.price,
                });
            });
        });
        setFoods(foodArray);
    }, []);

    return (
        <FlatList
            key={Math.random().toString(36).slice(2)}
            data={foods}
            style={{ width: 170 }}
            renderItem={({ item }) => (
                <FoodItem
                    name={item.name}
                    count={item.count}
                    isVeg={item.isVeg}
                    price={item.price}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        height: 240,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        borderWidth: 2,
        borderColor:colors.WHITE_GRADIENT,
        marginHorizontal: dynamicSize(10),
        marginTop: 10,
        shadowOffset: {
            width: dynamicSize(5),
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
});

export default OrderItems;
