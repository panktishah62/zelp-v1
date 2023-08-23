import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Clock from '../../assets/icons/clock.svg';
import { colors } from '../../styles/colors';
import Ontheway from '../../assets/icons/on the way 1.svg';
import Preparing from '../../assets/icons/preparing your order 1.svg';
import Delivering from '../../assets/icons/delivered 1.svg';
import Cooking from '../../assets/icons/cooking.svg';
import Cycle from '../../assets/icons/Cycle.svg';
import AcceptedOrange from '../../assets/icons/acceptedOrange.svg';
import AcceptedGreen from '../../assets/icons/acceptedGreen.svg';
import PreparingGreen from '../../assets/icons/preparingGreen.svg';
import PreparingOrange from '../../assets/icons/preparingOrange.svg';
import PreparingGrey from '../../assets/icons/preparingGrey.svg';
import OnTheWayGrey from '../../assets/icons/onTheWayGrey.svg';
import OnTheWayOrange from '../../assets/icons/onTheWayOrange.svg';
import OnTheWayGreen from '../../assets/icons/onTheWayGreen.svg';
import DeliveredGrey from '../../assets/icons/deliveredGrey.svg';
import DeliveredOrange from '../../assets/icons/deliveredOrange.svg';

import { fonts, dimensions, Styles } from '../../styles';
import { useSelector } from 'react-redux';
import { getRandomInt } from '../../utils';
import ReverseTimer from '../Timer/ReverseTimer';
import { ORDER_BUFFER_TIME } from '../../redux/constants';

let changeColors1;
let changeColors2;
let changeColors3;
let changeColors4;
let textStatus;
let textStatus2;
let textStatus3;
let headerColor;
let smallheaderColor;
let Icon1;
let Icon2;
let Icon3;
let Icon4;

