import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { dimensions } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import WhiteButton from '../../components/Buttons/Subscription/WhiteButton';
import { showSubscriptionDetails } from '../../redux/services/subscriptionService';

const Home = props => {
    const { navigation } = props;
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const fetchSubscriptionDetails = async () => {
        const response = await showSubscriptionDetails();
        // console.log(response.data.data,"response.data")
        setSubscriptionDetails(response.data.data);
    };

    useEffect(() => {
        fetchSubscriptionDetails();
    }, [setSubscriptionDetails]);

    const handleNavigation = () => {
        if (!subscriptionDetails) {
            navigation.navigate('SubscriptionPage');
        } else {
            navigation.navigate('SubscribedUserHome');
        }
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <View style={styles.homeBanner}>
                        <Image
                            source={require('../../assets/images/Subscription/home.png')}
                        />
                    </View>
                </View>
                <WhiteButton handleNavigation={handleNavigation} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeBanner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: dimensions.fullWidth - dynamicSize(40),
    },
});

export default Home;
