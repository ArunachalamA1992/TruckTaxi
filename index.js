/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging"
import TrackPlayer from 'react-native-track-player';
import { LocalNotification } from './src/Components/pushNotify/PushController';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!??????', remoteMessage);
  LocalNotification();

});
TrackPlayer.registerPlaybackService(() => require('./src/Screens/service.js'));
AppRegistry.registerComponent(appName, () => App);
