import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';

const AddressChip = ({ addressType, selected, setSelected }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                setSelected(addressType);
            }}
            style={{
                ...Styles.center,
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginRight: 10,
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: selected ? colors.ORANGE : '#00000060',
                backgroundColor: colors.WHITE,
            }}>
            <Text
                style={{
                    ...fonts.NUNITO_700_14,
                    color: selected ? colors.ORANGE : colors.GREY_DARK,
                    ...fonts.NUNITO_700_14,
                }}>
                {addressType}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default AddressChip;
