import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getSubscriptionModelData } from '../../redux/services/subscriptionModelService';
import MenuListing from '../../components/SubscriptionModel/MenuListing';
import SubscriptionModel from '../../components/SubscriptionModel/SubscriptionModel';
import IconButton from '../../components/Buttons/IconButton';
import { colors } from '../../styles/colors';
import { DialogTypes } from '../../utils';
import { dynamicSize } from '../../utils/responsive';
import { dimensions, fonts } from '../../styles';
import { showDialog } from '../../redux/actions/dialog';
import { useDispatch } from 'react-redux';

const SubscriptionPage = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [subscriptionPlans, setSubscriptionPlans] = useState();
    const [flexiPayPlan, setFlexiPayPlan] = useState();
    const [timings, setTimings] = useState();
    const [menu, setMenu] = useState();
    const [whatsappLink, setWhatsappLink] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await getSubscriptionModelData();
        if (response?.data) {
            setSubscriptionPlans(response?.data?.data?.subscriptionPlans);
            setFlexiPayPlan(response?.data?.data?.flexiPayPlan);
            setTimings(response?.data?.data?.timings);
            setMenu(response?.data?.data?.menu);
            setWhatsappLink(response?.data?.data?.whatsappLink);
        }
        setIsLoading(false);
    };

    const openLink = () => {
        if (whatsappLink) {
            Linking.openURL(whatsappLink)
                .then(data => {})
                .catch(() => {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Cannot Open WhatsApp',
                            subTitleText:
                                'WhatsApp is not installed on your device',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.ERROR,
                        }),
                    );
                });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return !isLoading ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {subscriptionPlans && flexiPayPlan && (
                <SubscriptionModel
                    subscriptionPlans={subscriptionPlans}
                    flexiPayPlan={flexiPayPlan}
                />
            )}
            <View>
                <View style={styles.whatsappContainer}>
                    <Text style={styles.headerText}>
                        We Have All What You Want!
                    </Text>
                </View>
                {menu && <MenuListing data={menu[0]} />}
                {menu && <MenuListing data={menu[1]} />}
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.whatsappContainer}>
                    <Text style={styles.titleText}>
                        🎉 Coming Soon, Stay Tuned! 🎉
                    </Text>
                    {/* <Text style={styles.headerText}>Get Started Now!</Text> */}
                </View>
                {/* <IconButton text="Join On Whatsapp" onClick={openLink} /> */}
            </View>
        </ScrollView>
    ) : (
        <ActivityIndicator color={colors.ORANGE} size={32} />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    buttonContainer: {
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dynamicSize(25),
    },
    headerText: {
        ...fonts.NUNITO_500_16,
        textAlign: 'center',
        color: colors.GREY_MEDIUM,
    },
    whatsappContainer: {
        marginBottom: dynamicSize(10),
    },
    titleText: {
        marginBottom: dynamicSize(10),
        ...fonts.NUNITO_500_24,
        color: colors.GREY_DARK,
    },
});
export default SubscriptionPage;
