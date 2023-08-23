import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
    View,
    StyleSheet,
    Button,
    Text,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import { colors } from '../../styles/colors';
import { PrimarySmallButton } from '../Buttons/PrimarySmallButton';
import { Styles } from '../../styles';
const myErrorHandler = error => {
    // Sentry.captureException(error);
    // Do something with the error
    // E.g. reporting errorr using sentry ( see part 3)
};
function ErrorFallback(props) {
    const { error, resetErrorBoundary } = props;
    return (
        <View style={styles.container}>
            <Text style={Styles.default_text_color}>Something went wrong</Text>
            <PrimarySmallButton
                text={'Try Again'}
                onClick={resetErrorBoundary}
            />
        </View>
    );
}

// export const JSExceptionHandler = (e, isFatal) => {
//   Alert.alert(
//     'Something Went Wrong',
//     'We have reported this to our team, please close the app and start again!'
//   );
// };

export const ErrorHandler = ({ children }) => (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        {children}
    </ErrorBoundary>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: colors.ORANGE,
    },
});
