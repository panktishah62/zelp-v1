import React, { useEffect, useState } from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(remoteMessage => {
            const { notification, data, messageId } = remoteMessage;
            if (Platform.OS === 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification?.body,
                    title: notification?.title,
                    sound: 'default',
                    userInfo: data?.fcm_options,
                });
            }
        });
        return unsubscribe;
    }, []);
    return null;
};

export default ForegroundHandler;
