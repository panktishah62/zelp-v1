import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import SearchInput from '../../components/Inputs/SearchInput';
import { dimensions, fonts } from '../../styles';
import { useSelector } from 'react-redux';
import {
    getSearchedCoupon,
    getSearchedSubscriptionCoupon,
    getValidCouponsForUser,
    getValidSubscriptionCouponsForUser,
} from '../../redux/services/couponsService';
import CouponCard from '../../components/Cards/Coupons.js/CouponCard';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';

const CouponsScreen = props => {
    const { route, navigation } = props;
    const { isSubscription = false, subscriptionData = {} } = route?.params;
    const [text, setText] = useState('');
    const cart = useSelector(state => state.cartActions);
    // const [validCoupons, setValidCoupons] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const placeholder = 'Enter Code';

    const _renderCoupons = (item, index) => {
        const isActive = cart.coupon ? false : item.isApplicableCoupons;
        return (
            <CouponCard
                coupon={item?.coupon}
                isActive={item?.isApplicableCoupons}
                navigation={navigation}
                isSubscription={isSubscription}
            />
        );
    };

    const getValidCoupons = async () => {
        setIsLoading(true);
        const response = await getValidCouponsForUser({ cart: cart });
        if (response && response?.data && response.data?.updatedCoupons) {
            setCoupons(response.data.updatedCoupons);
            setIsLoading(false);
        }
    };
    const getValidSubscriptionCoupons = async () => {
        setIsLoading(true);
        const response = await getValidSubscriptionCouponsForUser(
            subscriptionData,
        );
        if (response && response?.data && response.data?.updatedCoupons) {
            setCoupons(response.data.updatedCoupons);
            setIsLoading(false);
        }
    };

    const search = async (_text, params) => {
        if (text.length) {
            setIsLoading(true);
            if (!isSubscription) {
                const response = await getSearchedCoupon({
                    couponCode: text,
                    cart: cart,
                });
                if (
                    response &&
                    response?.data &&
                    response.data?.updatedCoupons
                ) {
                    setCoupons(response.data.updatedCoupons);
                    setIsLoading(false);
                    return;
                }
            } else {
                const response = await getSearchedSubscriptionCoupon({
                    couponCode: text,
                    subscriptionData: subscriptionData,
                });
                if (
                    response &&
                    response?.data &&
                    response.data?.updatedCoupons
                ) {
                    setCoupons(response.data.updatedCoupons);
                    setIsLoading(false);
                    return;
                }
            }
        }
        setCoupons([]);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!text.length && !isSubscription) {
            getValidCoupons();
        }
    }, [text]);

    useEffect(() => {
        if (!isSubscription) {
            getValidCoupons();
        }
    }, [cart]);

    useEffect(() => {
        if (!text.length && isSubscription) {
            getValidSubscriptionCoupons();
        }
    }, [text]);

    useEffect(() => {
        if (subscriptionData) {
            getValidSubscriptionCoupons();
        }
    }, [subscriptionData]);

    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                // {
                //     paddingBottom:
                //         insets.bottom + insets.top + dynamicSize(130),
                // },
            ]}>
            <SearchInput
                text={text}
                setText={setText}
                placeholder={placeholder}
                width={dimensions.fullWidth * 0.9}
                enableInput={true}
                search={search}
                onFocus={() => {}}
            />
            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Available Furo Offers</Text>
            </View>
            {!isLoading ? (
                <FlatList
                    data={coupons}
                    renderItem={({ item, index }) =>
                        _renderCoupons(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <ActivityIndicator color={colors.ORANGE} size={35} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        flex: 1,
        paddingBottom: dynamicSize(20),
    },
    titleTextContainer: {
        width: dimensions.fullWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_DARK,
    },
});

export default CouponsScreen;
