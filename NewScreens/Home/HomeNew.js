import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import Section from '../components/CardSection/CardSection';
import bg from '../assets/main.png';
import bg2 from '../assets/main2.png';
import img01 from '../assets/produtos/01.png';
import img02 from '../assets/produtos/02.png';
import img03 from '../assets/produtos/03.png';
import img04 from '../assets/produtos/04.png';
import img05 from '../assets/produtos/05.png';
import img06 from '../assets/produtos/06.png';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

const HomeNew = ({ navigation }) => {
    const news_data = [
        {
            key: String(Math.random()),
            image: img01,
            marca: 'Calvin Klein',
            produto: 'T-Shirt Sailing',
            preco: '10,00',
        },
        {
            key: String(Math.random()),
            image: img02,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
        {
            key: String(Math.random()),
            image: img02,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
        {
            key: String(Math.random()),
            image: img02,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
    ];
    const sale_data = [
        {
            key: String(Math.random()),
            image: img04,
            marca: 'Calvin Klein',
            produto: 'T-Shirt Sailing',
            preco: '10,00',
        },
        {
            key: String(Math.random()),
            image: img05,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
        {
            key: String(Math.random()),
            image: img06,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
    ];

    return (
        <ScrollView style={styles.Container}>
            {/* <StatusBar translucent /> */}
            <View style={styles.BigBannerContainer}>
                <ImageBackground
                    style={styles.ImageBg}
                    source={bg}
                    resizeMode="cover">
                    <Text style={styles.Title}>Fashion Sale</Text>
                    <TouchableOpacity style={styles.CheckButton}>
                        <Text style={styles.TextButton}>Check</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <Section
                title="New"
                subtitle="You've never seen before !"
                data={news_data}
                navigation={navigation}
            />
            <View style={styles.ClotheSection}>
                <ImageBackground style={styles.ClotheBg} source={bg2}>
                    <Text style={styles.Title}>Street Clothes</Text>
                </ImageBackground>
            </View>
            <Section
                title="Promoções"
                subtitle="Veja as Promoções aqui!"
                data={sale_data}
                navigation={navigation}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BigBannerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: dynamicSize(450),
        width: dimensions.fullWidth,
    },
    ImageBg: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    Title: {
        ...fonts.NUNITO_700_48,
        width: dimensions.fullWidth * 0.5,
        color: colors.WHITE,
    },
    CheckButton: {
        width: dimensions.fullWidth * 0.5,
        height: dynamicSize(35),
        backgroundColor: '#db3022',
        borderRadius: 40,
        marginBottom: 20,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextButton: {
        color: colors.WHITE,
        ...fonts.NUNITO_600_14,
    },
    ClotheSection: {},
    ClotheBg: {
        height: 200,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
});

export default HomeNew;
