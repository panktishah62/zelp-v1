import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import IMAGEICON from '../../assets/icons/winning.svg';
import SUCCESSICON from '../../assets/icons/SuccessIcon.svg';
import CURRENTICON from '../../assets/icons/CurrentIcon.svg';
import PENDINGICON from '../../assets/icons/PendingIcon.svg';
import MILESTONEICON from '../../assets/icons/MilestoneIcon.svg';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { rangeToArray } from '../../utils';

const SuccessIcon = props => {
    const { index, incentive } = props;
    return (
        <View style={styles.smallIcons}>
            <SUCCESSICON height={30} />
            <Text style={styles.incentiveText}>{incentive}Rs</Text>
        </View>
    );
};
const CurrentIcon = props => {
    const { index, incentive } = props;
    return (
        <View style={styles.smallIcons}>
            <CURRENTICON height={30} />
            <Text style={styles.incentiveText}>{incentive}Rs</Text>
        </View>
    );
};
const PendingIcon = props => {
    const { index, incentive } = props;
    return (
        <View style={styles.smallIcons}>
            <PENDINGICON height={30} />
            <Text style={styles.incentiveText}>{incentive}Rs</Text>
        </View>
    );
};
const MilestoneIcon = props => {
    const { index, incentive } = props;
    return (
        <View style={styles.smallIcons}>
            <MILESTONEICON height={30} />
            <Text style={styles.incentiveText}>{incentive}Rs</Text>
        </View>
    );
};

const OrderProgress = props => {
    const { data, currentCount, incentive } = props;

    const assignIcon = (index, item) => {
        if (currentCount > item) {
            return <SuccessIcon index={item} incentive={incentive} />;
        } else if (currentCount == item) {
            return <CurrentIcon index={item} incentive={incentive} />;
        } else if (currentCount < item) {
            if (index === data.length - 1) {
                return <MilestoneIcon index={item} incentive={incentive} />;
            } else {
                return <PendingIcon index={item} incentive={incentive} />;
            }
        }
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => {
                return (
                    <View key={index} style={styles.orderProgress}>
                        {assignIcon(index, item)}
                        {!(index === data.length - 1) && (
                            <Text style={styles.dottedLine}>---</Text>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};

const LevelProgress = props => {
    const { data, currentCount } = props;
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.levelProgress}>
                        <Text style={styles.levelText}>Level {index + 1}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <OrderProgress
                                data={rangeToArray([
                                    index === 0
                                        ? 1
                                        : Number(data[index - 1]?.minUsed) + 1,
                                    Number(item?.minUsed),
                                ])}
                                key={index}
                                currentCount={currentCount}
                                incentive={
                                    index == 0 ? 100 : data[index - 1].incentive
                                }
                            />
                            {!(index === data.length - 1) && (
                                <View style={styles.separation} />
                            )}
                        </View>
                    </View>
                );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

const ReferralProgressCard = props => {
    const { referralDetails } = props;
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <Text style={styles.titleText}>Total Earnings:</Text>
                    <Text style={styles.subTitleText}>
                        {referralDetails?.totalAmountEarned}Rs
                    </Text>
                </View>
                <IMAGEICON width={dimensions.fullWidth / 2} />
            </View>
            {referralDetails?.incentive && (
                <View style={styles.bottomContainer}>
                    <LevelProgress
                        data={referralDetails?.incentive}
                        currentCount={referralDetails?.referralUsedCount}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        height: 130,
    },
    titleText: {
        ...fonts.NUNITO_600_16,
        color: colors.GREY_DARK,
    },
    subTitleText: {
        ...fonts.NUNITO_700_24,
        color: colors.ORANGE,
    },
    smallIcons: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    levelProgress: {
        alignItems: 'center',
        margin: 10,
    },
    separation: {
        height: 30,
        width: 1,
        borderWidth: 1,
        borderColor: colors.BLACK,
        backgroundColor: colors.BLACK,
        marginLeft: 20,
    },
    levelText: {
        ...fonts.NUNITO_600_14,
        color: colors.GREY_DARK,
        marginVertical: 10,
    },
    dottedLine: {
        paddingTop: 5,
        color: colors.GREY_DARK,
    },
    orderProgress: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    incentiveText: {
        color: colors.GREY_DARK,
        ...fonts.NUNITO_700_10,
    },
});

export default ReferralProgressCard;
