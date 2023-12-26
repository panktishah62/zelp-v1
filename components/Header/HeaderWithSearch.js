import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import CartButton from '../Buttons/CartButton';
import SearchInput from '../Inputs/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HeaderWithSearch = props => {
    const { navigation, text, setText, placeholder, keyboardType } = props;
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                Styles.center,
                styles.mainContainer,
                { paddingTop: insets.top },
            ]}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackButton />
                </TouchableOpacity>
                <SearchInput
                    text={text}
                    setText={setText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    width={dimensions.fullWidth *0.8}
                    navigation={navigation}
                    enableInput={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
    },
    container: {
        marginVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: dimensions.fullWidth,
    },
    button: {
        // backgroundColor: colors.GREEN,
        // width: 20,
        // padding: 10,
    },
});

export default HeaderWithSearch;
