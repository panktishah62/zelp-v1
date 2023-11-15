import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import DeliveryStageOneOrange from '../../assets/icons/delivery-stage1-orange';
import DeliveryStageTwoOrange from '../../assets/icons/delivery-stage2-orange';
import DeliveryStageTwoBlack from '../../assets/icons/delivery-stage2-black';
import DeliveryStageThreeOrange from '../../assets/icons/delivery-stage3-orange';
import DeliveryStageThreeBlack from '../../assets/icons/delivery-stage3-black';
import DeliveryStageFourOrange from '../../assets/icons/delivery-stage4-orange';
import DeliveryStageFourBlack from '../../assets/icons/delivery-stage4-black';
import { colors } from '../../styles/colors';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const DeliveryStages = ({ stage }) => {
    switch (stage) {
        case 1:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Ordered</Text>
                    </View>
                    <View style={[styles.connector]} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Cooking</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Out for</Text>
                        <Text style={styles.stageText}>Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Delivered</Text>
                    </View>
                </View>
            );
        case 2:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Cooking</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Out for</Text>
                        <Text style={styles.stageText}>Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Delivered</Text>
                    </View>
                </View>
            );
        case 3:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Cooking</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Out for</Text>
                        <Text style={styles.stageText}>Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Delivered</Text>
                    </View>
                </View>
            );
        case 4:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Cooking</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Out for</Text>
                        <Text style={styles.stageText}>Delivery</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourOrange style={styles.iconStyle} />
                        <Text style={styles.stageText}>Food</Text>
                        <Text style={styles.stageText}>Delivered</Text>
                    </View>
                </View>
            );
        default:
            return null;
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: dynamicSize(10),
        alignItems: 'center',
    },
    stageContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    stageText: {
        color: colors.BLACK,
        fontSize: normalizeFont(14),
        width: dynamicSize(54),
        textAlign: 'center',
    },
    connector: {
        borderBottomWidth: dynamicSize(2),
        flex: 0.5,
        ...Platform.select({
            android: {
                borderStyle: 'dashed',
            },
        }),
        marginBottom: dynamicSize(40),
    },
    iconStyle: {
        marginBottom: dynamicSize(10),
    },
});

export default DeliveryStages;
