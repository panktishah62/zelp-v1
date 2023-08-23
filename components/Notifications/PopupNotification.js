import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

const PopupNotification = props => {
    Toast.show({
        type: props.type,
        text1: props.text1 ? props.text1 : '',
        text2: props.text2 ? props.text2 : '',
        autoHide: props.autoHide,
        position: props.position,
        style: styles.container,
        contentContainerStyle: styles.contentContainerStyle,
        text1Style: styles.text1Style,
        text2Style: styles.text2Style,
    });
};

const styles = StyleSheet.create({
    container: {},
    contentContainerStyle: {},
    text1Style: {},
    text2Style: {},
});

export default PopupNotification;
