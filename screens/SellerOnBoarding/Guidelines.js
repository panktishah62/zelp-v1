import React, { useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import { useDispatch } from 'react-redux';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
const RenderGuidelines = ({ item }) => {
    return (
        <View style={styles.guideContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.guideDesc}>{item.guideline}</Text>
        </View>
    );
};

const guideLineText = [
    {
        title: 'Ship within 2 business days',
        guideline:
            'Please ship items within 2 business days after a show has ended or when an item is sold.',
    },
    {
        title: 'Package items safely',
        guideline:
            "Package items you sell with car and in protective material to ensure they don't get damaged.",
    },
    {
        title: 'Do not sell counterfeits',
        guideline:
            "Don't sell fake items on Whatnot. If you're unsure of an items authenticity - don't sell it.",
    },
    {
        title: "Don't lie about an item",
        guideline:
            "Don't mislead a buyer about an item's value, condition or anything else.",
    },
    {
        title: 'Be nice',
        guideline:
            "Make sure you treat everyone with respect, and don't harass or bully anyone in the community.",
    },
    {
        title: 'Agreeing to the Terms of Service',
        guideline:
            'By agreeing to the rules and providing my phone number to Whatnot, I agree and acknowledge that Whatnot may text my number to confirm submission of my application and notify me if selected.',
    },
];

const GuidelinesScreen = props => {
    const { navigation, route } = props;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView>
                    <View styles={styles.mainCon}>
                        <Text style={styles.heading}>
                            Hey username, {'\n'}
                            Let's start selling on Zelp.
                        </Text>
                        <Text style={styles.heading2}>A few Guidelines...</Text>

                        <View style={styles.innerGuideContainer}>
                            {guideLineText &&
                                guideLineText.map((guide, index) => {
                                    return (
                                        <RenderGuidelines
                                            item={guide}
                                            key={index}
                                        />
                                    );
                                })}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Got it !'}
                        pressHandler={() =>
                            navigation.navigate('SellerCategory')
                        }
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    guideContainer: {
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    innerGuideContainer: {
        marginBottom: dynamicSize(100),
    },
    title: {
        ...fonts.NUNITO_700_16,
        color: colors.BLACK,
    },
    guideDesc: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
    },
    heading: {
        ...fonts.NUNITO_800_28,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(20),
        marginBottom: dynamicSize(30),
    },
    heading2: {
        ...fonts.NUNITO_700_24,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    buttonEnd: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        position: 'relative',
        height: 200,
        width: dimensions.fullWidth,
        backgroundColor: colors.BLACK,
    },
    stickyContainer: {
        flex: 1,
        height: 100,
        backgroundColor: colors.WHITE,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});

export default GuidelinesScreen;
