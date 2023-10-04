import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import moment from 'moment';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllMenu,
    selectVegMenu,
    setSubscriptionMealType,
} from '../../../redux/actions/subscriptionActions';
import { getMealPlansForSubscription } from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';

const MultipleButtonFoodType = props => {
    const { planID } = useSelector(state => state.finalSubscriptionPrice);

    const dispatch = useDispatch();

    const [mealPlans, setMealPlans] = useState([]);

    const [isEnabled, setIsEnabled] = useState(true);

    const fetchMealPlanType = async () => {
        const response = await getMealPlansForSubscription(planID);
        setMealPlans(response.data.data);
        dispatch(
            setSubscriptionMealType(
                response.data.data[0].type,
                response.data.data[0]._id,
                '',
            ),
        );
    };

    useEffect(() => {
        fetchMealPlanType();
    }, [planID]);

    const formatTimeRange = timing => {
        const formattedOpeningTime = moment(timing.openingTime).format(
            'h:mm A',
        );
        const formattedClosingTime = moment(timing.closingTime).format(
            'h:mm A',
        );
        return `${formattedOpeningTime} - ${formattedClosingTime}`;
    };

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        if (isEnabled) {
            dispatch(selectVegMenu());
        } else {
            dispatch(selectAllMenu());
        }
    };
    const [active, setActive] = useState(0);
    const clicked = (index, text, itemId, itemTime) => {
        setActive(index);
        dispatch(setSubscriptionMealType(text, itemId, itemTime));
    };

    const renderItems = () => {
        return (
            mealPlans &&
            mealPlans.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => clicked(index, item.type, item._id, '')}>
                    <View
                        style={[
                            active === index && styles.foodTypeButtonContainer,
                            active !== index && styles1.foodTypeButtonContainer,
                        ]}>
                        <View
                            style={[
                                active === index && styles.buttonContainer,
                                active !== index && styles1.buttonContainer,
                            ]}>
                            <View
                                style={[
                                    active === index && styles.imageContainer,
                                    active !== index && styles1.imageContainer,
                                ]}>
                                {/* <ImageBackground
                                resizeMode="cover"
                                style={[
                                    active === index && styles.icon,
                                    active !== index && styles1.icon,
                                ]}
                                source={
                                    active !== index
                                        ? item.image
                                        : item.whiteImage
                                }
                            /> */}
                            </View>
                            <Text
                                style={[
                                    active === index && styles.buttonText,
                                    active !== index && styles1.buttonText,
                                ]}>
                                {item.type} (
                                {active === index &&
                                    formatTimeRange(item.timing)}
                                )
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        );
    };
    return (
        <View style={styles.container}>
            <View style={vegButtonStyles.container}>
                <View style={vegButtonStyles.buttonContainer}>
                    <Text style={vegButtonStyles.vegButtonText}>Veg</Text>

                    <Switch
                        trackColor={{
                            false: colors.DARKER_GRAY,
                            true: colors.DARKER_GRAY,
                        }}
                        thumbColor={isEnabled ? '#00AB5E' : '#00AB5E'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {renderItems()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        gap: 10,
        flexDirection: 'row',
        height: 46,
        width: dimensions.fullWidth - 40,
    },

    foodTypeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 4,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: colors.ORANGE_WHITE,
        paddingHorizontal: 10,
        height: 43,
        borderRadius: 44,
    },
    buttonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
    icon: {
        height: 22.461,
        width: 26,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
});

const vegButtonStyles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
        backgroundColor:colors.WHITE,
        paddingHorizontal: 14,

        height: 44,
        borderRadius: 35,
    },

    vegButtonText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_400_14.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22, // 157.143%
        letterSpacing: -0.408,
    },
});

const styles1 = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        gap: 10,

        height: 46,
        width: dimensions.fullWidth - 40,
    },

    foodTypeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 4,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        width: 143,
        height: 43,
        backgroundColor:colors.WHITE,

        borderRadius: 44,
    },
    buttonText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
    icon: {
        height: 22.461,
        width: 30,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
});

export default MultipleButtonFoodType;
