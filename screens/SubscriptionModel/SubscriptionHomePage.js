import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
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
    showSubscriptionDetails,
} from '../../redux/services/subscriptionService';
import { finalPlanDetails, setSubscriptionDetails } from '../../redux/actions/subscriptionActions';

const SubscriptionHomePage = props => {
    const [firstActive, setFirstActive] = useState(true);
    const [secondActive, setSecondActive] = useState(false);
    const { isSelectedAny } = useSelector(
        state => state.subscriptionSelectMenu,
    );

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
    const { planID, finalPrice } = useSelector(state => state.finalSubscriptionPrice);
    console.log(planID, 'planID,finalPrice');
    const dispatch = useDispatch();
    const [bestSellerItemArray, setBestSellerItemArray] = useState([]);
    const fetcheBestSellerItems = async () => {

        if (subscriptionplanId !== '') {
            console.log(subscriptionplanId, "fdsnfsdk")
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            let type;

            if (
                (currentHour === 6 && currentMinutes >= 0 && currentMinutes < 60) ||
                (currentHour === 7 && currentMinutes >= 0 && currentMinutes < 60) ||
                (currentHour === 8 && currentMinutes >= 0 && currentMinutes < 60)
            ) {
                type = 'Breakfast';
            } else if (
                (currentHour === 12 &&
                    currentMinutes >= 0 &&
                    currentMinutes < 60) ||
                (currentHour === 13 &&
                    currentMinutes >= 0 &&
                    currentMinutes < 60) ||
                (currentHour === 14 &&
                    currentMinutes >= 0 &&
                    currentMinutes < 60) ||
                (currentHour === 15 && currentMinutes >= 0 && currentMinutes < 60)
            ) {
                type = 'Lunch';
            } else {
                type = 'Dinner';
            }
            console.log(type, 'planID,type');
            const response = await getBestSellerFoodItems(subscriptionplanId, type);
            // console.log(response.data, 'response.data');
            setBestSellerItemArray(response.data);
            dispatch(finalPlanDetails({ planID: subscriptionplanId, finalPrice }))
        }
    };
    const [subscriptionplanId, setSubscriptionPlanId] = useState('');
    const [subscriptionOrder, setSubscriptionOrder] = useState([]);
    const UserSubscriptionDetails = async () => {
        const response = await showSubscriptionDetails();
        console.log(response.data.subscriptionOrder, 'response.data now');
        setSubscribedUserDetails(response?.data?.data);
        console.log(response.data.data.subscriptionPlan, "My own subscriptionPlanId")
        setSubscriptionOrder(response?.data?.subscriptionOrder);
        setSubscriptionPlanId(response.data.data.subscriptionPlan._id)
        dispatch(setSubscriptionDetails(response.data.data._id))
    };
    // console.log(subscribedUserDetails,"now")

    useEffect(() => {
        UserSubscriptionDetails();
    }, [setSubscriptionOrder, setSubscribedUserDetails, finalPrice, subscriptionplanId]);

    useEffect(() => {

        fetcheBestSellerItems();

    }, [setBestSellerItemArray, subscriptionplanId]);

    return (
      subscribedUserDetails &&  <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <LogoHeading text="Froker Subscription" />
                    <SubscriptionDetailsHeading name={subscribedUserDetails?.subscriptionPlan.name} details={subscribedUserDetails?.validity[0]}/>
                    <TextLogo />
                    <ManageOrders orderArray={subscriptionOrder} />
                    <OrderNow navigation={navigation} />
                    <SwitchButtons
                        firstActive={firstActive}
                        secondActive={secondActive}
                        toggleFirst={toggleFirst}
                        toggleSecond={toggleSecond}
                    />
                    <QuickCheckout
                        navigation={navigation}
                        QuickCheckoutArray={subscriptionOrder}
                        bestSellerItemCard={bestSellerItemArray}
                        firstActive={firstActive}
                        secondActive={secondActive}
                    />
                </View>
            </ScrollView>
            {isSelectedAny && (
                <AbsoluteOrangeButton
                    navigation={navigation}
                    text={'Proceed to checkout'}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default SubscriptionHomePage;
