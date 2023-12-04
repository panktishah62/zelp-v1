import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import { showDrawer } from '../../redux/actions/drawer';

export const DrawerTest = props => {
    const handleOpenBottomSheet = () => {
        dispatch(
            showDrawer({
                navigateTo: 'Guidelines',
            }),
        );
    };

    const SubText = ({
        borderWidth,
        borderColor,
        text,
        size,
        color,
        family,
        letterSpacing,
        align = 'left',
        leading,
    }) => {
        return (
            <Text
                style={{
                    fontSize: size,
                    color: color,
                    fontFamily: family,
                    letterSpacing: letterSpacing ? letterSpacing : -0.02,
                    textAlign: align,
                    lineHeight: leading,
                    borderWidth: borderWidth,
                    borderColor: borderColor,
                }}>
                {text}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleOpenBottomSheet}
                style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#86827e',
                    paddingVertical: 12,
                    borderRadius: 8,
                }}>
                <SubText
                    text={'Open Drawer'}
                    color={'#86827e'}
                    size={16}
                    family={'PoppinsSBold'}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineBreak: {
        height: 1,
        borderWidth: 0.75,
        borderColor: colors.GRAY_30,
        width: dimensions.fullWidth - dynamicSize(45),
        alignItems: 'center',
        margin: 15,
    },
    bottomSheet: {
        position: 'absolute',
        height: dimensions.fullHeight * 0.22,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red',
    },
    drawerHeader: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    drawerHeading: {
        ...fonts.NUNITO_600_16,
        color: colors.BLACK,
    },
    buttonContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,

        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
        padding: 20,
    },
});
