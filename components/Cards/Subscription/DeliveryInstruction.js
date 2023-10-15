import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import PlusCircle from '../../../assets/images/Subscription/PlusCircle.svg';
import { colors } from '../../../styles/colors';
const DeliveryInstruction = props => {
    // const [text, setText] = useState('');
    const { text, setText } = props;
    const [isTextInputOpen, setIsTextInputOpen] = useState(false);
    const addInstructions = () => {
        setIsTextInputOpen(!isTextInputOpen);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.firstContainer}
                onPress={addInstructions}>
                <Text style={styles.firstText}>Add Delivery Instructions</Text>
                <View style={styles.icon}>
                    <PlusCircle />
                </View>
            </TouchableOpacity>
            {isTextInputOpen && (
                <TextInput
                    placeholder={'Add Instructions'}
                    style={styles.textInput}
                    onChange={text_ => setText(text_)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth - dynamicSize(40),
        marginTop: dynamicSize(20),
        backgroundColor: colors.WHITE,

        backgroundColor: colors.WHITE,
        elevation: dynamicSize(8),
        borderRadius: dynamicSize(10),
        width: dimensions.fullWidth - dynamicSize(40),
        // height: dynamicSize(120),
        alignItems: 'center',
        marginHorizontal: dynamicSize(10),
    },
    textInput: {
        borderWidth: dynamicSize(1),
        marginHorizontal: dynamicSize(10),
        marginBottom: dynamicSize(10),
        // padding: dynamicSize(10),
        borderColor: colors.GREY_BORDER,
        borderRadius: dynamicSize(10),
        width: dimensions.fullWidth - dynamicSize(60),
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // backgroundColor: colors.WHITE,
        // elevation: dynamicSize(8),
        // borderRadius: dynamicSize(10),
        width: dimensions.fullWidth - dynamicSize(40),
        height: dynamicSize(57),
        alignItems: 'center',
        marginHorizontal: dynamicSize(10),
        flexDirection: 'row',
    },
    firstText: {
        color: 'rgba(0, 0, 0, 0.50)',
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: 16,
        letterSpacing: -0.28,
    },
    icon: {
        marginRight: 16,
    },
});

export default DeliveryInstruction;
