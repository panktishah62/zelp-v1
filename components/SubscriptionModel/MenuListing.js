import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/index';
import FastImage from 'react-native-fast-image';
import { dynamicSize } from '../../utils/responsive';

const MenuListing = props => {
    const { data, navigation } = props;

    const _renderItem = (item, index) => {
        return (
            <View style={styles.itemContainer}>
                <FastImage source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.nameText}>{item.name}</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{data.meal}</Text>
            <FlatList
                data={data.items}
                renderItem={({ item, index }) => _renderItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        paddingHorizontal: dynamicSize(20),
    },
    titleText: {
        marginBottom: dynamicSize(10),
        ...fonts.NUNITO_500_24,
        color: colors.GREY_DARK,
    },
    image: {
        height: dynamicSize(70),
        width: dynamicSize(70),
        borderRadius: dynamicSize(35),
    },
    itemContainer: {
        margin: dynamicSize(10),
        // justifyContent: 'center',
        alignItems: 'center',
        width: dynamicSize(80),
    },
    nameText: {
        marginVertical: dynamicSize(5),
        textAlign: 'center',
        color: colors.GREY_DARK,
        // width: 70,
    },
});
export default MenuListing;