const OrderStatusComponent = props => {
    const { timeToDeliver } = props;
    const currentOrder = useSelector(
        state => state?.currentOrder?.currentOrder,
    );
    const startTimeToDeliver = useSelector(
        state => state?.currentOrder?.timeToDeliver,
    );
    const currentOrderState = useSelector(state => state?.currentOrder);
    const [status, setStatus] = useState(currentOrder?.orderStatus);
    useEffect(() => {
        if (currentOrder && currentOrder.orderStatus) {
            setStatus(currentOrder.orderStatus);
        }
    }, [currentOrder]);
    if (status === 'Placed') {
        changeColors1 = colors.ORANGE;
        changeColors2 = colors.GREY_DARK;
        changeColors3 = colors.GREY_DARK;
        changeColors4 = colors.GREY_DARK;
        headerColor = colors.ORANGE;
        smallheaderColor = colors.ORANGE;
        textStatus = 'Confirming With Restaurants';
        Icon1 = AcceptedOrange;
        Icon2 = PreparingGrey;
        Icon3 = OnTheWayGrey;
        Icon4 = DeliveredGrey;
    } else if (status === 'In Progress') {
        changeColors1 = colors.GREEN;
        changeColors2 = colors.ORANGE;
        changeColors3 = colors.GREY_DARK;
        changeColors4 = colors.GREY_DARK;
        textStatus = 'Preparing Your Order';
        headerColor = colors.ORANGE;
        smallheaderColor = colors.ORANGE;
        Icon1 = AcceptedGreen;
        Icon2 = PreparingOrange;
        Icon3 = OnTheWayGrey;
        Icon4 = DeliveredGrey;
    } else if (status === 'Out For Delivery') {
        changeColors1 = colors.GREEN;
        changeColors2 = colors.GREEN;
        changeColors3 = colors.ORANGE;
        changeColors4 = colors.GREY_DARK;
        textStatus = 'On The Way';
        headerColor = colors.ORANGE;
        smallheaderColor = colors.ORANGE;
        Icon1 = AcceptedGreen;
        Icon2 = PreparingGreen;
        Icon3 = OnTheWayOrange;
        Icon4 = DeliveredGrey;
    } else if (status === 'Driver Reached') {
        changeColors1 = colors.GREEN;
        changeColors2 = colors.GREEN;
        changeColors3 = colors.GREEN;
        changeColors4 = colors.ORANGE;
        headerColor = colors.GREEN;
        smallheaderColor = colors.GREEN;
        Icon1 = AcceptedGreen;
        Icon2 = PreparingGreen;
        Icon3 = OnTheWayGreen;
        Icon4 = DeliveredOrange;
        textStatus = 'Driver Reached';
    } else if (status === 'Canceled') {
        changeColors1 = colors.GREY_DARK;
        changeColors2 = colors.GREY_DARK;
        changeColors3 = colors.GREY_DARK;
        changeColors4 = colors.ORANGE;
        headerColor = colors.RED;
        smallheaderColor = colors.RED;
        Icon1 = AcceptedGreen;
        Icon2 = PreparingGrey;
        Icon3 = OnTheWayGrey;
        Icon4 = DeliveredGrey;
        textStatus = 'Order Canceled';
    } else if (status === 'Completed') {
        changeColors1 = colors.GREEN;
        changeColors2 = colors.GREEN;
        changeColors3 = colors.GREEN;
        changeColors4 = colors.ORANGE;
        headerColor = colors.GREEN;
        smallheaderColor = colors.GREEN;
        Icon1 = AcceptedGreen;
        Icon2 = PreparingGreen;
        Icon3 = OnTheWayGreen;
        Icon4 = DeliveredOrange;
        textStatus = 'Order Completed';
    }
    return (
        <View>
            <View
                style={[
                    styles.mainContainer,
                    { backgroundColor: headerColor },
                ]}>
                <View>
                    <Text style={styles.statusText}>{textStatus}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        style={styles.buttonContainer}
                        colors={[
                            'rgba(255, 255, 255, 0.455) 0%',
                            'rgba(255, 255, 255, 0.065) 101.95%',
                        ]}>
                        <View style={{ marginTop: 3, marginRight: 10 }}>
                            <Clock />
                        </View>
                        {/* {currentOrder &&
                            currentOrder.timeToDeliver &&
                            (timeToDeliver ? (
                                <Text style={styles.buttonText}>
                                    {timeToDeliver}
                                </Text>
                            ) : (
                                <Text style={styles.buttonText}>
                                    {currentOrder.timeToDeliver}
                                </Text>
                            ))} */}

                        {currentOrder &&
                            currentOrder.timeToDeliver &&
                            (currentOrder.orderStatus != 'Driver Reached' ? (
                                currentOrder.orderStatus != 'Placed' ? (
                                    <ReverseTimer
                                        date={currentOrder.updatedAt}
                                        start={Number(
                                            currentOrder.timeToDeliver.split(
                                                ' ',
                                            )[0],
                                        )}
                                        bufferTime={ORDER_BUFFER_TIME}
                                        textStyle={styles.buttonText}
                                        textAfterBuffer={
                                            'Your Order will be delivered soon'
                                        }
                                    />
                                ) : (
                                    <ReverseTimer
                                        date={currentOrder.updatedAt}
                                        start={
                                            startTimeToDeliver
                                                ? Number(startTimeToDeliver)
                                                : Number(
                                                      currentOrder.timeToDeliver.split(
                                                          ' ',
                                                      )[0],
                                                  )
                                        }
                                        bufferTime={ORDER_BUFFER_TIME}
                                        textStyle={styles.buttonText}
                                        textAfterBuffer={
                                            'Your Order will be delivered soon'
                                        }
                                    />
                                )
                            ) : (
                                <ReverseTimer
                                    date={currentOrder.updatedAt}
                                    start={Number(
                                        currentOrder.timeToDeliver.split(
                                            ' ',
                                        )[0],
                                    )}
                                    bufferTime={0}
                                    textStyle={styles.buttonText}
                                />
                            ))}
                    </LinearGradient>
                    <LinearGradient
                        style={styles.buttonContainer}
                        colors={[
                            'rgba(255, 255, 255, 0.455) 0%',
                            'rgba(255, 255, 255, 0.065) 101.95%',
                        ]}>
                        <Text style={styles.buttonText}>On Time</Text>
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.imageContainer}>
                {(() => {
                    switch (status) {
                        case 'Placed':
                            return <Preparing />;
                        case 'In Progress':
                            return <Preparing />;
                        case 'Out For Delivery':
                            return <Ontheway />;
                        case 'Driver Reached':
                            return <Delivering />;
                        case 'Completed':
                            return <Delivering />;
                        default:
                            return null;
                    }
                })()}
            </View>

            <View style={styles.elevation}>
                <View style={styles.innerContainer}>
                    {/* <Rightcircle style={{ color: changeColors1 }} /> */}
                    <Icon1 />
                    <View style={styles.textStyle}>
                        <Text
                            style={[
                                styles.headingText,
                                { color: changeColors1 },
                            ]}>
                            Confirming Your Order With Restaurants
                        </Text>
                        <Text style={styles.subText}>
                            Your Order is Placed. Restaurants will start
                            preparing your order after confirmation!
                        </Text>
                        <Text style={styles.subText}>Sit back and relax!</Text>
                    </View>
                </View>
                <View style={styles.dashContainer}>
                    <View style={styles.dash}></View>
                </View>
                <View style={styles.innerContainer}>
                    {status === 'In Progress' ? (
                        <Cooking style={{ color: changeColors2 }} />
                    ) : (
                        <Icon2 />
                    )}

                    <View style={styles.textStyle}>
                        <Text
                            style={[
                                styles.headingText,
                                { color: changeColors2 },
                            ]}>
                            Preparing Your Order
                        </Text>
                        <Text style={styles.subText}>
                            We have the best hands on job for preparing your
                            order.
                        </Text>
                    </View>
                </View>
                <View style={styles.dashContainer}>
                    <View style={styles.dash}></View>
                </View>
                <View style={styles.innerContainer}>
                    {/* <Cycle style={{ color: changeColors3 }} /> */}
                    {status === 'Out For Delivery' ? (
                        <Icon3 />
                    ) : (
                        <Cycle style={{ color: changeColors3 }} />
                    )}
                    <View style={styles.textStyle}>
                        <Text
                            style={[
                                styles.headingText,
                                { color: changeColors3 },
                            ]}>
                            Delivery Partner Picked Your Order
                        </Text>
                        <Text style={styles.subText}>
                            Our Delivery partner is on the their way to deliver
                            your order.
                        </Text>
                    </View>
                </View>
                <View style={styles.dashContainer}>
                    <View style={styles.dash}></View>
                </View>
                <View style={styles.innerContainer}>
                    {/* <Crown style={{ color: changeColors4 }} /> */}
                    {/* <Icon4 /> */}
                    {status === 'Driver Reached' || status === 'Completed' ? (
                        <Image
                            source={require('../../assets/icons/deliveredOrange.png')}
                            style={styles.iconStyle}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/icons/deliveredGrey.png')}
                            style={styles.iconStyle}
                        />
                    )}
                    <View style={styles.textStyle}>
                        <Text
                            style={[
                                styles.headingText,
                                { color: changeColors4 },
                            ]}>
                            Hurray!! Driver Reached At Your Door
                        </Text>
                        <Text style={styles.subText}>Enjoy your meal!!</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
    },
    statusText: {
        textAlign: 'center',
        ...fonts.NUNITO_700_20,
        color: colors.WHITE,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        height: dimensions.fullHeight * 0.05,
        width: dimensions.fullWidth * 0.3,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 5,
    },
    buttonGradient: {
        flexDirection: 'row',
        borderRadius: 5,
    },
    buttonText: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
    },
    imageContainer: {
        marginTop: 120,
        height: '5%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    elevation: {
        marginTop: 120,
        backgroundColor: '#fff',
        borderRadius: 8,

        // height: dimensions.fullHeight * 0.28,
        width: dimensions.fullWidth * 0.95,
        alignSelf: 'center',
        padding: 20,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },

    rightCircle: { flexDirection: 'row', margin: 5 },
    headingText: { ...fonts.NUNITO_700_12, ...Styles.default_text_color },
    subText: {
        ...fonts.NUNITO_500_8,
        color: colors.GREY_MEDIUM,
    },
    dash: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        borderColor: 'rgba(0, 0, 0, 0.65)',
        borderStyle: 'dashed',
        borderWidth: 0.5,
        height: 20,
        width: 0,
    },
    dashContainer: { marginLeft: 20, marginTop: -4 },
    progressBar: { flexDirection: 'row', margin: 5 },
    iconStyle: {
        height: 30,
        width: 30,
    },
    innerContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
    },
    textStyle: {
        marginHorizontal: 5,
    },
});

export default OrderStatusComponent;
