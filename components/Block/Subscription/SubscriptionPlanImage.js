import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions } from '../../../styles';

const SubscriptionPlanImage = props => {
    const uri = props.image
    return (
        <View style={styles.wrapperContainer}>
            <View style={styles.container}>
                {uri && <Image style={styles.image} source={{ uri }} />}
                {!uri && <Image style={styles.image} source={require('../../../assets/images/Subscription/food_item_3.png')} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth - 40,
    },
    image: {
        width: 361.825,
        height: 175,

    }
})

export default SubscriptionPlanImage;