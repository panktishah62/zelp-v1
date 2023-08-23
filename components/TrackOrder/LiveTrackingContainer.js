import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import { dimensions } from '../../styles';
import { getRandomInt, sliceText } from '../../utils';
import BottomNotificationButton from '../Buttons/BottomNotificationButton';

export const LiveTrackingContainer = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const [timeToDeliver, setTimeToDeliver] = useState('');
    useEffect(() => {
        if (currentOrder && currentOrder.orderStatus) {
            if (currentOrder.orderStatus === 'Placed') {
                setTimeToDeliver(`${getRandomInt(30, 60)} mins`);
            } else {
                setTimeToDeliver(currentOrder.timeToDeliver);
            }
        }
    }, [currentOrder]);

    return (
        <View style={styles.container}>
            {currentOrder && currentOrder._id && (
                <BottomNotificationButton
                    isIcon={true}
                    titleText={sliceText(
                        `Order ${currentOrder.orderStatus}`,
                        20,
                    )}
                    subtitleText={timeToDeliver}
                    buttonText="Track Order"
                    onClick={() => {
                        navigation.navigate('TrackOrder', {
                            timeToDeliver: timeToDeliver,
                        });
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth,
    },
});
