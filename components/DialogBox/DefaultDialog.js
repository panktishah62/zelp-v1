import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    PaperProvider,
    Text,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../redux/actions/dialog';
import { colors, theme } from '../../styles/colors';
import { DialogTypes } from '../../utils';
import { dimensions } from '../../styles';

const DefaultDialog = props => {
    const { dialog } = props;
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(dialog?.isVisible);
    const [type, setType] = React.useState(
        dialog?.type ? dialog.type : DialogTypes.DEFAULT,
    );
    const [primaryColor, setPrimaryColor] = React.useState(colors.WHITE);
    const [primaryColorText, setPrimaryColorText] = React.useState(
        colors.ORANGE,
    );
    const [buttonOpacity, setButtonOpacity] = React.useState(1);

    const [icon, setIcon] = React.useState();

    const _hideDialog = () => {
        setVisible(false);
        dispatch(hideDialog());
    };

    React.useEffect(() => {
        setType(dialog?.type);
        if (dialog?.type === DialogTypes.SUCCESS) {
            setIcon(require('../../assets/icons/success.png'));
            setPrimaryColor('green');
            setPrimaryColorText('white');
            setButtonOpacity(0.7);
        } else if (dialog?.type === DialogTypes.WARNING) {
            setIcon(require('../../assets/icons/warning.png'));
            setPrimaryColor(colors.YELLOW_MUSTARD);
            setPrimaryColorText('white');
            setButtonOpacity(1);
        } else if (dialog?.type === DialogTypes.ERROR) {
            setIcon(require('../../assets/icons/error.png'));
            setPrimaryColor('red');
            setPrimaryColorText('white');
            setButtonOpacity(0.7);
        } else {
            setIcon('');
            setPrimaryColor(colors.WHITE);
            setPrimaryColorText(colors.ORANGE);
            setButtonOpacity(1);
        }
    }, [dialog?.type]);
    return (
        dialog && (
            <Portal>
                <Dialog
                    visible={dialog?.isVisible}
                    onDismiss={_hideDialog}
                    style={styles.container}>
                    {icon && (
                        <Dialog.Content style={styles.iconContainer}>
                            <Image source={icon} style={styles.icon} />
                        </Dialog.Content>
                    )}

                    {dialog?.titleText && (
                        <Dialog.Title
                            style={
                                dialog?.type != DialogTypes.DEFAULT
                                    ? styles.textAlignCenter
                                    : styles.textAlignLeft
                            }>
                            {dialog.titleText}
                        </Dialog.Title>
                    )}
                    {dialog?.subTitleText && (
                        <Dialog.Content>
                            <Text
                                variant="bodyMedium"
                                style={
                                    type != DialogTypes.DEFAULT
                                        ? styles.textAlignCenter
                                        : styles.textAlignLeft
                                }>
                                {dialog.subTitleText}
                            </Text>
                        </Dialog.Content>
                    )}
                    {(dialog?.buttonText1 || dialog?.buttonText2) && (
                        <Dialog.Actions
                            style={
                                type != DialogTypes.DEFAULT
                                    ? styles.buttonCenter
                                    : styles.buttonRight
                            }>
                            {dialog?.buttonText1 && (
                                <Button
                                    onPress={
                                        dialog?.buttonFunction1
                                            ? dialog?.buttonFunction1
                                            : _hideDialog
                                    }
                                    style={
                                        type != DialogTypes.DEFAULT
                                            ? [
                                                  styles.buttonPrimary,
                                                  {
                                                      backgroundColor:
                                                          primaryColor,
                                                      opacity: buttonOpacity,
                                                  },
                                              ]
                                            : styles.buttonSecondary
                                    }>
                                    <Text
                                        style={
                                            type != DialogTypes.DEFAULT
                                                ? [
                                                      styles.buttonTextPrimary,
                                                      {
                                                          color: primaryColorText,
                                                      },
                                                  ]
                                                : styles.buttonTextSecondary
                                        }>
                                        {dialog.buttonText1}
                                    </Text>
                                </Button>
                            )}
                            {dialog?.buttonText2 && (
                                <Button
                                    onPress={
                                        dialog?.buttonFunction2
                                            ? dialog?.buttonFunction2
                                            : _hideDialog
                                    }
                                    style={
                                        type != DialogTypes.DEFAULT
                                            ? [
                                                  styles.buttonPrimary,
                                                  {
                                                      backgroundColor:
                                                          primaryColor,
                                                      opacity: buttonOpacity,
                                                  },
                                              ]
                                            : styles.buttonSecondary
                                    }>
                                    <Text
                                        style={
                                            type != DialogTypes.DEFAULT
                                                ? [
                                                      styles.buttonTextPrimary,
                                                      {
                                                          color: primaryColorText,
                                                      },
                                                  ]
                                                : styles.buttonTextSecondary
                                        }>
                                        {dialog.buttonText2}
                                    </Text>
                                </Button>
                            )}
                        </Dialog.Actions>
                    )}
                </Dialog>
            </Portal>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    titleText: {},
    subTitleText: {},
    buttonPrimary: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        width: dimensions.fullWidth / 3,
        opacity: 0.7,
    },
    buttonSecondary: {
        backgroundColor: colors.WHITE,
    },
    buttonTextPrimary: {
        color: colors.WHITE,
    },
    buttonTextSecondary: {
        color: colors.ORANGE,
    },
    iconContainer: {
        height: 50,
        alignItems: 'center',
    },
    icon: {
        height: 50,
        width: 50,
    },
    textAlignLeft: {
        textAlign: 'left',
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    buttonCenter: {
        justifyContent: 'space-evenly',
    },
    buttonRight: {},
});

export default DefaultDialog;
