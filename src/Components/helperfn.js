import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });
export const notificationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('POST_NOTIFICATIONS not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('POST_NOTIFICATIONS Permission denied');
      })
      .catch(error => {
        console.log('Ask POST_NOTIFICATIONS permission error: ', error);
        return reject(error);
      });
  });
  
  // export const notificationPermission = () =>
  //   new Promise(async (resolve, reject) => {
  //     if (Platform.OS === 'ios') {
  //       try {
  //         const permissionStatus = await PushNotification.requestPermissions();
  //         if (permissionStatus.alert || permissionStatus.badge || permissionStatus.sound) {
  //           return resolve('granted');
  //         }
  //         reject('Notification permission not granted');
  //       } catch (error) {
  //         return reject(error);
  //       }
  //     } else {
  //       // For Android, permissions are granted by default, but we check the notification settings
  //       try {
  //         PushNotification.checkPermissions(permissions => {
  //           if (permissions.alert || permissions.badge || permissions.sound) {
  //             return resolve('granted');
  //           } else {
  //             reject('Notification Permission denied');
  //           }
  //         });
  //       } catch (error) {
  //         console.log('Ask Notification permission error: ', error);
  //         return reject(error);
  //       }
  //     }
  //   });