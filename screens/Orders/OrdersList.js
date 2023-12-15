import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    View,
    Text,
    Image,
    SafeAreaView,
} from 'react-native';
import { colors } from '../../styles/colors';
import { getAllOrders } from '../../redux/services/orderService';
import OrderCardComponent from '../../components/Cards/Orders/OrderCardComponent';

const OrdersList = ({ navigation }) => {
    const LIMIT = 10;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPageLoading, setNextPageLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData(1);
    }, []);

    const fetchData = async currentPage => {
        const response = await getAllOrders(currentPage, LIMIT);
        if (response?.data?.orders) {
            // setOrders(response?.data?.orders);
            if (currentPage == 1) {
                setOrders(response?.data?.orders);
            } else {
                setOrders([...orders, ...response?.data?.orders]);
            }
            if (response?.data?.pagination?.next) {
                setHasNextPage(true);
            } else {
                setHasNextPage(false);
            }
        }
        setIsLoading(false);
        setNextPageLoading(false);
    };

    const handleEndReached = () => {
        if (hasNextPage && !nextPageLoading) {
            setNextPageLoading(true);
            fetchData(page + 1);
            setPage(page + 1);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {!isLoading && orders?.length > 0 && (
                <>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => (
                            <OrderCardComponent
                                order={item}
                                navigation={navigation}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleEndReached}
                    />
                    {nextPageLoading && (
                        <View styles={[styles.activityIndicator]}>
                            <ActivityIndicator
                                size="large"
                                color={colors.ORANGE}
                            />
                        </View>
                    )}
                </>
            )}
            {!isLoading && orders?.length == 0 && (
                <View style={styles.textContainer}>
                    <Image
                        source={require('../../assets/images/no_orders.png')}
                        style={{ resizeMode: 'cover' }}
                    />
                    {/* <Text>Orders Not Found!</Text> */}
                </View>
            )}
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrdersList;
