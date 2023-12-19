import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
    Linking,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import HeartIcon from '../../assets/ZelpIcons/HeartIcon.svg';
import NotificationIcon from '../../assets/ZelpIcons/NotificationIcon.svg';
import SearchInput from '../Inputs/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { GRANTED } from '../../utils';
import { getDefaultAddress } from '../../redux/actions/address';
import { checkPermission } from '../../redux/actions/permissions';
import { setHeaderWithLocationHeight } from '../../redux/actions/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';
import ShoppingBagButton from '../Buttons/ShoppingBagButton';
import UserIcon from '../../assets/icons/UserIcon.svg';

const HeaderWithActionButtons = props => {
    const { navigation, title, text, setText, placeholder, keyboardType } =
        props;
    const dispatch = useDispatch();
    const area = useSelector(state => state.address.area);
    const defaultAddress = useSelector(state => state.address.defaultAddress);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
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
        if (locationPermission === GRANTED) {
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

    return (
        <View
            style={[
                Styles.center,
                styles.mainContainer,
                { paddingTop: insets.top },
            ]}
            onLayout={e => onLayout(e)}>
            <View style={styles.container}>
                <View style={styles.AppIcon}>
                    <Text style={styles.AppName}> Zelp</Text>
                </View>
                <View style={styles.actionButtonViewStyle}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}>
                        <NotificationIcon height="22" width="22" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}>
                        <HeartIcon height="22" width="22" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}>
                        <ShoppingBagButton navigation={navigation} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <UserIcon height="35" width="35" />
                </TouchableOpacity> */}
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
                        width={dimensions.fullWidth * 0.9}
                        navigation={navigation}
                        enableInput={false}
                    />
                </TouchableWithoutFeedback>
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
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        // backgroundColor: colors.BLUE_DARK
    },
    AppName: {
        ...fonts.NUNITO_600_20,
    },
    AppIcon: {
        alignItems: 'flex-start',
    },

    actionButtonViewStyle: {
        flexDirection: 'row',
    },
    userButton: {
        padding: 10,
        paddingRight: 15,
        alignItems: 'center',
        width: dimensions.fullWidth * 0.2,
    },
    actionButton: {
        padding: dynamicSize(10),
        // paddingRight: 15,
        // alignItems: 'center',
        // width: dimensions.fullWidth * 0.2,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: dimensions.fullWidth,
    },
});

export default HeaderWithActionButtons;