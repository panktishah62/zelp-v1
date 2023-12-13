import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
    Linking,
    AppState,
} from 'react-native';
import BackButton from '../../assets/icons/chevron-left.svg';
import DropDownButton from '../../assets/icons/chevron-down.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import Location from '../../assets/icons/map-pin.svg';
import UserIcon from '../../assets/icons/UserIcon.svg';
import SearchInput from '../Inputs/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkLocationPermission,
    DENIED,
    GRANTED,
    NEVER_ASK_AGAIN,
    requestLocationPermission,
    sliceText,
} from '../../utils';
import {
    getAllAddress,
    getDefaultAddress,
    getUserLocation,
} from '../../redux/actions/address';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartButton from '../Buttons/CartButton';
import { checkPermission } from '../../redux/actions/permissions';
import { setHeaderWithLocationHeight } from '../../redux/actions/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HeaderWithLocationAndSearch = props => {
    const { navigation, title, text, setText, placeholder, keyboardType } =
        props;
    const dispatch = useDispatch();

    const area = useSelector(state => state.address.area);
    const defaultAddress = useSelector(state => state.address.defaultAddress);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const isLocationOn = useSelector(state => state.permissions.isLocationOn);
    const [isLoading, setIsLoading] = useState(false);
    const [showRetry, setShowRetry] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(checkPermission());
        if (locationPermission === GRANTED) {
            setIsLoading(true);
            dispatch(getDefaultAddress(setIsLoading));
        }
    }, [navigation]);

    useEffect(() => {
        if (locationPermission === GRANTED) {
            setIsLoading(true);
            dispatch(getDefaultAddress(setIsLoading));
        }
    }, [navigation, locationPermission]);

    useEffect(() => {
        setIsLoading(true);
        if (area) {
            setIsLoading(false);
        } else {
            setShowRetry(false);
            const timer = setTimeout(() => {
                setShowRetry(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [navigation, area]);

    const retry = () => {
        setShowRetry(false);
        setIsLoading(true);
        dispatch(checkPermission());
        if (locationPermission === GRANTED && isLocationOn) {
            setIsLoading(true);
            dispatch(getDefaultAddress(setIsLoading));
        }
    };

    const requestPermission = () => {
        // checkLocationPermission(setPermission);
        dispatch(checkPermission());
    };

    const onLayout = event => {
        if (event?.nativeEvent?.layout?.height) {
            dispatch(
                setHeaderWithLocationHeight(event.nativeEvent.layout.height),
            );
        }
    };

    const insets = useSafeAreaInsets();

    const handleAppStateChange = state => {
        if (state === 'active' && locationPermission != GRANTED && !isLoading) {
            setIsLoading(true);
            dispatch(checkPermission());
            dispatch(getDefaultAddress(setIsLoading));
        } else if (state === 'active') {
            dispatch(checkPermission());
        }
    };
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange,
        );

        return () => {
            subscription.remove();
        };
    }, [locationPermission]);

    return (
        <View
            style={[
                Styles.center,
                styles.mainContainer,
                { paddingTop: insets.top },
            ]}
            onLayout={e => onLayout(e)}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.addressButton}
                    onPress={() => {
                        if (locationPermission === GRANTED) {
                            dispatch(getAllAddress());
                            navigation.navigate('Address');
                        } else if (locationPermission === DENIED) {
                            requestPermission();
                        } else if (locationPermission === NEVER_ASK_AGAIN) {
                            Linking.openSettings();
                        }
                    }}>
                    <View style={styles.locationIcon}>
                        <Location />
                    </View>
                    {locationPermission === GRANTED &&
                        defaultAddress &&
                        defaultAddress.name &&
                        !isLoading && (
                            <View>
                                <View style={styles.address}>
                                    <Text
                                        style={[
                                            fonts.NUNITO_700_14,
                                            Styles.default_text_color,
                                        ]}>
                                        {defaultAddress.name}
                                    </Text>
                                    <DropDownButton />
                                </View>

                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        Styles.default_text_color,
                                    ]}>
                                    {sliceText(area, 40)}
                                </Text>
                            </View>
                        )}
                    {locationPermission === GRANTED &&
                        !defaultAddress &&
                        area &&
                        !isLoading && (
                            <View>
                                <View style={styles.address}>
                                    <Text
                                        style={[
                                            fonts.NUNITO_700_14,
                                            Styles.default_text_color,
                                        ]}>
                                        Current Location
                                    </Text>
                                    <DropDownButton />
                                </View>

                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        Styles.default_text_color,
                                    ]}>
                                    {sliceText(area, 40)}
                                </Text>
                            </View>
                        )}
                    {(locationPermission === GRANTED &&
                        !defaultAddress.address &&
                        !area &&
                        isLoading) ||
                        (isLoading && locationPermission != NEVER_ASK_AGAIN && (
                            <View style={Styles.row_flex_start}>
                                <View style={styles.address}>
                                    <Text
                                        style={[
                                            fonts.NUNITO_700_14,
                                            Styles.default_text_color,
                                        ]}>
                                        Searching For You...
                                    </Text>
                                </View>
                                {showRetry && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            retry();
                                        }}>
                                        <Text style={styles.retryButton}>
                                            Retry
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    {locationPermission === DENIED && (
                        <View>
                            <View style={styles.locationPermission}>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        Styles.default_text_color,
                                    ]}>
                                    Give Location Permission...
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        { color: colors.BLUE_DARK },
                                    ]}>
                                    Tap Here
                                </Text>
                            </View>
                        </View>
                    )}
                    {locationPermission === NEVER_ASK_AGAIN && (
                        <View>
                            <View style={styles.locationPermission}>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        Styles.default_text_color,
                                    ]}>
                                    Give Location Permission and
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        Styles.default_text_color,
                                    ]}>
                                    reopen the app
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_12,
                                        { color: colors.BLUE_DARK },
                                    ]}>
                                    Tap Here
                                </Text>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <UserIcon height="35" width="35" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate('SearchStack');
                    }}>
                    <SearchInput
                        text={text}
                        setText={setText}
                        placeholder="Search Food, Restaurants, Frokers"
                        keyboardType={keyboardType}
                        width={dimensions.fullWidth * 0.8}
                        navigation={navigation}
                        enableInput={false}
                    />
                </TouchableWithoutFeedback>
                <CartButton navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
    },
    container: {
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressButton: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        width: dimensions.fullWidth * 0.8,
    },
    title: {
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
    },
    address: {
        flexDirection: 'row',
        maxWidth: dimensions.fullWidth * 0.6,
    },
    locationIcon: {
        padding: 10,
    },
    userButton: {
        padding: 10,
        paddingRight: 15,
        alignItems: 'center',
        width: dimensions.fullWidth * 0.2,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: dimensions.fullWidth,
    },
    locationPermission: {
        maxWidth: dimensions.fullWidth * 0.6,
    },
    retryButton: {
        ...fonts.NUNITO_500_12,
        color: colors.BLUE_DARK,
        marginHorizontal: 10,
    },
});

export default HeaderWithLocationAndSearch;
