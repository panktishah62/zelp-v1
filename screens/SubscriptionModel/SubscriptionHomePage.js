import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import LogoHeading from '../../components/Heading/Subscription/LogoHeading';
import SubscriptionDetailsHeading from '../../components/Heading/Subscription/SubscriptionDetailsHeading';
import TextLogo from '../../components/Buttons/Subscription/TextLogo';
import OrderNow from '../../components/Buttons/Subscription/OrderNow';
import SwitchButtons from '../../components/Buttons/Subscription/SwitchButtons';
import QuickCheckout from '../../components/Cards/Subscription/QuickCheckout';
import ManageOrders from '../../components/Carousel/Subscription/ManageOrders';
import { useDispatch, useSelector } from 'react-redux';
import AbsoluteOrangeButton from '../../components/Buttons/Subscription/AbsoluteOrangeButton';
import {
    getBestSellerFoodItems,
    getOrderHistory,
    getQuickCheckoutItems,
    showSubscriptionDetails,
} from '../../redux/services/subscriptionService';
import {
    finalPlanDetails,
    setSubscriptionDetails,
} from '../../redux/actions/subscriptionActions';
import { colors } from '../../styles/colors';
import { dimensions } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import KnowMoreModal from '../../components/Modal/Subscription/KnowMoreModal';

const SubscriptionHomePage = props => {
    const [firstActive, setFirstActive] = useState(true);
    const [secondActive, setSecondActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingForCheckoutItems, setIsLoadingForCheckoutItems] =
        useState(true);
    const [isLoadingForOrderHistory, setIsLoadingForOrderHistory] =
        useState(true);
    const { selectedItem } = useSelector(state => state.subscriptionCart);
    const location = useSelector(state => state.address.location);
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const [isModalVisible, setModalVisible] = useState(false);
    const [infoData, setInfoData] = useState(null);

    const { navigation } = props;
    const toggleFirst = () => {
        if (firstActive) {
            return;
        }
        setFirstActive(!firstActive);
        setSecondActive(false);
    };
    const [subscribedUserDetails, setSubscribedUserDetails] = useState(null);
    const toggleSecond = () => {
        if (secondActive) {
            return;
        }
        setSecondActive(!secondActive);
        setFirstActive(false);
    };
    const { finalPrice } = useSelector(state => state.finalSubscriptionPrice);
    const dispatch = useDispatch();
    const [quickCheckoutItems, setQuickCheckoutItems] = useState([]);
    const [quickCheckoutNotAvailableItems, setQuickCheckoutNotAvailableItems] =
        useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    const getUserOrderHistory = async () => {
        if (subscriptionplanId && subscriptionplanId !== '') {
            const response = await getOrderHistory();
            setOrderHistory(response?.data?.data);
            setIsLoadingForOrderHistory(false);
        }
    };

    const fetchQuickCheckoutItems = async (lat, long) => {
        if (subscriptionplanId && subscriptionplanId !== '') {
            const response = await getQuickCheckoutItems(
                subscriptionplanId,
                lat,
                long,
            );
            setQuickCheckoutItems(response.data.combos);
            setQuickCheckoutNotAvailableItems(
                response?.data?.notAvailableCombos,
            );
            dispatch(
                finalPlanDetails({ planID: subscriptionplanId, finalPrice }),
            );
            setIsLoadingForCheckoutItems(false);
        }
    };
    const [subscriptionplanId, setSubscriptionPlanId] = useState('');
    const [subscriptionOrder, setSubscriptionOrder] = useState([]);
    const UserSubscriptionDetails = async (lat, long) => {
        const response = await showSubscriptionDetails(lat, long);

        setSubscribedUserDetails(response?.data?.data);
        setSubscriptionOrder(response?.data?.subscriptionOrder);
        setSubscriptionPlanId(response?.data?.data?.subscriptionPlan._id);
        // dispatch(setSubscriptionDetails(response.data.data._id));
        setIsLoading(false);
    };

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            setIsLoading(true);
            UserSubscriptionDetails(location?.latitude, location?.longitude);
        }
    }, [
        setSubscriptionOrder,
        setSubscribedUserDetails,
        setSubscriptionPlanId,
        currentOrder,
        navigation,
    ]);

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            setIsLoadingForCheckoutItems(true);
            setIsLoadingForOrderHistory(true);
            fetchQuickCheckoutItems(location?.latitude, location?.longitude);
            getUserOrderHistory();
        }
    }, [
        setQuickCheckoutItems,
        subscriptionplanId,
        location?.latitude,
        currentOrder,
        navigation,
    ]);

    const toggleModal = item => {
        if (isModalVisible) {
            setInfoData(null);
        } else {
            setInfoData(item);
        }
        setModalVisible(!isModalVisible);
    };

    const handleKnowMore = item => {
        toggleModal(item);
    };

    return (
        subscribedUserDetails && (
            <View style={styles.scrollView}>
                {!isLoading && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <LogoHeading
                                text="Froker Subscription"
                                navigation={navigation}
                            />
                            <SubscriptionDetailsHeading
                                name={
                                    subscribedUserDetails?.subscriptionPlan.name
                                }
                                details={subscribedUserDetails?.validity}
                                data={subscribedUserDetails?.subscriptionPlan}
                            />
                            <TextLogo />
                            <ManageOrders
                                orderArray={subscriptionOrder}
                                validity={subscribedUserDetails?.validity}
                            />
                            <OrderNow
                                subscriptionDetails={subscribedUserDetails}
                                navigation={navigation}
                            />
                            <SwitchButtons
                                firstActive={firstActive}
                                secondActive={secondActive}
                                toggleFirst={toggleFirst}
                                toggleSecond={toggleSecond}
                            />
                            <QuickCheckout
                                navigation={navigation}
                                QuickCheckoutArray={subscriptionOrder}
                                bestSellerItemCard={quickCheckoutItems}
                                quickCheckoutNotAvailableItems={
                                    quickCheckoutNotAvailableItems
                                }
                                firstActive={firstActive}
                                secondActive={secondActive}
                                orderHistory={orderHistory}
                                isLoadingForCheckoutItems={
                                    isLoadingForCheckoutItems
                                }
                                isLoadingForOrderHistory={
                                    isLoadingForOrderHistory
                                }
                                handleKnowMore={handleKnowMore}
                            />
                        </View>
                    </ScrollView>
                )}
                {isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            color={colors.ORANGE_WHITE}
                            size={32}
                        />
                    </View>
                )}
                {!isLoading && selectedItem && (
                    <AbsoluteOrangeButton
                        navigation={navigation}
                        text={'Proceed to checkout'}
                    />
                )}
                <KnowMoreModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    data={infoData}
                />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    scrollView: {
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    activityIndicator: {
        marginTop: dynamicSize(100),
    },
});

export default SubscriptionHomePage;
