import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { dimensions } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import WhiteButton from '../../components/Buttons/Subscription/WhiteButton';
import { showSubscriptionDetails } from '../../redux/services/subscriptionService';
import { useSelector } from 'react-redux';
import HeaderWithLocation from '../../components/Header/HeaderWithLocation';
import SubscriptionHomePage from './SubscriptionHomePage';
import SubscriptionPage from './SubscriptionPage';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import { colors } from '../../styles/colors';
import HeaderWithHome from '../../components/Header/HeaderWithHome';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = props => {
    const { navigation } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [userEnteredTo, setUserEnteredTo] = useState(null);
    const dynamicStyles = useSelector(state => state.dynamicStyles);
    const insets = useSafeAreaInsets();
    const fetchSubscriptionDetails = async () => {
        const response = await showSubscriptionDetails();
        if (response?.data?.data) {
            setUserEnteredTo('SubscriptionHomePage');
        } else {
            setUserEnteredTo('SubscriptionPage');
        }
        setIsLoading(false);
    };

    const handleNavigation = () => {
        setIsLoading(true);
        fetchSubscriptionDetails();
    };

    useEffect(() => {
        setUserEnteredTo(null);
    }, [currentOrder, isAuthenticated]);

    useEffect(() => {
        if (userEnteredTo === 'SubscriptionPage') {
            navigation.setOptions({
                header: () => (
                    <HeaderWithHome
                        navigation={navigation}
                        title={'Subscription'}
                        containerStyles={styles.headerContainerStyles}
                    />
                ),
            });
        } else if (userEnteredTo === 'SubscriptionHomePage') {
            navigation.setOptions({
                header: () => <View />,
            });
        } else {
            navigation.setOptions({
                header: () => <HeaderWithLocation navigation={navigation} />,
            });
        }
    }, [navigation, userEnteredTo]);

    return (
        <View style={styles.mainContainer}>
            {!isLoading && !userEnteredTo && (
                <View style={styles.imageScreen}>
                    <View style={styles.wrapper}>
                        <View
                            style={[
                                styles.homeBanner,
                                {
                                    height:
                                        dimensions.fullHeight -
                                        insets.bottom -
                                        insets.top -
                                        TAB_BAR_HEIGHT -
                                        dynamicStyles.headerWithLocationHeight,
                                },
                            ]}>
                            <Image
                                source={require('../../assets/images/Subscription/home.png')}
                                resizeMode="contain"
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <WhiteButton handleNavigation={handleNavigation} />
                </View>
            )}
            {!isLoading && userEnteredTo === 'SubscriptionHomePage' && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SubscriptionHomePage navigation={navigation} />
                </ScrollView>
            )}
            {!isLoading && userEnteredTo === 'SubscriptionPage' && (
                <SubscriptionPage navigation={navigation} />
            )}
            {isLoading && <ActivityIndicator size={32} color={colors.ORANGE} />}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: colors.WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.WHITE,
    },
    imageScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
    },
    homeBanner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainerStyles: {
        backgroundColor: 'transparent',
    },
    image: {
        flex: 1,
    },
});

export default Home;
