import React, { useState } from 'react';
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
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import { CreditCardInput } from 'react-native-credit-card-input';
import { useDispatch } from 'react-redux';
import { addPaymentDetailsSeller } from '../../redux/actions/auction';

// {"status": {"cvc": "valid", "expiry": "valid", "number": "valid"}, "valid": true, "values": {"cvc": "874", "expiry": "10/26", "number": "4160 2106 0221 0091", "type": "visa"}}
const SellerPaymentsScreen = props => {
    const { navigation, route } = props;
    const [enableSubmit, setEnableSubmit] = useState(true);
    const [cardVal, setCardVal] = useState(null);
    const dispatch = useDispatch();

    const _onChange = form => {
        if (form.valid) {
            setEnableSubmit(false);
            setCardVal(form);
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView stickyHeaderIndices={[2]}>
                    <View styles={styles.mainCon}>
                        <Text style={styles.heading}>
                            Where would you like to recieve your payment ?
                        </Text>

                        <CreditCardInput onChange={_onChange} />
                        {/* // or */}
                        {/* <LiteCreditCardInput onChange={this._onChange} /> */}
                        <View style={styles.imageUploadContainer}></View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Next'}
                        pressHandler={() => {
                            console.log(cardVal);
                            dispatch(addPaymentDetailsSeller(cardVal));
                            navigation.navigate('SellerAddress');
                        }}
                        // disabled={enableSubmit}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        // backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
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
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    imageUploadContainer: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(10),
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

export default SellerPaymentsScreen;
