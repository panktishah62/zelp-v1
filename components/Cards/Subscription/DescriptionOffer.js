import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { finalPlanDetails } from '../../../redux/actions/subscriptionActions';
import { dynamicSize } from '../../../utils/responsive';
import { colors } from '../../../styles/colors';
import { calculateTotal } from '../../../redux/services/subscriptionCartCalculations';

const DescriptionOffer = props => {
    const data = props?.data;
    const discount = data?.appliedDiscount;
    const price = data?.pricePerMeal;
    const itemId = props.itemId;
    const afterPrice = price * (1 - discount / 100);

    const dispatch = useDispatch();
    useEffect(() => {
        // const calculate = calculateTotal(data, config);
        const updateRedux = () => {
            dispatch(
                finalPlanDetails({ finalPrice: afterPrice, planID: itemId }),
            );
        };
        updateRedux();
    }, [afterPrice]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={textStyles.firstText}>
                        {data?.subscriptionPlan?.appliedDiscount > 0 &&
                            `${data?.subscriptionPlan?.appliedDiscount}% off on Froker Meals`}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text
                        style={[
                            discount != 0
                                ? textStyles.withDiscout
                                : textStyles.withOutDiscout,
                        ]}>
                        ₹{data?.subscriptionPlan?.pricePerMeal}/Meal
                    </Text>
                    {discount != 0 && (
                        <Text style={textStyles.fourthText}>
                            <Text style={textStyles.thirdText}>
                                ₹{data?.discountedPrice}
                            </Text>
                            / 1 Meal
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: dimensions.fullWidth - dynamicSize(40),
        gap: 6,
        borderWidth: 1,
        borderRadius: 10,
    },
    topContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    bottomContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16.24,
        marginLeft: 20,
        marginBottom: 10,
    },
});

const textStyles = StyleSheet.create({
    firstText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.7,
    },
    withDiscout: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        textDecorationLine: 'line-through',
        letterSpacing: 0.9,
    },
    withOutDiscout: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.9,
    },

    thirdText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '900',
        letterSpacing: 1.3,
    },
    fourthText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.8,
    },
});

export default DescriptionOffer;
