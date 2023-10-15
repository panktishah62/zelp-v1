import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../../styles';
import { colors } from '../../../../styles/colors';
import { dynamicSize } from '../../../../utils/responsive';

const SearchBar = props => {
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Image
                    style={styles.image}
                    source={require('../../../../assets/images/Subscription/search.png')}
                />
                <Text style={styles.text}>What can we get for you</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        width: dimensions.fullWidth - dynamicSize(40),
        marginTop: dynamicSize(20),
        gap: dynamicSize(10),
        height: dynamicSize(41),
        borderRadius: dynamicSize(32),
        elevation: 5,
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: dynamicSize(25),
        gap: dynamicSize(10),

        flexDirection: 'row',
    },
    image: {
        marginTop: dynamicSize(2),
    },
    text: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
});

export default SearchBar;
