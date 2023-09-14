import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const MealComponent = props => {
    const data = [
        {
            id: '1',
            imageSource: require('../../../assets/images/Subscription/salad.png'),
            text: 'Salad',
        },
        {
            id: '2',
            imageSource: require('../../../assets/images/Subscription/Barbeque.png'),
            text: 'Barbecue',
        },
        {
            id: '3',
            imageSource: require('../../../assets/images/Subscription/pancakes.png'),
            text: 'Pancake',
        },
        {
            id: '4',
            imageSource: require('../../../assets/images/Subscription/burgers.png'),
            text: 'Burger',
        },
        {
            id: '5',
            imageSource: require('../../../assets/images/Subscription/Nuggets.png'),
            text: 'Nuggets',
        },
        {
            id: '6',
            imageSource: require('../../../assets/images/Subscription/icecream.png'),
            text: 'IceCream',
        },
    ];

    const numRows = Math.ceil(data.length / 3);

    const renderRow = rowData => {
        return (
            <View style={styles.row}>
                {rowData.map(item => (
                    <View style={styles.box} key={item.id}>
                        <Image
                            style={styles.imageStyle}
                            source={item.imageSource}
                        />
                        <Text style={styles.itemText}>{item.text}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View>
            <View style={styles.wrapperMealText}>
                <View style={styles.bestMealContainer}>
                    <Image
                        source={require('../../../assets/images/Subscription/star.png')}
                    />

                    <Text style={[styles.text, styles.changeColor]}>
                        Best Meal
                    </Text>
                    <View style={styles.horizontalLine} />
                </View>
                <View style={styles.bestMealContainer}>
                    <View
                        style={[styles.horizontalLine, styles.changeLineColor]}
                    />
                    <Text style={styles.text}>You can Choose</Text>

                    <Image
                        source={require('../../../assets/images/Subscription/star.png')}
                    />
                </View>
            </View>
            <View>
                <View style={styles.container}>
                    {[...Array(numRows)].map((_, rowIndex) => {
                        const start = rowIndex * 3;
                        const end = start + 3;
                        return renderRow(data.slice(start, end));
                    })}
                </View>
            <View >
                <Text style={styles.manyMoreText}>& Many More</Text>
            </View>
            <View style={styles.wrapperHowToStart}>
            <View style={styles.howToStartContainer}>
                    <Text style={styles.howToStartText}>How to subscribe & Order</Text>
                    <Image source={require('../../../assets/images/Subscription/play_button.png')}/>
            </View>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    bestMealContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 220,
    },
    wrapperMealText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        margin: 20,
    },
    horizontalLine: {
        flex: 1,
        height: 1,

        backgroundColor: 'black',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10, // Adjust as needed for spacing between rows
    },
    imageStyle: {
        width: 80.89,
        height: 80.89,
        borderRadius: 80.89,
    },
    box: {
        flex: 1,
        margin: 10,
        height: 100,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        paddingHorizontal: 14,
        fontSize: fonts.NUNITO_500_16.fontSize,
        fontWeight: fonts.NUNITO_600_16.fontWeight,
        color: 'black',
    },
    changeColor: {
        color: colors.ORANGE,
        fontSize: 22,
        fontWeight: 'bold',
    },
    changeLineColor: {
        backgroundColor: colors.ORANGE,
    },
    itemText: {
        color: '#000',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
    },
    manyMoreText: {
        color: '#000',
        fontFamily: 'Nunito',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
        textAlign: 'center',
    },
    howToStartContainer:{
        display: 'flex',
      width: 254,
    height: 31,
  padding:3,
   margin:20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // For horizontal alignment of children
    flexWrap: 'wrap', // To allow multiple lines (if needed)
    gap: 5,
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E1740F',
    },
    wrapperHowToStart:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    howToStartText:{
        color: colors.ORANGE,
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
       
        textTransform: 'capitalize',
    }
});

export default MealComponent;
