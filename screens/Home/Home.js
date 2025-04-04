import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    Animated,
    ActivityIndicator,
    Platform,
    ScrollView,
} from 'react-native';

import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import Explore from './Explore';
import { useDispatch, useSelector } from 'react-redux';
import { GRANTED } from '../../utils';
import LocationPermission from '../../components/Buttons/LocationPermission';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import HomeTopNavigation from '../../navigation/HomeTopNavigation';

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const location = useSelector(state => state.address.location);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            setLatitude(location.latitude);
            setLongitude(location.longitude);
        }
    }, [location]);
    const dynamicStyles = useSelector(state => state.dynamicStyles);

    return (
        <View style={[styles.container]}>
            <ScrollView
                style={[
                    styles.scrollView,
                    // {
                    //     height:
                    //         dimensions.fullHeight -
                    //         // insets.top -
                    //         insets.bottom -
                    //         TAB_BAR_HEIGHT -
                    //         dynamicStyles.headerWithLocationHeight,
                    // },
                ]}
                bounces={true}
                // pagingEnabled={true}
            >
            <View style={styles.exploreContainer}>
                <HomeTopNavigation navigation={navigation} />

                {locationPermission === GRANTED &&
                    (!latitude || !longitude) && (
                        <View styles={styles.activityIndicator}>
                            <ActivityIndicator
                                size="large"
                                color={colors.ORANGE}
                            />
                        </View>
                    )}
            </View>
            <LocationPermission locationPermission={locationPermission} />
            </ScrollView>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dimensions.fullHeight * 0.3,
    },
    scrollView: {
        flex: 1,
        // position: 'absolute',
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        backgroundColor: colors.BLACK,
    },
    exploreContainer: {
        backgroundColor: colors.BLUE_DARK,
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
    },
};

export default HomeScreen;
