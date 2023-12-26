import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';

const CategoriesNew = ({ navigation }) => {
    const list_items = [
        {
            key: String(Math.random()),
            name: 'Tops',
        },
        {
            key: String(Math.random()),
            name: 'Shirts & Blouses',
        },
        {
            key: String(Math.random()),
            name: 'Cardigans & Sweaters',
        },
        {
            key: String(Math.random()),
            name: 'Knitwear',
        },
        {
            key: String(Math.random()),
            name: 'Blazers',
        },
        {
            key: String(Math.random()),
            name: 'Outerwear',
        },
        {
            key: String(Math.random()),
            name: 'Pants',
        },
        {
            key: String(Math.random()),
            name: 'Jeans',
        },
        {
            key: String(Math.random()),
            name: 'Shorts',
        },
        {
            key: String(Math.random()),
            name: 'Skirts',
        },
        {
            key: String(Math.random()),
            name: 'Dresses',
        },
        {
            key: String(Math.random()),
            name: 'Shoes',
        },
    ];
    const handleItem = () => {
        navigation.navigate('Catalogue');
    };

    const navigateCategory = () => {
        navigation.navigate('Catalogue');
    };
    return (
        <View style={styles.Container}>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    onPress={navigateCategory}
                    style={styles.ViewAllButton}>
                    <Text style={styles.ViewAllText}>View All</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.Label}>Choose a Category:</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.CategoryScroll}>
                {list_items.map(item => (
                    <TouchableOpacity
                        style={styles.ListItem}
                        onPress={handleItem}
                        key={item.key}>
                        <Text style={styles.ListItemText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ButtonContainer: {
        height: dynamicSize(60),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 8,
    },
    ViewAllButton: {
        height: '100%',
        width: '95%',
        backgroundColor: '#db3022',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewAllText: {
        color: colors.WHITE,
    },
    Label: {
        color: '#9b9b9b',
        ...fonts.NUNITO_500_14,
        padding: dynamicSize(15),
    },
    CategoryScroll: {
        flex: 1,
    },
    ListItem: {
        height: dynamicSize(50),
        display: 'flex',
        justifycontent: 'center',
        paddingLeft: dynamicSize(15),
    },
    ListItemText: {
        ...fonts.NUNITO_600_16,
    },
});

export default CategoriesNew;
