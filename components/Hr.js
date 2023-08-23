import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Styles } from '../styles';

const Hr = ({ height, bgColor }) => {
    return (
        <View style={Styles.center}>
            <View
                style={{
                    height: height,
                    width: '100%',
                    backgroundColor: bgColor,
                }}></View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Hr;
