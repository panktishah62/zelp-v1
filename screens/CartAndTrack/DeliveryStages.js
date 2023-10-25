import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
                        <DeliveryStageOneOrange />
                        <Text style={styles.stageText}>Food Ordered</Text>
                    </View>
                    <View style={[styles.connector]} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoBlack />
                        <Text style={styles.stageText}>Food Cooking</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeBlack />
                        <Text style={styles.stageText}>Out for Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack />
                        <Text style={styles.stageText}>
                            Food{'\n'}Delivered
                        </Text>
                    </View>
                </View>
            );
        case 2:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange />
                        <Text style={styles.stageText}>Food Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange />
                        <Text style={styles.stageText}>Food Cooking</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeBlack />
                        <Text style={styles.stageText}>Out for Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack />
                        <Text style={styles.stageText}>Food Delivered</Text>
                    </View>
                </View>
            );
        case 3:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange />
                        <Text style={styles.stageText}>Food Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange />
                        <Text style={styles.stageText}>Food Cooking</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeOrange />
                        <Text style={styles.stageText}>Out for Delivery</Text>
                    </View>
                    <View style={styles.connector} />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourBlack />
                        <Text style={styles.stageText}>Food Delivered</Text>
                    </View>
                </View>
            );
        case 4:
            return (
                <View style={styles.container}>
                    <View style={styles.stageContainer}>
                        <DeliveryStageOneOrange />
                        <Text style={styles.stageText}>Food Ordered</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageTwoOrange />
                        <Text style={styles.stageText}>Food Cooking</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageThreeOrange />
                        <Text style={styles.stageText}>Out for Delivery</Text>
                    </View>
                    <View
                        style={[
                            styles.connector,
                            { borderBottomColor: colors.ORANGE },
                        ]}
                    />
                    <View style={styles.stageContainer}>
                        <DeliveryStageFourOrange />
                        <Text style={styles.stageText}>Food Delivered</Text>
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
        gap: dynamicSize(10),
    },
    stageText: {
        color: colors.BLACK,
        fontSize: normalizeFont(16),
        width: dynamicSize(54),
        textAlign: 'center',
    },
    connector: {
        borderBottomWidth: dynamicSize(2),
        flex: 0.5,
        borderStyle: 'dashed',
        marginBottom: dynamicSize(40),
    },
});

export default DeliveryStages;
