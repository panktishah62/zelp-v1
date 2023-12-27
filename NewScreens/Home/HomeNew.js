import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import CardSection from '../components/CardSection/CardSection';
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
    FlatList,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { Styles, dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { Button_ } from '../../components/Buttons/Button';
import { TitleContainer } from '../ProductScreen/styles';
import Card from '../components/Card/CardNew';

const HomeNew = ({ navigation }) => {
    const products = [
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
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
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
    ];

    const [sort, setSort] = useState('Price: lowest to high');

    const renderItem = ({ item }) => (
        <Card
            image={item.image}
            brandName={item.marca}
            produtDescription={item.produto}
            price={item.preco}
            navigation={navigation}
        />
    );

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
            <View style={styles.BigBannerContainer}>
                <ImageBackground
                    style={styles.ImageBg}
                    source={bg}
                    resizeMode="cover">
                    <Text style={styles.Title}>
                        Fashion across the world now at your doorstep
                    </Text>
                    <View style={styles.CheckButton}>
                        <Button_
                            text={'Check'}
                            height={35}
                            width={dynamicSize(150)}
                            onClick={() => navigation.navigate('Catalogue')}
                        />
                    </View>
                </ImageBackground>
            </View>
            <CardSection
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
            <CardSection
                title="Flash Sale"
                subtitle="Grab at slashing prices !"
                data={sale_data}
                navigation={navigation}
            />
            <View style={styles.liveShopContainer}>
                <View style={[Styles.row_space_between, styles.TitleContainer]}>
                    <Text style={styles.liveAuc}>Live Auctions</Text>
                    <Text style={styles.viewAll}>Watch All</Text>
                </View>
                <View style={[Styles.row_flex_start]}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.videoContainer}></View>
                        <View style={styles.videoContainer}></View>
                        <View style={styles.videoContainer}></View>
                        <View style={styles.videoContainer}></View>
                    </ScrollView>
                </View>
            </View>
            <View style={productStyles.Container}>
                {/* <View style={productStyles.CategoryContainer}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.CategoryScrollView}>
                        <TouchableOpacity style={styles.CategoryChip}>
                            <Text style={styles.ChipName}>T-Shirts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CategoryChip}>
                            <Text style={styles.ChipName}>T-Shirts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CategoryChip}>
                            <Text style={styles.ChipName}>T-Shirts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CategoryChip}>
                            <Text style={styles.ChipName}>T-Shirts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CategoryChip}>
                            <Text style={styles.ChipName}>T-Shirts</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View> */}
                {/* <View style={productStyles.ConfigContainer}>
                    <TouchableOpacity style={productStyles.Filter}>
                        <MaterialIcons name="filter-list" size={24} color="black" />
                        <Text style={productStyles.Label}>Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={productStyles.Sort}
                        onPress={() => sheetRef.current.snapTo(0)}>
                        <MaterialCommunityIcons
            name="swap-vertical"
            size={24}
            color="black"
          />
                        <Text style={productStyles.Label}>{sort}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={productStyles.Exibition}>
                        <FontAwesome name="th-list" size={24} color="black" />
                    </TouchableOpacity>
                </View> */}
                <FlatList
                    style={styles.ProductList}
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    numColumns={2}
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-between',
                        margin: 5,
                    }}
                />
                {/* <BottomSheet
                ref={sheetRef}
                snapPoints={[210, 0]}
                enabledContentTapInteraction={false}
                initialSnap={1}
                borderRadius={0}
                renderContent={renderContent}
                renderHeader={renderHeader}
            /> */}
            </View>
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
    liveShopContainer: {
        height: dynamicSize(250),
        width: dimensions.fullWidth,
        backgroundColor: colors.RED_PRIMARY,
    },
    ImageBg: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    Title: {
        ...fonts.NUNITO_700_32,
        width: dimensions.fullWidth * 0.5,
        color: colors.WHITE,
    },
    TitleContainer: {
        padding: 10,
    },
    liveAuc: {
        ...fonts.NUNITO_600_16,
        color: colors.GREY_LIGHT,
    },
    viewAll: {
        ...fonts.NUNITO_600_16,
        color: colors.GREY_LIGHT,
    },
    videoContainer: {
        height: dynamicSize(180),
        width: dynamicSize(100),
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: colors.GREY_LIGHT,
        // borderWidth: 1,
    },
    CheckButton: {
        width: dimensions.fullWidth * 0.5,
        height: dynamicSize(35),
        backgroundColor: colors.RED_PRIMARY,
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

const productStyles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BigBannerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: dynamicSize(450),
        width: dimensions.fullWidth,
    },
    liveShopContainer: {
        height: dynamicSize(250),
        width: dimensions.fullWidth,
        backgroundColor: colors.RED_PRIMARY,
    },
    ImageBg: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    Title: {
        ...fonts.NUNITO_700_18,
        width: dimensions.fullWidth * 0.5,
        color: colors.WHITE,
    },
    TitleContainer: {
        padding: 10,
    },
    liveAuc: {
        ...fonts.NUNITO_600_16,
        color: colors.GREY_LIGHT,
    },
    viewAll: {
        ...fonts.NUNITO_600_16,
        color: colors.GREY_LIGHT,
    },
    videoContainer: {
        height: dynamicSize(180),
        width: dynamicSize(100),
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: colors.GREY_LIGHT,
        // borderWidth: 1,
    },
    CheckButton: {
        width: dimensions.fullWidth * 0.5,
        height: dynamicSize(35),
        backgroundColor: colors.RED_PRIMARY,
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
