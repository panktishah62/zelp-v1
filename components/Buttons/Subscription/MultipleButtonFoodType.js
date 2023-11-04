import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllMenu,
    selectVegMenu,
    setSubscriptionMealType,
} from '../../../redux/actions/subscriptionActions';
import {
    getBestSellerFoodItems,
    getCategorizedFoodItems,
    getMealPlansForSubscription,
} from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';
import { SvgUri } from 'react-native-svg';
import { dynamicSize } from '../../../utils/responsive';
import SubscriptionMeal from '../../Cards/Subscription/SubscriptionMeal';
import CategorisedMenu from '../../Cards/Subscription/CategorisedMenu';

const MultipleButtonFoodType = props => {
    const subscriptionPlan = props?.subscriptionPlan;
    const handleKnowMore = props?.handleKnowMore;
    const setMenuItems = props?.setMenuItems;
    const setIsVeg = props?.setIsVeg;
    const setUpdatedMenu = props?.setUpdatedMenu;
    const planID = subscriptionPlan?._id;
    const dispatch = useDispatch();

    const [mealPlans, setMealPlans] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [active, setActive] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);
    const [availableAt, setAvailableAt] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBestSeller, setIsLoadingBestSeller] = useState(false);
    const location = useSelector(state => state.address.location);

    const fetchMealPlanType = async () => {
        const response = await getMealPlansForSubscription(planID);
        if (response.data.data) {
            setMealPlans(response.data.data);
        }
    };

    useEffect(() => {
        fetchMealPlanType();
    }, [planID]);

    const formatTimeRange = timing => {
        return `(${timing?.openingTime} - ${timing?.closingTime})`;
    };

    const toggleSwitch = () => {
        setIsVeg(!isEnabled);
        setIsEnabled(!isEnabled);
    };

    const clicked = (index, text, itemId, itemTime) => {
        setActive(index);
        // dispatch(setSubscriptionMealType(text, itemId, itemTime));
    };
    const [bestSellers, setBestSellers] = useState([]);
    const [categorisedMenu, setCategorisedMenu] = useState([]);

    const fetchCategorizedFoodItems = async (lat, long) => {
        if (mealPlans?.length > 0 && mealPlans[active]?._id) {
            const response = await getCategorizedFoodItems(
                subscriptionPlan?._id,
                mealPlans[active]?._id,
                lat,
                long,
            );
            if (response?.data?.categorisedCombos) {
                setCategorisedMenu(response?.data?.categorisedCombos);
                setMenuItems(response?.data?.categorisedCombos);
                setIsAvailable(response?.data?.isAvailable);
                setAvailableAt(response?.data?.availableAt);
                setIsLoading(false);
            }
        }
    };

    const fetchBestSellers = async (lat, long) => {
        await getBestSellerFoodItems(subscriptionPlan?._id, lat, long)
            .then(response => response?.data)
            .then(data => {
                setBestSellers(data?.bestSellerCombos);
                setIsLoadingBestSeller(false);
            });
    };

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            setIsLoadingBestSeller(true);
            fetchBestSellers(location?.latitude, location?.longitude);
        }
    }, [planID, location?.latitude]);

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            setIsLoading(true);
            fetchCategorizedFoodItems(location?.latitude, location?.longitude);
        }
    }, [mealPlans, active, location?.latitude]);

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
                            {active === index && item?.icon && (
                                <View
                                    style={[
                                        active === index &&
                                            styles.imageContainer,
                                        active !== index &&
                                            styles1.imageContainer,
                                    ]}>
                                    <SvgUri
                                        width={dynamicSize(18)}
                                        height={dynamicSize(18)}
                                        uri={item.icon}
                                    />
                                </View>
                            )}
                            <Text
                                style={[
                                    active === index && styles.buttonText,
                                    active !== index && styles1.buttonText,
                                ]}>
                                {item.type}
                                {active === index &&
                                    item?.timing &&
                                    formatTimeRange(item?.timing)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        );
    };
    return (
        <View>
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
            {!isLoading && !isLoadingBestSeller && mealPlans?.length > 0 && (
                <SubscriptionMeal
                    mealPlan={mealPlans[active]}
                    isVeg={isEnabled}
                    bestSellers={bestSellers}
                    categorisedMenu={categorisedMenu}
                    isAvailable={isAvailable}
                    availableAt={availableAt}
                    handleKnowMore={handleKnowMore}
                />
            )}
            {!isLoading &&
                !isLoadingBestSeller &&
                Object.keys(categorisedMenu).length > 0 && (
                    <CategorisedMenu
                        categorisedMenu={categorisedMenu}
                        handleKnowMore={handleKnowMore}
                        isVeg={isEnabled}
                        setUpdatedMenu={setUpdatedMenu}
                        isAvailable={isAvailable}
                        availableAt={availableAt}
                    />
                )}
            {(isLoading || isLoadingBestSeller) && (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator color={colors.ORANGE_WHITE} size={32} />
                </View>
            )}
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
    activityIndicator: {
        marginTop: dynamicSize(100),
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: colors.WHITE,
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
        backgroundColor: colors.WHITE,

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
