import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import MenuIcon from '../../assets/icons/menu.svg';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

const MenuButton = props => {
    const {  setShowMenu, setRenderMenu } = props;
    return (
        <TouchableOpacity
            style={styles.menu}
            onPress={() => {
                setRenderMenu(true);
                setShowMenu(true);
            }}>
            <MenuIcon />
            <Text style={styles.text}>Menu</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 9,
        height: 50,
        width: 120,
        backgroundColor: colors.ORANGE,
        elevation: 6,
        shadowColor:colors.ORANGE_GRADIENT_DARK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.42,
        shadowRadius: 9,
        borderWidth: 1,
        borderColor: colors.WHITE,
    },
    text: {
        paddingLeft: 5,
        color: colors.WHITE,
        ...fonts.NUNITO_800_14,
    },
});

export default MenuButton;
