import React, { useRef } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { dimensions } from '../../styles';

const AlertModal = ({
    show,
    closePopup,
    haveOutsideTouch,
    children,

    size,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                        if (!haveOutsideTouch) return;
                        closePopup();
                    }}></Pressable>
                <View style={[styles.innerContainer, { height: size }]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000000AA' },
    innerContainer: {
        bottom: dimensions.fullHeight * 0.4,
        position: 'absolute',
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        alignSelf: 'center',
    },
});

export default AlertModal;
