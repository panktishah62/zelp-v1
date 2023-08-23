import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import RefundCard from '../../components/Cards/RefundCard';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { getAllRefunds } from '../../redux/services/refundService';

const RefundsScreen = ({ navigation }) => {
    const [refundData, setRefundData] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await getAllRefunds();
        if (response?.data?.refunds) {
            setRefundData(response.data.refunds);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const _renderItem = (item, index) => {
        return (
            <View style={styles.cardContainer}>
                <RefundCard refundData={item} navigation={navigation} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentcontainer}>
                <View>
                    <HeaderWithTitle
                        title={'Refunds'}
                        navigation={navigation}
                    />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTextStyle}>
                        Please wait upto 3 Business Days For your Refund
                    </Text>
                </View>
                {!isLoading && (
                    <FlatList
                        data={refundData}
                        renderItem={({ item, index }) =>
                            _renderItem(item, index)
                        }
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() => {
                                    fetchData();
                                }}
                            />
                        }
                    />
                )}
                {isLoading && (
                    <ActivityIndicator color={colors.ORANGE} size={32} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        height: dimensions.fullHeight,
        alignItems: 'center',
    },
    cardContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    infoTextContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.ORANGE_GRADIENT_DARK,
        borderRadius: 6,
        width: dimensions.fullWidth * 0.9,
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    infoTextStyle: {
        ...fonts.NUNITO_700_12,
        color: colors.ORANGE_GRADIENT_DARK,
    },
});

export default RefundsScreen;
