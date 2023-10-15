import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import HowToStart from './HowToStart';

const MealComponent = props => {
    const bestMealArr = props.bestMealArr;
    const setIsVideoModalVisible = props?.setIsVideoModalVisible;
    const numRows = Math.ceil(bestMealArr?.length / 3);

    const renderRow = (rowData, index) => {
        return (
            bestMealArr && (
                <View style={styles.row} key={index}>
                    {rowData.map((item, index) => (
                        <View style={styles.box} key={index}>
                            {item.imageSource && (
                                <Image
                                    style={styles.imageStyle}
                                    source={{ uri: item.imageSource }}
                                />
                            )}
                            {item.text && (
                                <Text style={styles.itemText}>{item.text}</Text>
                            )}
                        </View>
                    ))}
                </View>
            )
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
                    {bestMealArr &&
                        [...Array(numRows)].map((_, rowIndex) => {
                            const start = rowIndex * 3;
                            const end = start + 3;
                            return renderRow(
                                bestMealArr?.slice(start, end),
                                rowIndex,
                            );
                        })}
                </View>
                <View>
                    <Text style={styles.manyMoreText}>& Many More</Text>
                </View>
                <HowToStart setIsVideoModalVisible={setIsVideoModalVisible} />
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
        ...fonts.NUNITO_800_18,
        paddingHorizontal: 14,
        // fontSize: fonts.NUNITO_500_16.fontSize,
        // fontWeight: fonts.NUNITO_600_16.fontWeight,
        color: colors.DARKER_GRAY,
    },
    changeColor: {
        color: colors.ORANGE_WHITE,
        fontSize: 22,
        fontWeight: 'bold',
    },
    changeLineColor: {
        backgroundColor: colors.ORANGE,
    },
    itemText: {
        color: colors.BLACK,
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
    },
    manyMoreText: {
        color: colors.BLACK,
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
        textAlign: 'center',
    },
    howToStartContainer: {
        display: 'flex',
        width: 254,
        height: 41,
        padding: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // For horizontal alignment of children
        flexWrap: 'wrap', // To allow multiple lines (if needed)
        gap: 5,
        flexShrink: 0,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.ORANGE,
        borderColor: colors.ORANGE_WHITE,
    },
    wrapperHowToStart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    howToStartText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',

        textTransform: 'capitalize',
    },
});

export default MealComponent;
