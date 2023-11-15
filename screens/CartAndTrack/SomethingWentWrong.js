/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SomethingWentWrongImg from '../../assets/images/something-went-wrong.svg';
import CustomerCareCard from './CustomerCareCard';
import { dimensions, fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import TransparentHeader from '../../components/Header/TransparentHeader';
import { useSelector } from 'react-redux';

const SomethingWentWrong = ({ navigation }) => {
    const serverData = useSelector(state => state.serverReducer);
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <TransparentHeader
                    navigation={navigation}
                    onBack={() => {
                        navigation.navigate('Home');
                    }}
                    dontShowThreeDots={true}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SomethingWentWrongImg
                style={{
                    marginBottom: dynamicSize(20),
                    marginTop: dynamicSize(120),
                }}
            />
            <Text style={styles.boldText}>Oops!</Text>
            <Text style={styles.boldText}>Something went wrong!</Text>
            <Text style={styles.normalText}>
                We are currently facing challenges in tracking your order.
            </Text>
            <CustomerCareCard number={serverData?.config?.contactNo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        position: 'absolute',
        top: dynamicSize(0),
        left: dynamicSize(0),
        display: 'flex',
        alignItems: 'center',
        padding: dynamicSize(20),
    },
    boldText: {
        color: colors.BLACK,
        fontSize: normalizeFont(24),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
    normalText: {
        color: colors.GREY_DARK,
        textAlign: 'center',
        width: '80%',
        marginVertical: dynamicSize(20),
    },
});

export default SomethingWentWrong;
