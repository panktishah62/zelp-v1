import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import PolygonButton from '../../components/Buttons/PolygonButton';
import RestaurantsIcon from '../../assets/icons/RestaurantsHome.svg';

const Landing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.polygonContainer}>
                <View style={styles.restPolygon}>
                    <PolygonButton
                        Icon={RestaurantsIcon}
                        title="Restaurants"
                        onClick={() => {
                            navigation.navigate('Restaurants');
                        }}
                    />
                </View>
                <View style={styles.frokerPolygon}>
                    <PolygonButton
                        Icon={() => {
                            return (
                                <Image
                                    source={require('../../assets/icons/FrokerIcon.png')}
                                    style={styles.frokerIcon}
                                />
                            );
                        }}
                        title="Subscription"
                        onClick={() => {
                            navigation.navigate('Subscription');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: 100,
    },
    polygonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    restPolygon: {
        marginBottom: 100,
    },
    frokerPolygon: {
        marginTop: 100,
    },
    frokerIcon: {
        height: 76,
        width: 76,
    },
});

export default Landing;
