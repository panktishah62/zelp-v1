import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import CoffeeOnlyIcon from '../../assets/icons/CoffeeIconWhite.svg';

// const BottomNotificationButton = props => {
//     const { isIcon, titleText, subtitleText, buttonText, onClick } = props;
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.button} onPress={() => onClick()}>
//                 <View style={Styles.row_flex_start}>
//                     {isIcon && (
//                         <View style={styles.innerIconButton}>
//                             <CoffeeOnlyIcon />
//                         </View>
//                     )}
//                     <View style={Styles.margin_05}>
//                         <Text style={styles.titleText}>{titleText}</Text>
//                         {/* <Text style={styles.subtitleText}>{subtitleText}</Text> */}
//                     </View>
//                 </View>
//                 <View style={styles.innerButton}>
//                     <Text style={styles.buttonText}>{buttonText}</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );
// };

const BottomNotificationButton = props => {
    const { isIcon, titleText, subtitleText, buttonText, onClick } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => onClick()}>
                {isIcon && (
                    <View style={styles.innerIconButton}>
                        <CoffeeOnlyIcon height={50} width={50} />
                    </View>
                )}
                <View style={styles.innerButton}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.ORANGE,
        shadowColor: colors.BLACK,
        shadowOpacity: 1,
        shadowRadius: 30,
        shadowOffset: {
            width: 25,
            height: 25,
        },
        elevation: 20,
    },
    button: {
        // height: 51,
        width: 100,
        height: 100,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.ORANGE,
        borderRadius: 50,
        borderColor: colors.WHITE,
        borderWidth: 2,
        // ...Styles.row_space_between,
        // padding: 10,
    },
    innerButton: {
        // width: dimensions.fullWidth * 0.3,
        // height: 29,
        // backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    innerIconButton: {
        // width: 36,
        // height: 40,
        // backgroundColor: colors.ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // borderRadius: 5,
    },
    titleText: {
        ...fonts.NUNITO_700_14,
        color: colors.WHITE,
    },
    subtitleText: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
    },
    buttonText: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
        // marginTop: 5,
    },
});

export default BottomNotificationButton;
