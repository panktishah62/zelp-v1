import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import SearchInput from '../Inputs/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HeaderWithTitleAndSearch = props => {
    const {
        navigation,
        text,
        setText,
        placeholder,
        keyboardType,
        title,
        onBack,
        search,
        onFocus,
    } = props;

    const dispatch = useDispatch();
    const location = useSelector(state => state.address.location);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            setLatitude(location.latitude);
            setLongitude(location.longitude);
        }
    }, [location]);

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
                        if (onBack) {
                            onBack();
                        }
                        navigation.goBack();
                    }}>
                    <BackButton />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.searchBar}>
                <SearchInput
                    text={text}
                    setText={setText}
                    params={{
                        latitude: location?.latitude,
                        longitude: location?.longitude,
                    }}
                    placeholder="Search Food, Restaurants"
                    keyboardType={'default'}
                    width={dimensions.fullWidth * 0.9}
                    navigation={navigation}
                    enableInput={true}
                    search={search}
                    onFocus={onFocus}
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
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
    },
    button: {
        padding: 10,
    },
    title: {
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    searchButton: {
        marginLeft: 10,
    },
});

export default HeaderWithTitleAndSearch;
