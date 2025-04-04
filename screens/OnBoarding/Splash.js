import React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import { colors } from '../../styles/colors';

const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Image
                style={styles.image}
                source={require('./../assets/Images/Froker-Logo(O).png')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor:colors.WHITE
        ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
