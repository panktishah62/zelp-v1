import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    PaperProvider,
    Text,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { hideDialog } from '../../redux/actions/dialog';
import { colors } from '../../styles/colors';

const DefaultDialog = props => {
    const { dialog } = props;
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(dialog?.isVisible);

    const _hideDialog = () => {
        setVisible(false);
        dispatch(hideDialog());
    };
    return (
        dialog && (
            <Portal>
                <Dialog
                    visible={dialog?.isVisible}
                    onDismiss={_hideDialog}
                    style={styles.container}>
                    {dialog?.titleText && (
                        <Dialog.Title>{dialog.titleText}</Dialog.Title>
                    )}
                    {dialog?.subTitleText && (
                        <Dialog.Content>
                            <Text variant="bodyMedium">
                                {dialog.subTitleText}
                            </Text>
                        </Dialog.Content>
                    )}
                    {(dialog?.buttonText1 || dialog?.buttonText2) && (
                        <Dialog.Actions>
                            {dialog?.buttonText1 && (
                                <Button
                                    onPress={
                                        dialog?.buttonFunction1
                                            ? dialog?.buttonFunction1
                                            : _hideDialog
                                    }>
                                    {dialog.buttonText1}
                                </Button>
                            )}
                            {dialog?.buttonText2 && (
                                <Button
                                    onPress={
                                        dialog?.buttonFunction2
                                            ? dialog?.buttonFunction2
                                            : _hideDialog
                                    }>
                                    {dialog.buttonText2}
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
    button: {},
    buttonText: {},
});

export default DefaultDialog;
