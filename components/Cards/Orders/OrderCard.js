import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import VegIcon from '../../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../../assets/icons/nonveg.svg';
import { sliceText } from '../../../utils';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import Rupee from '../../../assets/icons/rupee.svg';
import { format, parseISO } from 'date-fns';
import { PrimarySmallButton } from '../../Buttons/PrimarySmallButton';
import OrderCardComponent from './OrderCardComponent';

const OrderCard = props => {
    const { order, navigation } = props;
    return (
        <View>
            <OrderCardComponent order={order} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({});
export default OrderCard;
