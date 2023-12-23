import React from 'react';
import Card from '../Card/CardNew';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { dynamicSize } from '../../../utils/responsive';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const CardSection = ({ title, subtitle, data, navigation }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.SectionHeader}>
                <View style={styles.TitleView}>
                    <Text style={styles.Title}>{title}</Text>
                    <Text style={styles.SubTitle}>{subtitle}</Text>
                </View>
                <View style={styles.ViewContainer}>
                    <Text style={styles.ViewAll}>View All</Text>
                </View>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.SectionScrollContainer}>
                {data.map(item => (
                    <Card
                        key={item.key}
                        image={item.image}
                        marca={item.marca}
                        produto={item.produto}
                        preco={item.preco}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {},
    SectionHeader: {
        height: dynamicSize(80),
        width: dimensions.fullWidth,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    TitleView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    Title: {
        ...fonts.NUNITO_700_32,
    },
    SubTitle: {
        color: colors.GREY_MEDIUM,
    },
    ViewContainer: {
        width: dimensions.fullWidth * 0.4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    ViewAll: {},
    SectionScrollContainer: {
        paddingLeft: 5,
        marginRight: 10,
        paddingBottom: dynamicSize(20),
        contentContainerStyle: {
            alignItems: 'center',
            paddingLeft: 16,
            // paddingRight: 10,
        },
    },
    marginTop: 10,
});

export default CardSection;
