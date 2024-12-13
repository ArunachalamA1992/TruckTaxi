import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, {Component} from "react";
// import { PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");
import messaging from "@react-native-firebase/messaging"
import { notificationListener } from "./pushnotification_helper";
// import notificationsound from '../../../android/app/src/main/res/raw/notificationtones.wav';


export const LocalNotification = (alarmTime) => {
  PushNotification.createChannel(
    {
      channelId: 'Truck-Taxi-Driver-001', // (required)
      channelName: 'Truck-Taxi-Driver-001',
      date: new Date(Date.now() + 60 * 1000),
      vibrate: true,
      allowWhileIdle: true, 
      soundName: 'trucktaxiaudio',
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  console.log("Notification on foreground state ===========111=========== : ",);
  
  PushNotification.localNotification({
    channelId: 'Truck-Taxi-Driver-001',
    autoCancel: true,
    bigText:
      'Trip Assigned  kindly check the app for more details.',
    subText: 'Trip Assigned',
    title: 'Trip Assigned',
    message: 'Trip Assigned',
    vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'notificationtones.wav',
    // actions: '["Yes", "No"]',
    date: new Date(Date.now() + 60 * 1000),
  });
  console.log("Notification on foreground state ===========222=========== : ",);
};
export const TripendNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'Truck-Taxi-Driver-002', // (required)
      channelName: 'Truck-Taxi-Driver-002',
      vibrate: true,
      soundName: 'notificationtones',

      
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  console.log("Notification on foreground state ===========111=========== : ",);
  
  PushNotification.localNotification({
    channelId: 'Truck-Taxi-Driver-002',
    autoCancel: true,
    bigText:
      'Trip Completed  kindly check the app for more details.',
    subText: 'Trip Completed',
    title: 'Trip Completed',
    message: 'Trip Completed',
    vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'notificationtones.wav',
    // actions: '["Yes", "No"]',
    date: new Date(new Date().getTime() + 3000),
  });
  console.log("Notification on foreground state ===========222=========== : ",);
};
export const TripcancelNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'Truck-Taxi-Driver-003', // (required)
      channelName: 'Truck-Taxi-Driver-003',
      vibrate: true,
      soundName: 'notificationtones',  
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  console.log("Notification on foreground state ===========111=========== : ",);
  
  PushNotification.localNotification({
    channelId: 'Truck-Taxi-Driver-003',
    autoCancel: true,
    bigText:
      'Trip Cancelled  kindly check the app for more details.',
    subText: 'Trip Cancelled',
    title: 'Trip Cancelled',
    message: 'Trip Cancelled',
    vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'notificationtones.wav',
    // actions: '["Yes", "No"]',
    date: new Date(new Date().getTime() + 3000),
  });
  console.log("Notification on foreground state ===========222=========== : ",);
};
export const TripStartNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'Truck-Taxi-Driver-004', // (required)
      channelName: 'Truck-Taxi-Driver-004',
      vibrate: true,
      soundName: 'notificationtones',

      
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  console.log("Notification on foreground state ===========111=========== : ",);
  
  PushNotification.localNotification({
    channelId: 'Truck-Taxi-Driver-004',
    autoCancel: true,
    bigText:
      'Trip Started  kindly check the app for more details.',
    subText: 'Trip Started',
    title: 'Trip Started',
    message: 'Trip Started',
    vibrate: true,
    // vibration: 300,
    // playSound: true,
    // soundName: 'notificationtones.wav',
    // actions: '["Yes", "No"]',
    date: new Date(new Date().getTime() + 3000),
  });
  console.log("Notification on foreground state ===========222=========== : ",);
};
export default class PushController extends Component{
    componentDidMount(){
      PushNotification.configure({
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
          // console.log("NOTIFICATION:", notification);
          // console.log("Message handled in the IN APPP!?????? ",notification);
          // LocalNotification();
          if (notification.userInteraction) {
            console.log("Notification clicked, app opened!");
          } else {
            console.log("Notification received, not clicked.");
            LocalNotification();
          }
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
      
        },
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
        // senderID: "543079367676",
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
      notificationListener()
    }
    render(){
        return null;
    }
}