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
import ArrowUp from '../../assets/icons/arrowup.svg';
import Float from '../../components/Float/Float';
import { LiveTrackingContainer } from '../../components/TrackOrder/LiveTrackingContainer';
import Explore from './Explore';
import { useDispatch, useSelector } from 'react-redux';
import { GRANTED } from '../../utils';
import LocationPermission from '../../components/Buttons/LocationPermission';
import ArrowDownIcon from '../../assets/icons/chevron-down.svg';
import { dynamicSize } from '../../utils/responsive';
import {
    useSafeAreaFrame,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import Landing from './Landing';

const height = dimensions.fullHeight;

let SWIPEUP_PANEL_HEIGHT = dynamicSize(100);

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
            <Float />
            <ScrollView
                style={[
                    styles.scrollView,
                    {
                        height:
                            dimensions.fullHeight -
                            // insets.top -
                            insets.bottom -
                            TAB_BAR_HEIGHT -
                            dynamicStyles.headerWithLocationHeight,
                    },
                ]}
                bounces={true}
                // pagingEnabled={true}
            >
                <View
                    style={[
                        styles.topView,
                        {
                            height:
                                dimensions.fullHeight -
                                // insets.top -
                                insets.bottom -
                                TAB_BAR_HEIGHT -
                                dynamicStyles.headerWithLocationHeight,
                        },
                    ]}>
                    <View style={styles.bottomView}>
                        <View style={styles.landingContainer}>
                            <Landing navigation={navigation} />
                        </View>
                    </View>
                    <View style={styles.swipeUpContainer}>
                        <View style={styles.swipeUp}>
                            <View style={styles.panelContent}>
                                <ArrowUp height={dynamicSize(20)} />
                                <Text style={styles.contentText}>
                                    Swipe Up To Explore More
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.exploreContainer}>
                    {locationPermission === GRANTED &&
                        latitude &&
                        longitude && (
                            <Explore
                                location={{ latitude, longitude }}
                                navigation={navigation}
                            />
                        )}
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

            <LiveTrackingContainer navigation={navigation} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.ORANGE,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    restaurantsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    panel: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: 180 + 50,
        borderTopRightRadius: 180 + 50,
        position: 'relative',
    },
    panelHeader: {
        height: SWIPEUP_PANEL_HEIGHT + 180 + 50,
        backgroundColor: 'transparent',
        padding: 24,
    },
    panelContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    contentText: {
        paddingTop: 0,
        ...fonts.NUNITO_600_10,
        ...Styles.default_text_color,
    },
    textHeader: {
        fontSize: 28,
        color: colors.BLACK,
    },
    swipeDown: {
        marginRight: 5,
        ...fonts.NUNITO_600_14,
        ...Styles.default_text_color,
    },
    commingSoon: {
        height: dimensions.fullHeight,
        alignItems: 'center',
        paddingTop: dimensions.fullHeight * 0.1,
    },
    commingSoonText: {
        ...fonts.NUNITO_800_14,
        paddingTop: 20,
        textAlign: 'center',
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dimensions.fullHeight * 0.3,
    },
    locationAccessDenied: {
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dimensions.fullHeight * 0.3,
    },
    swipeDownContainer: {
        flex: 1,
    },

    scrollView: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
    },
    topView: {
        backgroundColor: 'transparent',
        width: dimensions.fullWidth,
    },
    bottomView: {
        backgroundColor: 'transparent',
        flex: 0.85,
        flex: 1,
        bottom: 0,
    },
    swipeUpContainer: {
        backgroundColor: 'transparent',
        height: dimensions.fullWidth / 7,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeUp: {
        backgroundColor: colors.WHITE,
        position: 'absolute',
        height: dimensions.fullWidth * 2,
        borderRadius: dimensions.fullWidth,
        top: 0,
        width: dimensions.fullWidth * 2,
    },
    exploreContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
    },
};

export default HomeScreen;

// {/* <View
//                 style={{
//                     backgroundColor: colors.WHITE,
//                     minHeight: dimensions.fullHeight,
//                     position: 'absolute',
//                     width: dimensions.fullWidth,
//                 }}>
//                 <ScrollView
//                     style={{
//                         // top: 100,
//                         flex: 1,
//                         backgroundColor: colors.BLACK,
//                         // height: 300,
//                     }}>
//                     <View
//                         style={{
//                             minHeight: dimensions.fullHeight,
//                             width: dimensions.fullWidth,
//                             backgroundColor: colors.BLUE_DARK,
//                         }}></View>
//                     <View
//                         style={{
//                             minHeight: dimensions.fullHeight,
//                             width: dimensions.fullWidth,
//                             backgroundColor: colors.BLUE_LIGHT,
//                         }}></View>
//                     {/* <Text style={{ color: colors.WHITE }}>Hello</Text> */}
//                 </ScrollView>
//             </View> */}
