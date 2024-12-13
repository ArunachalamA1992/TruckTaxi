import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission({
    alert: true,
    sound: true,
    badge: true,
    provisional: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};

export const getFCMToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("fcmToken",fcmToken);
    console.log("fcmToken",fcmToken);
    console.log("fcmToken",fcmToken);
    console.log("fcmToken",fcmToken);
    
    if (!fcmToken) {
      try {
        const token = await messaging().getToken();
        if (token) {
          console.log("fcmToken",token);
          console.log("fcmToken",token);
          console.log("fcmToken",token);
          console.log("fcmToken",token);
          await AsyncStorage.setItem('fcmToken', token);
        } else {
        }
      } catch (error) {
        console.log('Error fetching token :', error);
      }
    }
  } catch (error) {
    console.log('Catch in getFcmToken  : ', error);
  }
};

export const notificationListener = () => {
  try {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // if (remoteMessage.data.type) {
      //   navigation.navigate(remoteMessage.data.type);
      // }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type);
          // if (remoteMessage.data.type) {
          //   navigation.navigate(remoteMessage.data.type);
          // }
        }
      });
  } catch (error) {
    console.log('error', error);
  }
};
