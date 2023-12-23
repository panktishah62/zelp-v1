import React from 'react';
// import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { navigateToScreen } from '../../../utils';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { dynamicSize } from '../../../utils/responsive';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import Heart from '../../../assets/icons/Heart.svg';

const Card = ({ image, marca, produto, preco, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => navigateToScreen('ProductNew')}>
            <ImageBackground
                style={styles.ImageNew}
                source={image}
                imageStyle={{ borderRadius: 5 }}
                resizeMode="contain">
                <View style={styles.Badge}>
                    <Text style={styles.BadgeText}>New</Text>
                </View>
            </ImageBackground>
            <View style={styles.Favorite}>
                <TouchableOpacity
                    style={[
                        {
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 3,
                        },
                        styles.FavoriteButton,
                    ]}>
                    <Heart height={'20'} color={colors.BLACK} />
                    {/* <MaterialIcons name="favorite-border" size={20} color="#9B9B9B" /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.Rate}>
                <TouchableOpacity style={styles.RateStar}>
                    {/* <AntDesign name="staro" size={14} color="#FFBA49" />
          <AntDesign name="staro" size={14} color="#FFBA49" />
          <AntDesign name="staro" size={14} color="#FFBA49" />
          <AntDesign name="staro" size={14} color="#FFBA49" />
          <AntDesign name="staro" size={14} color="#FFBA49" /> */}
                </TouchableOpacity>
                <Text style={styles.RateCount}> (0)</Text>
            </View>
            <View style={styles.ProductDescription}>
                <Text style={styles.Marca}>{marca}</Text>
                <Text style={styles.Description}>{produto}</Text>
                <Text style={styles.Price}>R$ {preco}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: dynamicSize(140),
        margin: 5,
    },
    ImageNew: {
        height: dynamicSize(140),
        padding: 8,
    },
    Badge: {
        width: '35%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK,
        borderRadius: 20,
    },
    BadgeText: {
        color: colors.WHITE,
    },
    Favorite: {
        width: '100%',
        bottom: dynamicSize(73),
        // backgroundColor: colors.BLUE_DARK,
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-end',
    },
    FavoriteButton: {
        backgroundColor: colors.WHITE,
        height: dynamicSize(35),
        width: dynamicSize(35),
        borderRadius: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    Rate: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    RateStar: {
        display: 'flex',
        flexDirection: 'row',
    },
    RateCount: {
        color: '#9b9b9b',
    },
    ProductDescription: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    Marca: {
        color: '#9b9b9b',
    },
    Description: {
        color: colors.GREY_DARK,
        ...fonts.NUNITO_700_14,
    },
    Price: {
        color: colors.BLACK,
        ...fonts.NUNITO_600_14,
    },
});

export default Card;
