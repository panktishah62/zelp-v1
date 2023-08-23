import React from 'react';
import { View, StyleSheet } from 'react-native';

const Circle = ({ size, bgColor }) => {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: bgColor,
            }}></View>
    );
};

const styles = StyleSheet.create({});

export default Circle;
