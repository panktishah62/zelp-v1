import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
import ORDER_SUCCESS from '../../../assets/icons/order_success.svg';
import ORDER_NOT_PLACED from '../../../assets/icons/clock_grey';
import NEXT_ORDER from '../../../assets/icons/clock_orange.svg';
import { Tooltip } from '@rneui/themed';
// import { Tooltip } from 'react-native-paper';

const ControlledTooltip = props => {
    const { open, setOpen } = props;
    // const [open, setOpen] = React.useState(false);
    return (
        <View style={styles.toolTipContainer}>
            <Tooltip
                containerStyle={styles.toolTipContainer}
                animationType={'none'}
                closeOnlyOnBackdropPress={true}
                visible={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                {...props}
            />
        </View>
    );
};

const ManageOrders = props => {
    const { orderArray, validity } = props;

    const ToolTip = props => {
        const { text, Icon, color } = props;
        return (
            <View style={styles.tooltipText}>
                {Icon}
                <Text style={[styles.tooltipStyles, { color: color }]}>
                    {text}
                </Text>
            </View>
        );
    };

    const ProgressIconCard = props => {
        const [tooltipVisible, setToolTipVisible] = useState(false);

        const { index, Icon, IconSmall, data, text, color } = props;
        return (
            <View key={index}>
                <ControlledTooltip
                    open={tooltipVisible}
                    setOpen={setToolTipVisible}
                    popover={
                        <ToolTip Icon={IconSmall} text={text} color={color} />
                    }
                    width={200}
                    backgroundColor={colors.WHITE}>
                    <View style={styles.innerContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => setToolTipVisible(true)}>
                            {Icon}
                        </TouchableWithoutFeedback>
                        {index < data.length - 1 && (
                            <View style={styles.line}></View>
                        )}
                    </View>
                </ControlledTooltip>
                <Text style={styles.mealText}>Meal {index + 1}</Text>
            </View>
        );
    };

    const ProgressCard = (validity, completedOrders) => {
        const [tooltipVisible, setToolTipVisible] = useState(false);
        const data = Array.from({ length: validity }, (_, index) => index);
        const numOfCompletedOrders = completedOrders?.length
            ? completedOrders?.length
            : 0;

        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => {
                    if (numOfCompletedOrders > index) {
                        return (
                            <ProgressIconCard
                                index={index}
                                Icon={<ORDER_SUCCESS />}
                                IconSmall={<ORDER_SUCCESS height={25} />}
                                text={'Delivered'}
                                color={colors.GREEN}
                                data={data}
                                key={index}
                            />
                        );
                    } else if (numOfCompletedOrders < index) {
                        return (
                            <ProgressIconCard
                                index={index}
                                Icon={<ORDER_NOT_PLACED />}
                                IconSmall={<ORDER_NOT_PLACED height={25} />}
                                text={'Not Placed'}
                                color={colors.DARKER_GRAY}
                                data={data}
                                key={index}
                            />
                        );
                    } else {
                        return (
                            <ProgressIconCard
                                index={index}
                                Icon={<NEXT_ORDER />}
                                IconSmall={<NEXT_ORDER height={25} />}
                                text={'Next Order'}
                                color={colors.ORANGE_WHITE}
                                data={data}
                                key={index}
                            />
                        );
                    }
                })}
            </ScrollView>
            // <Text>Hey</Text>
        );
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.section}>
                    {ProgressCard(validity?.validity, orderArray)}
                </View>
            </View>
            <View style={styles.manageOrderTextSection}>
                <Text style={styles.manageOrderText}>Manage Orders</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - dynamicSize(100),
        height: dynamicSize(100),
    },
    container: {
        marginTop: dynamicSize(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100.79,
        borderRadius: 15,
        borderColor: 'black',
        width: dimensions.fullWidth - dynamicSize(60),
        borderWidth: 2,
    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',

        width: dimensions.fullWidth / dynamicSize(4) - dynamicSize(26),
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 4,
    },
    line: {
        height: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dashed',
        width: dynamicSize(46),
    },
    manageOrderText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    mealText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    manageOrderTextSection: {
        position: 'absolute',
        top: 10,
        left: (dimensions.fullWidth - dynamicSize(190)) / 2,
        backgroundColor: '#fff',

        paddingHorizontal: dynamicSize(5),
        height: 30,
    },
    increaseDimension: {
        width: dynamicSize(27.5),
        height: 27.5,
    },
    tooltipStyles: {
        ...fonts.POPPINS_800_12,
    },
    toolTipContainer: {
        elevation: dynamicSize(2),
    },
    tooltipText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManageOrders;
