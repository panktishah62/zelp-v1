import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';

const BottomSheet = ({
    show,
    closePopup,
    children,
    haveOutsideTouch,
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
        bottom: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default BottomSheet;
