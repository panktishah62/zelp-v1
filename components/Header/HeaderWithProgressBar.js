import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import BackButton from '../../assets/icons/chevron-left.svg';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import ProgressBar from 'react-native-progress/Bar';
import { dynamicSize } from '../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { setProgressBar } from '../../redux/actions/auction';
import { SCREEN_PROGRESS_CONSTANT } from '../../utils';

const HeaderWithProgressBar = props => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const existingProgress = useSelector(state => state.auction.progressBar);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        dispatch(
                            setProgressBar(
                                existingProgress - SCREEN_PROGRESS_CONSTANT,
                            ),
                        );
                        navigation.goBack();
                    }}>
                    <BackButton />
                </TouchableOpacity>
                <Text style={[fonts.NUNITO_700_18, Styles.default_text_color]}>
                    Zelp
                </Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        dispatch(setProgressBar(SCREEN_PROGRESS_CONSTANT));
                        navigation.navigate('Home');
                    }}>
                    <CloseIcon height="15" width="15" />
                </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
                <ProgressBar
                    progress={existingProgress}
                    width={dimensions.fullWidth - dynamicSize(45)}
                    height={8}
                    color={colors.ORANGE}
                    backgroundColor={colors.BORDER_GREY}
                    borderWidth={0}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
        margin: 2,
        paddingBottom: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    closeButton: {
        padding: 10,
        paddingRight: 20,
    },
    backButton: {
        padding: 10,
    },
    progressBar: {
        paddingTop: 10,
        alignItems: 'center',
    },
});

export default HeaderWithProgressBar;
