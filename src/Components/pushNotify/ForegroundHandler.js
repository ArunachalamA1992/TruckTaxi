import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import notificationtones from '../../../android/app/src/main/res/raw/notificationtones.wav';

const ForegroundHandler = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'Truck-Taxi-Driver-005', // (required)
        channelName: 'Truck-Taxi-Driver-005', // (required)
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'trucktaxiaudio',
        date: new Date(new Date().getTime() + 3000),
      },
      created => console.log(`CreateChannel returned '${created}'`),
    );
    const unsubcribe = messaging().onMessage(async remoteMessage => {
      // console.log(
      //   'Notification on foreground state ====================== : ',
      //   JSON.stringify(remoteMessage),
      // );
      var {notification, messageId} = remoteMessage;
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'Truck-Taxi-Driver-005',
          autoCancel: true,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          vibrate: true,
          vibration: 300,
          playSound: true,
          date: new Date(new Date().getTime() + 3000),
        });
      }
    });
    return unsubcribe;
  }, []);
  return null;
};

export default ForegroundHandler;
