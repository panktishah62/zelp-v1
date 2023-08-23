import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SearchIcon from '../../assets/icons/Search.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';

const SearchInput = props => {
    const {
        text,
        setText,
        params,
        placeholder,
        keyboardType,
        width,
        navigation,
        enableInput,
        search,
        onFocus,
    } = props;

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('SearchStack');
            }}>
            <View style={[styles.container, { width: width }]}>
                <View style={[styles.innerContainer, { width: width }]}>
                    {/* <SearchIcon style={styles.searchIcon} /> */}
                    <TextInput
                        style={styles.textContainerStyle}
                        placeholder={placeholder}
                        onChangeText={_text => {
                            setText(_text);
                            onFocus();
                        }}
                        placeholderTextColor={colors.GREY_MEDIUM}
                        keyboardType={keyboardType}
                        editable={enableInput}
                        selectTextOnFocus={enableInput}
                        onSubmitEditing={() => {
                            if (search) {
                                search(text, params);
                            } else {
                                navigation.navigate('SearchStack');
                            }
                        }}
                        onPressIn={() =>
                            !enableInput && navigation.navigate('SearchStack')
                        }
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (search) {
                                search(text, params);
                            } else {
                                navigation.navigate('SearchStack');
                            }
                        }}>
                        <SearchIcon style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth * 0.8,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: dimensions.fullWidth * 0.8,
        backgroundColor: colors.GREY_LIGHT,
        height: 46,
        borderRadius: 8,
    },
    textContainerStyle: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        margin: 5,
        color: colors.GREY_MEDIUM,
        backgroundColor: colors.GREY_LIGHT,
    },
    searchIcon: {
        marginHorizontal: 15,
    },
});

export default SearchInput;
