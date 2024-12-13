import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, LogBox, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './Splash';
import HomeScreen from './Screens/Home/HomeScreen';
import LoginScreen from './Screens/Auth/Login';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import {StatusBar} from 'react-native';
import Color from './Config/Color';
import FeedbackScreen from './Screens/Content/Feedback';
import PrivacyScreen from './Screens/Content/Privacy';
import TermsConditionScreen from './Screens/Content/Terms';
import ContactUsScreen from './Screens/Content/ContactUs';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import SettingScreeen from './Screens/Menu/Settings';
import MapScreen from './Screens/Home/MapScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from './Redux/Store';
import {NavigationDrawerStructure} from './Components/Nav/NavDrawer';
import NotificationScreen from './Screens/Home/NotificationScreen';
import AllRecentTripScreen from './Screens/Home/AllRecentTrips';
import TutorialScreen from './Screens/Content/Tutorial';
import TripHistoryScreen from './Screens/Content/TripHistory';
import {
  setMonthlyTrip,
  setRefresh,
  settriptimerAction,
  setWeeklyTrip,
} from './Redux';
import TripOTPScreen from './Screens/Home/TripOTP';
import PushController from './Components/pushNotify/PushController';
import ForegroundHandler from './Components/pushNotify/ForegroundHandler';
import {requestUserPermission} from './Components/pushNotify/pushnotification_helper';
import MapDirectionScreen from './Screens/Home/MapDirection';
import {useTranslation} from 'react-i18next';
import '.././src/Translation';
import Profile from './Screens/Menu/Profile';
import fetchData from './Config/fetchData';
import {Badge} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCurrentLocation,
  locationPermission,
  notificationPermission,
} from './Components/helperfn';
import Geolocation from 'react-native-geolocation-service';
import {getlocation} from './Components/getCurrentlocation/getCurrentlocation';
import ChatScreen from './Screens/Content/ChatScreen';
import TimerComponent from './Components/Triptimer/Timer';
// import { Audioplayer } from './Components/audioplayer/audioplayer';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: Color.cloudyGrey,
          drawerActiveTintColor: '#814399',
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="HomeDrawer"
          component={MainApp}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MainStack />
    </Provider>
  );
};

export const MainApp = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const TripHistorySwitch = useSelector(state => state.TripReducer.TripHistory);
  const TripAssigned = useSelector(state => state.TripReducer.TripDetails);
  const weeklyVisible = useSelector(state => state.TripReducer.WeeklyTrip);
  const TripTimerAction = useSelector(
    state => state.TripReducer.TriptimerAction,
  );
  const [getData, setGetData] = useState([]);
  // const [is_display, setDisplay] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid} = userData;
  const Sendlocation = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    // <=============== Start Timer===================>
    const Tripvalue = await AsyncStorage.getItem('TripTimer');
    if (Tripvalue == null) {
      setDisplay(false);
      console.log(Tripvalue, 'TripTimeTripTimerActionrAction');
      dispatch(settriptimerAction(null));
    } else {
      setDisplay(true);
      const Tripvalue11 = JSON.parse(Tripvalue);
      console.log(Tripvalue11, 'TripTimeTripTimerActionrAction');

      dispatch(settriptimerAction(Tripvalue11));
    }
    // <=============== End Timer===================>
    const Onduty = JSON.parse(value);
    // console.log(Tripvalue,'TripTimeTripTimerActionrAction');
    if (Onduty?.statuscode == 11 || Onduty?.statuscode == 3) {
      r;
      setInterval(() => {
        getlocation(userData);
      }, 300000);
    }
  };
  useEffect(() => {
    requestUserPermission();
    notificationPermission();
    Sendlocation();
  }, []);

  const getNotificationData = async () => {
    try {
      var data = 'cabid=' + cabid;
      const notifyData = await fetchData.notification(data);
      if (notifyData.status == 200) {
        // console.log(notifyData,'====');

        setGetData(notifyData.data);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  useEffect(() => {
    const notify = setInterval(() => {
      getNotificationData();
      unreadNotify();
      // Audioplayer(true);
    }, 2000);
    return () => {
      clearInterval(notify);
    };
  }, [getData, userData, unreadCount]);

  const [unreadCount, setUnreadCount] = useState(0);

  const unreadNotify = async () => {
    let unreadNotifications = getData.filter(
      notification => !notification.read,
    );
    setUnreadCount(unreadNotifications.length);
  };

  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
      {/* {TripTimerAction?.is_diplay == true ? <TimerComponent start={TripTimerAction?.start} stop={TripTimerAction?.stop} reset={TripTimerAction?.reset}/> :null} */}
      <ForegroundHandler />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: t('Dashboard'),
            headerTintColor: Color.white,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Color.primary,
              elevation: 0,
            },
            headerLeft: () => (
              <NavigationDrawerStructure navigation={navigation} />
            ),
            headerRightContainerStyle: {right: 20},
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{marginHorizontal: 20}}
                  onPress={() => navigation.navigate('notify')}>
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      right: -10,
                      top: -10,
                    }}>
                    <Badge style={{color: Color.white}}>{unreadCount}</Badge>
                  </View>
                  <MIcon
                    name="notifications-active"
                    color={Color.white}
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(setRefresh(true))}>
                  <FIcon name="refresh" color={Color.white} size={25} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="notify"
          component={NotificationScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Notification List',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="recentTrips"
          component={AllRecentTripScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Recent Trips',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="TripOTP"
          component={TripOTPScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Trip OTP',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({navigation, route}) => ({
            headerTitle: 'ChatScreen',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        {/* <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Give FeedBack',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        /> */}
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
          options={({navigation, route}) => ({
            headerTitle: t('Tutorial'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="TripHistory"
          component={TripHistoryScreen}
          options={({navigation, route}) => ({
            headerTitle: t('MyTrips'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary, elevation: 0},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <>
                {TripHistorySwitch && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setWeeklyTrip(!weeklyVisible));
                        !weeklyVisible && dispatch(setMonthlyTrip(true));
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#DDFFDF',
                          textAlign: 'center',
                          padding: 5,
                          borderRadius: 50,
                          fontWeight: 'bold',
                        }}>
                        {weeklyVisible ? t('Week') : t('Month')}
                      </Text>
                      {weeklyVisible ? (
                        <MIcon name="view-week" size={30} color={Color.white} />
                      ) : (
                        <MIcon
                          name="date-range"
                          size={30}
                          color={Color.white}
                        />
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </>
            ),
            headerRightContainerStyle: {right: 10},
          })}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={({navigation, route}) => ({
            headerTitle: t('PrivacyPolicy'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Terms"
          component={TermsConditionScreen}
          options={({navigation, route}) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Contactus"
          component={ContactUsScreen}
          options={({navigation, route}) => ({
            headerTitle: t('ContactUs'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="settings"
          component={SettingScreeen}
          options={({navigation, route}) => ({
            headerTitle: t('Settings'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({navigation, route}) => ({
            headerTitle: t('Profile'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRightContainerStyle: {marginRight: 20},
          })}
        />
        <Stack.Screen
          name="maps"
          component={MapScreen}
          options={({navigation, route}) => ({
            headerTitle: t('tripdetails'),
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="mapDirection"
          component={MapDirectionScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Maps',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
      <PushController />
    </>
  );
};

export default App;
