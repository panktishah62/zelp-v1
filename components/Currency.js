import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const Currency = props => {
    const { currency } = props;
    const typeOfValue = currency?.typeOfValue;
    const value = currency?.value;

    switch (typeOfValue) {
        case 'hex': {
            // Convert hexadecimal to decimal
            const decimalCurrency = parseInt(value, 16);

            // Convert decimal to Unicode character
            const currencySymbol = String.fromCharCode(decimalCurrency);
            return <Text>{currencySymbol}</Text>;
        }
        case 'String': {
            return <Text>{value}</Text>;
        }
        case 'html': {
            // Convert the HTML entity to a Unicode character
            const unicodeSymbol = String.fromCharCode(
                parseInt(value.substring(2), 10),
            );

            return <Text>{unicodeSymbol}</Text>;
        }
        default: {
            return <Text>{'₹'}</Text>;
        }
    }
};

export default Currency;
