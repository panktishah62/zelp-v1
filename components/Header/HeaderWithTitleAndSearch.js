import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../assets/icons/chevron-left.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import SearchInput from '../Inputs/SearchInput';
import SearchIcon from '../../assets/icons/Search.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';

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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    if (onBack) {
                        onBack();
                    }
                    navigation.goBack();
                }}>
                <BackButton />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => navigation.navigate('SearchStack')}>
                <SearchIcon />
            </TouchableOpacity>

            {/* <View style={styles.searchBar}>
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
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth,
        paddingHorizontal: 15,
        height: dynamicSize(50),
    },
    backButton: {
        // padding: 10,
    },
    title: {
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
        // alignSelf: 'center',
    },
    searchButton: {
        // backgroundColor: colors.BLUE_DARK,
        height: dynamicSize(40),
        width: dynamicSize(40),
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 10,
    },
});

export default HeaderWithTitleAndSearch;
