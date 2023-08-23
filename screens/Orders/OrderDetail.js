import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    LogBox,
    SafeAreaView,
} from 'react-native';
import OrderCardDetail from '../../components/Cards/OrderDetailCard';
import HorizontalTextComponent from '../../components/HorizontalTextComponent';
import Hr from '../../components/Hr';
import { fonts, Styles } from '../../styles/index';
import { colors } from '../../styles/colors';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';

const OrderDetail = ({ route, navigation }) => {
    const { type, orderedBy, foodItems, placedAt, paymentData, address } =
        route.params;

    const orderDetails = [
        {
            name: 'OrderNumber',
            content: '63f8a917c8cde2fbfc8298d6',
        },

        {
            name: 'Payment',
            content: paymentData.status,
        },
        {
            name: 'Phone',
            content: 7845126385,
        },
        {
            name: 'Address',
            content: address.address,
        },
    ];

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <HeaderWithTitle navigation={navigation} title={'My Orders'} />
            <ScrollView>
                <OrderCardDetail
                    type={type}
                    orderedBy={orderedBy}
                    foodItems={foodItems}
                    placedAt={placedAt}
                    paymentData={{
                        status: paymentData.status.toLowerCase(),
                        deliveryFee: paymentData.deliveryPartnerFees,
                        deliveryTip: paymentData.deliveryTip,
                        taxes: paymentData.taxes,
                        commission: paymentData.commission,
                        totalAmount: paymentData.totalAmount,
                    }}
                />

                <View style={{ marginHorizontal: 10 }}>
                    <Text
                        style={[
                            fonts.NUNITO_700_14,
                            {
                                color: '#00000050',
                                marginVertical: 10,
                            },
                        ]}>
                        Bill Details
                    </Text>
                    <View
                        style={[
                            styles.billDetailsContainer,
                            styles.shadowStyle,
                        ]}>
                        <HorizontalTextComponent
                            leftText={'Item Total'}
                            leftTextStyle={styles.leftTextStyle}
                            rightText={`₹ ${paymentData.totalAmount}`}
                            rightTextStyle={styles.rightTextStyle}
                            pt={15}
                            pb={5}
                        />
                        <HorizontalTextComponent
                            leftText={'Delivery Fee'}
                            leftTextStyle={styles.leftTextStyle}
                            rightText={`₹ ${paymentData.deliveryFee}`}
                            rightTextStyle={styles.rightTextStyle}
                            pb={10}
                        />
                        <Hr height={1} bgColor={colors.BACKGROUND_WHITE} />
                        <HorizontalTextComponent
                            leftText={'Delivery Tip'}
                            leftTextStyle={styles.leftTextStyle}
                            rightText={`₹ ${paymentData.deliveryTip}`}
                            rightTextStyle={styles.rightTextStyle}
                            pt={17}
                            pb={5}
                        />
                        <HorizontalTextComponent
                            leftText={'Govt Taxes & Other Charges'}
                            leftTextStyle={styles.leftTextStyle}
                            rightText={`₹ ${paymentData.taxes}`}
                            rightTextStyle={styles.rightTextStyle}
                            pb={10}
                        />
                        <Hr height={1} bgColor={colors.BACKGROUND_WHITE} />
                        <HorizontalTextComponent
                            leftText={'Total'}
                            leftTextStyle={[
                                fonts.NUNITO_700_14,
                                {
                                    color: '#00000065',
                                },
                            ]}
                            rightText={`₹ ${paymentData.totalAmount}`}
                            rightTextStyle={[
                                fonts.NUNITO_800_14,
                                {
                                    color: '#00000065',
                                },
                            ]}
                            pt={17}
                            pb={5}
                        />
                        <HorizontalTextComponent
                            leftText={'Commission Earned'}
                            leftTextStyle={[
                                fonts.NUNITO_800_14,
                                {
                                    color: colors.ORANGE,
                                },
                            ]}
                            rightText={`₹ ${paymentData.commission}`}
                            rightTextStyle={[
                                fonts.NUNITO_700_14,
                                {
                                    color: colors.ORANGE,
                                },
                            ]}
                            pb={14}
                        />
                    </View>
                    <Text
                        style={[
                            fonts.NUNITO_700_16,
                            {
                                color: '#00000050',
                                marginVertical: 10,
                            },
                        ]}>
                        Order Details
                    </Text>
                    <View style={[styles.orderContainer, styles.shadowStyle]}>
                        {orderDetails.map((detail, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.sectionHeading}>
                                        {detail.name}
                                    </Text>
                                    <Text style={styles.sectionData}>
                                        {detail.content}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        paddingTop: 4,
    },
    shadowStyle: {
        shadowOffset: {
            width: 5,
            height: -5,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 4,
    },
    leftTextStyle: {
        ...fonts.NUNITO_700_14,
        color: '#00000090',
    },
    rightTextStyle: {
        ...fonts.NUNITO_800_14,
        color: colors.BLACK,
    },
    sectionHeading: {
        fontSize: 14,
        fontWeight: '700',
        color: '#00000065',
    },
    sectionData: {
        fontSize: 12,
        fontWeight: '500',
        color: '#00000065',
    },
    billDetailsContainer: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 7,
        borderRadius: 8,
    },
    orderContainer: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 7,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default OrderDetail;
