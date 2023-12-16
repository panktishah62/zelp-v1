import React, { useState, useRef } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../styles/colors';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import { dimensions, Styles } from '../../styles';
import { sliceText } from '../../utils';

const Menu = props => {
    const { showMenu, setShowMenu, menuData, handleButtonPress } = props;
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMenu}
                onRequestClose={() => {
                    setShowMenu(!showMenu);
                }}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <View style={styles.contentContainer}>
                            <ScrollView
                                contentContainerStyle={styles.scrollViewStyle}>
                                {menuData.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            handleButtonPress(item.index);
                                            setShowMenu(!showMenu);
                                        }}>
                                        {item.count > 0 && (
                                            <View style={styles.item}>
                                                <Text
                                                    style={
                                                        Styles.default_text_color
                                                    }>
                                                    {sliceText(
                                                        item.category,
                                                        20,
                                                    )}{' '}
                                                    ({item.count})
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowMenu(!showMenu)}
                        style={styles.closeButton}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.fullHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth * 0.85,
        borderTopWidth: 5,
        borderTopColor: colors.ORANGE,
        borderRadius: 8,
        maxHeight: dimensions.fullHeight * 0.4,
    },
    contentContainer: {
        padding: 20,
        width: dimensions.fullWidth * 0.85,
    },
    closeButton: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    item: {
        width: dimensions.fullWidth * 0.8,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY_BORDER,
    },
    scrollViewStyle: {
        // maxHeight: '100%',
        width: '100%',
    },
});

export default Menu;
