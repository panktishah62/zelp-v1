import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../styles/colors';
import InfoCard from '../../components/Cards/InfoCard';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import Mail from '../../assets/icons/mail.svg';
import Phone from '../../assets/icons/phone-outgoing.svg';
import { useSelector } from 'react-redux';

const HelpAndSupportScreen = ({ navigation }) => {
    const serverData = useSelector(state => state.serverReducer);
    const userProfile = useSelector(state => state?.user?.userProfile);
    const countryCodeConfig = serverData?.config?.countryCodeConfig;
    const contactNo =
        countryCodeConfig &&
        Object.keys(countryCodeConfig).includes(userProfile?.countryCode)
            ? countryCodeConfig[userProfile?.countryCode].supportContactNo
            : serverData?.config?.contactNo;
    const emailId =
        countryCodeConfig &&
        Object.keys(countryCodeConfig).includes(userProfile?.countryCode)
            ? countryCodeConfig[userProfile?.countryCode].supportEmailId
            : serverData?.config?.emailId;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
                <InfoCard
                    text={contactNo}
                    image={<Phone />}
                    type={'CONTACT_NUM'}
                />
                <InfoCard text={emailId} image={<Mail />} type={'EMAILID'} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        paddingTop: 15,
    },
    cardContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});
export default HelpAndSupportScreen;
