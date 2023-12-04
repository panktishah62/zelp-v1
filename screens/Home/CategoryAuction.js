import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { width } from '../../utils/responsive';
import LocationPermission from '../../components/Buttons/LocationPermission';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import { dynamicSize } from '../../utils/responsive';
import Explore from './Explore';
import { GRANTED } from '../../utils';
import { ActivityIndicator } from '../Shots/ShotsLoader';

const CategoryAuctionScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const location = useSelector(state => state.address.location);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const dynamicStyles = useSelector(state => state.dynamicStyles);

    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            setLatitude(location.latitude);
            setLongitude(location.longitude);
        }
    }, [location]);

    console.log('here');
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
                    <Explore
                        location={{ latitude, longitude }}
                        navigation={navigation}
                    />

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

export default CategoryAuctionScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: dimensions.fullHeight,
        // width: dimensions.fullWidth,
        // backgroundColor: 'blue',
        // paddingTop: 60,
        // marginBottom: 20,
        flex: 1,
        backgroundColor: colors.ORANGE,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dimensions.fullHeight * 0.3,
    },
    scrollView: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: dimensions.fullHeight,
        backgroundColor: 'transparent',
    },
    exploreContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
    },
});
