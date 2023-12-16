import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles/colors';
import InfoCard from '../../components/Cards/InfoCard';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import Mail from '../../assets/icons/mail.svg';
import Phone from '../../assets/icons/phone-outgoing.svg';
import { useSelector } from 'react-redux';
import ReferralCard from '../../components/Cards/ReferralCard';
import { dimensions, fonts } from '../../styles';
import { getUserReferralCodeDetails } from '../../redux/services/referralService';
import { dynamicSize } from '../../utils/responsive';
import ReferralProgressCard from '../../components/Cards/ReferralProgressCard';
import Currency from '../../components/Currency';

const ReferralScreen = ({ navigation }) => {
    const [referralDetails, setReferralDetails] = useState();
    const userProfile = useSelector(state => state.user.userProfile);
    const fetchData = async () => {
        await getUserReferralCodeDetails()
            .then(response => response.data)
            .then(data => {
                setReferralDetails(data);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.cardContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Referral Code!</Text>
                <Text style={styles.subtitleText}>
                    Share the Referral Code To your friends and family to Earn
                    Coins!
                </Text>
            </View>

            {referralDetails ? (
                <>
                    <ReferralCard referralDetails={referralDetails} />
                    <ReferralProgressCard referralDetails={referralDetails} />
                    <View
                        style={{
                            marginBottom: 30,
                        }}>
                        <View style={styles.listContainer}>
                            <View style={styles.pointers} />
                            <Text
                                style={{
                                    ...fonts.NUNITO_700_14,
                                    width: dimensions.fullWidth - 100,
                                    color: colors.GREY_DARK,
                                }}>
                                Total Amount Earned by referral is{' '}
                                {referralDetails?.totalAmountEarned} Coins
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            <View style={styles.pointers} />
                            <Text
                                style={{
                                    ...fonts.NUNITO_700_14,
                                    width: dimensions.fullWidth - 100,
                                    color: colors.GREY_DARK,
                                }}>
                                Number of users who used your referral for
                                signup are {referralDetails?.referralUsedCount}
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            <View style={styles.pointers} />
                            <Text
                                style={{
                                    ...fonts.NUNITO_700_14,
                                    width: dimensions.fullWidth - 100,
                                    color: colors.GREY_DARK,
                                }}>
                                The User who use this referral code will also
                                earn {referralDetails?.addToReceiverWallet}{' '}
                                Coins.
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            <View style={styles.pointers} />
                            <Text
                                style={{
                                    ...fonts.NUNITO_700_14,
                                    width: dimensions.fullWidth - 100,
                                    color: colors.GREY_DARK,
                                }}>
                                {1 / userProfile?.referralCoinsMultiple}{' '}
                                Referral Coins = 1{' '}
                                <Currency currency={userProfile?.currency} />
                            </Text>
                        </View>
                    </View>
                </>
            ) : (
                <View>
                    <ActivityIndicator color={colors.ORANGE} size={32} />
                </View>
            )}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.WHITE,
    },
    cardContainer: {
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        padding: 20,
    },
    titleText: {
        ...fonts.NUNITO_700_24,
        color: colors.BLACK,
        textAlign: 'center',
    },
    subtitleText: {
        ...fonts.NUNITO_700_16,
        color: colors.BLACK,
        textAlign: 'center',
        padding: 10,
    },
    listContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    pointers: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: colors.ORANGE,
        borderWidth: 2,
        backgroundColor: 'transparent',
        marginRight: 10,
    },
});
export default ReferralScreen;
