import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { routes } from '../redux/constants/routes';
import { Topics } from '../redux/constants/subscriptionTopics';
import PushNotification, { Importance } from 'react-native-push-notification';
import { colors } from '../styles/colors';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { updateUserToken_ } from '../redux/services/userService';

export const configureNotifications = navigateToScreen => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {},

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            if (
                notification.userInteraction &&
                notification?.data?.click_action &&
                routes[notification?.data?.click_action]
            ) {
                navigateToScreen(
                    routes[notification?.data?.click_action],
                    notification?.data,
                );
            }
            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {},

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {},

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
};

export const createChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'notifications', // (required)
            channelName: 'notifications', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            invokeApp: true,
        },
        created => {}, // (optional) callback returns whether the channel was created, false means it already existed.
    );
};

export const updateUserToken = async fcmToken => {
    try {
        await AsyncStorage.getItem('token')
            .then(async authToken => {
                if (authToken && fcmToken) {
                    return await updateUserToken_({ token: fcmToken }).then(
                        response => response?.data,
                    );
                }
            })
            .catch(error => {
                throw Error(error);
            });
    } catch (error) {
        throw Error(error);
    }
};

export async function requestUserPermission() {
    if (Platform.OS === 'android') {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        Topics.map((topic, index) => {
            messaging().subscribeToTopic(topic);
        });
        GetFCMToken();
    }
}

export async function GetFCMToken() {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    let token = await AsyncStorage.getItem('token');

    if (!fcmToken && token) {
        try {
            fcmToken = await generateNewToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmtoken', fcmToken);
            }
        } catch (error) {
            throw Error(error);
        }
    }
    if (fcmToken) {
        await updateUserToken(fcmToken);
    }
}

export async function generateNewToken() {
    return await messaging().getToken();
}

export const NotificationListner = (
    setInitialRouteName,
    setIsLoading,
    navigation,
) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        if (
            navigation &&
            remoteMessage?.data?.click_action &&
            routes[remoteMessage?.data?.click_action]
        ) {
            navigation.navigate(
                routes[remoteMessage.data.click_action],
                remoteMessage.data,
            );
        }
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                if (
                    navigation &&
                    remoteMessage?.data?.click_action &&
                    routes[remoteMessage?.data?.click_action]
                ) {
                    navigation.navigate(
                        routes[remoteMessage.data.click_action],
                        remoteMessage.data,
                    );
                }
            }
        });

    if (setIsLoading) {
        setIsLoading(false);
    }
};
