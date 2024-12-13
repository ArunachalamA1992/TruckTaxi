import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  Dimensions,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import Color from '../../Config/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveLogin,
  setAsyncTrip,
  setMapTotalDistance,
  setNotificationTrip,
  setPreviousDistance,
  setRefresh,
  setTripAssignDetails,
  setTripAssignModalVisible,
  setTripCompleteData,
  setTripCoordinates,
  setTripMapStart,
  setTripRemoveDetails,
  settriptimerAction,
  setUserData,
} from '../../Redux';
import {Media} from '../../Global/Media';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MeterReadingModal from '../../Components/MeterReadingModal';
import moment from 'moment';
import fetchData from '../../Config/fetchData';
import ActiveModal from '../../Components/ActiveLoginModal';
import SkeletonPage from './SkeletonPage';
import DeviceInfo from 'react-native-device-info';
import {common_fn} from '../../Config/common_fn';
import LeaveRequestModal from '../../Components/LeaveRequestModal';
import PermissionModal from '../../Components/PermissionModal';
import TripCompletedModal from '../../Components/TripCompletedModel';

import {useTranslation} from 'react-i18next';
import '../../Translation';
import {
  LocalNotification,
  TripcancelNotification,
  TripendNotification,
} from '../../Components/pushNotify/PushController';
import {getlocation} from '../../Components/getCurrentlocation/getCurrentlocation';
import {getFCMToken} from '../../Components/pushNotify/pushnotification_helper';

const {width, height} = Dimensions.get('screen');
const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [driverloading, setDriverLoading] = useState(false);
  // const [code, setCode] = useState('');
  // const [isPinReady, setIsPinReady] = useState(false);
  const [statusCode, setStatusCode] = useState({});
  const [tripsCount, setTripsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [uniqueId, setUniqueId] = useState('');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // const [expanded, setExpanded] = useState(false);
  const [leaveVisible, setLeaveVisible] = useState(false);
  const [permissionVisible, setPermissionVisible] = useState(false);
  // const [otpVisible, setOtpVisible] = useState({
  //   visible: false,
  //   otpData: {},
  // });

  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripAssigned = useSelector(state => state.TripReducer.TripDetails);
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  const userData = useSelector(state => state.UserReducer.userData);
  const loading = useSelector(state => state.UserReducer.refresh);
  const TripCompleteList = useSelector(state => state.TripReducer.TripComplete);
  const ActiveLogin = useSelector(state => state.UserReducer.ActiveLogin);
  const TripComplete = useSelector(state => state.TripReducer.TripComplete);
  var {completed} = TripComplete;
  // console.log('completed', TripComplete);

  var {AssignedId, TripStarted, TripStoped, TripCompleted, otpcode} = TripStart;
  var {cabid, driverid, drivername, cityid, drivermobno, cabno} = userData;
  var {ActiveLoginData, ActiveLoginModal} = ActiveLogin;
  const [amount, setAmount] = useState('00');
  const [totalTrips, settotalTrips] = useState('00');

  const dispatch = useDispatch();
  const [section] = useState([
    {id: 1, title: 'driver status', data: ['driver status']},
    {id: 2, title: 'trip status', data: ['trip status']},
    {id: 3, title: 'banner', data: ['banner']},
    {id: 4, title: 'recent trip', data: ['recent trip']},
    {id: 5, title: 'completed trip', data: ['completed trip']},
  ]);
  const getTripData = async () => {
    try {
      const value = await AsyncStorage.getItem('TripState');
      if (value !== null) {
        dispatch(setAsyncTrip(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
      getFCMToken();
      // console.log(uniqueId, '+++++>');
    });
  }, [uniqueId]);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('login');
      if (value !== null) {
        // console.log('====================================');
        // console.log(value, 'userDataEEuserDataEE');
        // console.log('====================================');
        dispatch(setUserData(JSON.parse(value)));
        console.log('userData', JSON.parse(value));
      }
    } catch (e) {
      console.log('catch in getUserData : ', e);
    }
  };

  useEffect(() => {
    getTripData();
    getUserData();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'online'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getDailyStatus = async () => {
    try {
      const DailyStatus = await fetchData.dailtStatus({
        cabid: cabid,
        cityid: cityid,
        deviceid: uniqueId,
      });
      console.log(
        'llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll',
        DailyStatus,
      );

      if (DailyStatus.status == 200) {
        if (statusCode?.driverstatus != DailyStatus?.driverstatus) {
          setDriverLoading(true);
        }
        const interval = setTimeout(async () => {
          setDriverLoading(false);
        }, 3000);
        setTripsCount(DailyStatus?.tripscount);
        setTotalAmount(DailyStatus?.totalamt);
        await AsyncStorage.setItem(
          'Active_Login_status',
          JSON.stringify(DailyStatus),
        );
        return () => clearInterval(interval);
      } else {
        console.log('No Daily Status Changed', DailyStatus);
      }
    } catch (error) {
      console.log('Catch in getDailyStatus : ', error);
    }
  };
  const statusData = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    // console.log(JSON.parse(value),'++++JSON.parse(value)++>');
    setStatusCode(JSON.parse(value));
  };
  useEffect(() => {
    if (loading) {
      const interval = setTimeout(async () => {
        dispatch(setRefresh(false));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loading]);
  const getBookingDetails = async () => {
    try {
      var data =
        'cabid=' +
        cabid +
        '&cityid=' +
        cityid +
        '&bookingid=' +
        statusCode?.tripid;
      const getBookingDetails = await fetchData.getbookingdeatails(data);
      if (
        statusCode?.statuscode == 2 &&
        getBookingDetails?.tripstatuscode == 0
      ) {
        console.log(statusCode, 'statusCode=====>');
        navigation.navigate('TripHistory', {
          bookingData: getBookingDetails,
          statusCode: statusCode,
        });
        dispatch(setTripAssignModalVisible(true));
        dispatch(
          setTripMapStart({
            TripStarted: false,
            AssignedId: 0,
            initialSpeedometer: 0,
            finalSpeedometer: 0,
            otpcode: 0,
            startImage: '',
            endImage: '',
            TripStoped: false,
            TripCompleted: false,
            startTripdate: '',
          }),
        );
        dispatch(settriptimerAction(null));
        dispatch(
          setNotificationTrip({
            item: {
              assignId: getBookingDetails.bookingid,
              fromdistrict: '',
              pickup: getBookingDetails.fromloc,
              drop: getBookingDetails.toloc,
              fromloclat: getBookingDetails.fromloclat,
              fromloclong: getBookingDetails.fromloclong,
              toloclat: getBookingDetails.toloclat,
              toloclong: getBookingDetails.toloclong,
              todistrict: '',
              status: getBookingDetails.tripstatus,
              date: getBookingDetails.tripdatetime,
              distance: 0,
              time: '',
              amount: getBookingDetails.total,
              number: getBookingDetails.customermobno,
              customerName: getBookingDetails.customername,
            },
          }),
        );
      } else {
        dispatch(setTripAssignModalVisible(false));
      }
    } catch (error) {
      console.log('Catch in getBookingDetails : ', error);
    }
  };
  // console.log(statusCode?.statuscode);
  useEffect(() => {
    dispatch(setRefresh(true));
    const interval = setTimeout(async () => {
      dispatch(setRefresh(false));
      getDailyStatus();
      setDriverLoading(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const getResumeDuty = async () => {
    try {
      const resumeDuty = await fetchData.resume({cabid: cabid});
      if (resumeDuty?.status == 200) {
        common_fn.showToast(resumeDuty?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      statusData();
      getDailyStatus();
      getFareTrips();
    }, 3000);
    if (statusCode?.statuscode == 2) {
      getBookingDetails();
    }
    if (
      Object.values(TripAssigned)?.length > 0 &&
      statusCode?.statuscode === 11
    ) {
      dispatch(setTripCompleteData({completed: true, tripstatus: true}));
      // TripendNotification();
      dispatch(
        setTripRemoveDetails({
          item: {
            assignId: TripAssigned[0]?.assignId,
            fromdistrict: '',
            pickup: TripAssigned[0]?.pickup,
            drop: TripAssigned[0]?.drop,
            fromloclat: TripAssigned[0]?.fromloclat,
            fromloclong: TripAssigned[0]?.fromloclong,
            toloclat: TripAssigned[0]?.toloclat,
            toloclong: TripAssigned[0]?.toloclong,
            todistrict: '',
            status: statusCode?.tripstatus,
            date: TripAssigned[0]?.date,
            distance: 0,
            time: '',
            amount: TripAssigned[0]?.total,
            number: TripAssigned[0]?.number,
            customerName: TripAssigned[0]?.customerName,
          },
        }),
      );
      dispatch(
        setTripMapStart({
          TripCompleted: false,
          TripStoped: false,
          TripStarted: false,
          AssignedId: AssignedId,
          initialSpeedometer: '',
          otpcode: 0,
          finalSpeedometer: '',
          startImage: '',
          endImage: '',
          startTripdate: '',
        }),
      );
      dispatch(
        setMapTotalDistance({
          totalDistance: 0,
          destinationReached: false,
        }),
      );
      dispatch(
        setPreviousDistance({
          previous: 0,
          current: 0,
        }),
      );
      dispatch(
        setTripCoordinates({
          triplatitude: 0,
          triplongitude: 0,
        }),
      );
    } else if (
      Object.values(TripAssigned)?.length > 0 &&
      statusCode?.statuscode === 5
    ) {
      dispatch(setTripCompleteData({completed: true, tripstatus: false}));
      // TripcancelNotification();
      dispatch(
        setTripRemoveDetails({
          item: {
            assignId: TripAssigned[0]?.assignId,
            fromdistrict: '',
            pickup: TripAssigned[0]?.pickup,
            drop: TripAssigned[0]?.drop,
            fromloclat: TripAssigned[0]?.fromloclat,
            fromloclong: TripAssigned[0]?.fromloclong,
            toloclat: TripAssigned[0]?.toloclat,
            toloclong: TripAssigned[0]?.toloclong,
            todistrict: '',
            status: statusCode?.tripstatus,
            date: TripAssigned[0]?.date,
            distance: 0,
            time: '',
            amount: TripAssigned[0]?.total,
            number: TripAssigned[0]?.number,
            customerName: TripAssigned[0]?.customerName,
          },
        }),
      );
      dispatch(
        setTripMapStart({
          TripCompleted: false,
          TripStoped: false,
          TripStarted: false,
          AssignedId: AssignedId,
          initialSpeedometer: '',
          otpcode: 0,
          finalSpeedometer: '',
          startImage: '',
          endImage: '',
          startTripdate: '',
        }),
      );
      dispatch(
        setMapTotalDistance({
          totalDistance: 0,
          destinationReached: false,
        }),
      );
      dispatch(
        setPreviousDistance({
          previous: 0,
          current: 0,
        }),
      );
      dispatch(
        setTripCoordinates({
          triplatitude: 0,
          triplongitude: 0,
        }),
      );
    }
    return () => clearInterval(interval);
  }, [statusCode]);
  const getFareTrips = async () => {
    try {
      var data = 'cabid=' + cabid;
      const showfareAmount = await fetchData.weekSummary(data);
      if (showfareAmount?.status == 200) {
        setAmount(showfareAmount.Earnings);
        settotalTrips(showfareAmount.Totaltrips);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const Getnotification = async () => {
    try {
      // const alarmTime = new Date(Date.now() + 60 * 1000);
      LocalNotification();
    } catch (error) {
      console.log('error', error);
    }
  };
  const Setitem = async () => {
    await AsyncStorage.setItem('TripTimer', JSON.stringify(null));
    dispatch(settriptimerAction(null));
  };
  // //  <=============== Start Timer===================>
  //   const setStartTimer = async() => {
  //     console.log("Started TImer");
  //     const value ={
  //           start:true,
  //           stop:false,
  //           reset:false,
  //           is_diplay:true
  //         }
  //         await AsyncStorage.setItem('TripTimer', JSON.stringify(value));
  //         dispatch(settriptimerAction(value));
  //   }
  //   const setEndStart = async() => {
  //     console.log("Stop TImer");
  //     await AsyncStorage.setItem('TripTimer', JSON.stringify(null));
  //       dispatch(settriptimerAction(null));

  //   }
  // // <=============== End Timer===================>
  // { console.log(TripAssigned,"TripAssignedTripAssigned");}
  return (
    <View style={{flex: 1, backgroundColor: theme ? Color.black : Color.white}}>
      {loading || driverloading ? (
        <SkeletonPage />
      ) : (
        <>
          <SectionList
            sections={section}
            scrollEnabled={true}
            keyExtractor={(item, index) => item + index}
            scrollEventThrottle={16}
            initialNumToRender={5}
            renderItem={({item}) => {
              switch (item) {
                case 'driver status':
                  return (
                    <View
                      style={{
                        backgroundColor: Color.primary,
                        height: 220,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          top: 100,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          alignItems: 'center',
                        }}>
                        {!theme ? (
                          <Image
                            source={Media.Donut}
                            style={{height: 300, resizeMode: 'contain'}}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/DonutBlack.png')}
                            style={{height: 300, resizeMode: 'contain'}}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          marginTop: 20,
                          backgroundColor: theme ? Color.black : Color.white,
                          width: '90%',
                          borderRadius: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                          }}>
                          <Image
                            source={Media.User}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 100,
                            }}
                          />
                          <View style={{marginLeft: 10, flex: 1}}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: theme ? Color.white : Color.black,
                                fontWeight: '600',
                                marginVertical: 5,
                              }}
                              numberOfLines={2}>
                              {drivername}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: theme ? Color.white : Color.lightBlack,
                                fontWeight: '600',
                                marginVertical: 5,
                              }}>
                              {driverid}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              padding: 5,
                              paddingHorizontal: 15,
                              borderRadius: 10,
                              marginLeft: 5,
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color:
                                  statusCode?.statuscode == 2
                                    ? '#ffd466'
                                    : statusCode?.statuscode == 10
                                    ? '#da2b2e'
                                    : statusCode?.statuscode == 3
                                    ? '#ffd466'
                                    : statusCode?.statuscode == 11
                                    ? '#6fc940'
                                    : statusCode?.statuscode == 15
                                    ? '#c27ba0'
                                    : statusCode?.statuscode == 1
                                    ? '#F7A02F'
                                    : statusCode?.statuscode == 13
                                    ? '#3d85c6'
                                    : statusCode?.statuscode == 16
                                    ? Color.red
                                    : '#3f9143',
                                fontWeight: '600',
                                alignItems: 'center',
                                marginVertical: 5,
                                textAlign: 'center',
                              }}
                              numberOfLines={2}>
                              {/* {console.log(statusCode,'++++')} */}
                              {statusCode?.driverstatus || 'Logout'}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: theme ? Color.white : Color.lightBlack,
                                fontWeight: '600',
                                marginVertical: 5,
                              }}>
                              {cabno}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#763F8B',
                            borderBottomLeftRadius: 10,
                            padding: 10,
                            borderBottomRightRadius: 10,
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: Color.white,
                              fontWeight: '600',
                            }}>
                            {t('LoggedIn')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.white,
                              fontWeight: '600',
                            }}>
                            {moment(new Date()).format('LL')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                case 'trip status':
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          marginVertical: 20,
                          zIndex: 1,
                          marginTop: -40,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            shadowColor: Color.black,
                            backgroundColor: theme
                              ? Color.lightBlack
                              : Color.white,
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 1.41,
                            elevation: 8,
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginHorizontal: 10,
                            paddingVertical: 15,
                          }}>
                          <MCIcon
                            name="truck-fast-outline"
                            size={40}
                            color={Color.primary}
                          />
                          <View
                            style={{
                              marginHorizontal: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.primary,
                                fontWeight: 'bold',
                              }}>
                              {t('TotalRide')}
                            </Text>
                            <Text
                              style={{
                                fontSize: 20,
                                color: Color.primary,
                                fontWeight: 'bold',
                              }}>
                              {totalTrips ? totalTrips : '----'}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            shadowColor: Color.black,
                            backgroundColor: theme
                              ? Color.lightBlack
                              : '#9B53B7',
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 1.41,
                            elevation: 8,
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginHorizontal: 10,
                            paddingVertical: 15,
                          }}>
                          <Icon
                            name="wallet-outline"
                            color={Color.white}
                            size={40}
                          />
                          <View style={{marginHorizontal: 20}}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.white,
                                fontWeight: '600',
                              }}>
                              {t('Wallet')}
                            </Text>
                            <Text
                              style={{
                                fontSize: 20,
                                color: Color.white,
                                fontWeight: 'bold',
                              }}>
                              ₹ {amount ? amount : '----'}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'space-evenly',
                          marginVertical: 20,
                        }}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          disabled={
                            statusCode?.statuscode != 10 &&
                            statusCode?.statuscode != 11 &&
                            statusCode?.statuscode != 15
                          }
                          onPress={() => {
                            dispatch(
                              setActiveLogin({
                                ActiveLoginModal: true,
                                ActiveLoginData: statusCode,
                              }),
                            );
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              backgroundColor:
                                statusCode?.statuscode == 2
                                  ? '#ffd466'
                                  : statusCode?.statuscode == 10
                                  ? '#da2b2e'
                                  : statusCode?.statuscode == 3
                                  ? '#ffd466'
                                  : statusCode?.statuscode == 11
                                  ? '#6fc940'
                                  : statusCode?.statuscode == 15
                                  ? '#c27ba0'
                                  : statusCode?.statuscode == 1
                                  ? '#F7A02F'
                                  : statusCode?.statuscode == 13
                                  ? '#3d85c6'
                                  : statusCode?.statuscode == 16
                                  ? Color.red
                                  : '#3f9143',
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              shadowColor: Color.black,
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,
                              elevation: 8,
                            }}>
                            {statusCode?.statuscode == 3 ||
                            statusCode?.statuscode == 4 ||
                            statusCode?.statuscode == 2 ||
                            statusCode?.statuscode == 19 ||
                            statusCode?.statuscode == 18 ||
                            statusCode?.statuscode == 17 ? (
                              <SLIcon
                                name={
                                  statusCode?.statuscode == 3
                                    ? 'user-following'
                                    : statusCode?.statuscode == 4
                                    ? 'user-follow'
                                    : statusCode?.statuscode == 2
                                    ? 'user-follow'
                                    : 'hourglass'
                                }
                                size={25}
                                color={Color.white}
                              />
                            ) : (
                              <MCIcon
                                name={
                                  statusCode?.statuscode == 10
                                    ? 'logout'
                                    : statusCode?.statuscode == 15
                                    ? 'logout'
                                    : statusCode?.statuscode == 1
                                    ? 'account-clock-outline'
                                    : statusCode?.statuscode == 11
                                    ? 'clock-in'
                                    : statusCode?.statuscode == 13
                                    ? 'account-clock-outline'
                                    : statusCode?.statuscode == 16 &&
                                      'block-helper'
                                }
                                size={
                                  statusCode?.statuscode == 11 ||
                                  statusCode?.statuscode == 13
                                    ? 30
                                    : 25
                                }
                                color={Color.white}
                              />
                            )}
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginVertical: 10,
                              textAlign: 'center',
                              marginHorizontal: 5,
                              color: theme
                                ? Color.white
                                : statusCode?.statuscode == 2
                                ? '#ffd466'
                                : statusCode?.statuscode == 10
                                ? '#da2b2e'
                                : statusCode?.statuscode == 3
                                ? '#ffd466'
                                : statusCode?.statuscode == 11
                                ? '#6fc940'
                                : statusCode?.statuscode == 15
                                ? '#c27ba0'
                                : statusCode?.statuscode == 1
                                ? '#F7A02F'
                                : statusCode?.statuscode == 13
                                ? '#3d85c6'
                                : statusCode?.statuscode == 16
                                ? Color.red
                                : '#3f9143',
                            }}
                            numberOfLines={2}>
                            {statusCode?.driverstatus || 'Logout'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            navigation.navigate('TripHistory');
                            //  getlocation(userData);
                            //  Getnotification();
                            //  Setitem();
                            // dispatch(
                            //   setTripAssignDetails({
                            //     item:{

                            //     }
                            //   }))
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              backgroundColor: Color.primary,
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              shadowColor: Color.black,
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,
                              elevation: 8,
                            }}>
                            <Icon
                              name="md-documents"
                              size={20}
                              color={Color.white}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              marginVertical: 10,
                              color: theme ? Color.white : Color.black,
                            }}
                            numberOfLines={2}>
                            {t('MyTrips')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          disabled={
                            statusCode?.statuscode != 11 &&
                            statusCode?.statuscode != 19
                          }
                          onPress={() => {
                            statusCode?.statuscode == 19
                              ? getResumeDuty()
                              : setPermissionVisible(true);
                          }}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              backgroundColor:
                                statusCode?.statuscode == 11 ||
                                statusCode?.statuscode == 19
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              shadowColor: Color.black,
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,
                              elevation: 8,
                            }}>
                            <F5Icon
                              name="scroll"
                              size={20}
                              color={
                                statusCode?.statuscode == 11 ||
                                statusCode?.statuscode == 19
                                  ? Color.white
                                  : Color.cloudyGrey
                              }
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              marginVertical: 10,
                              color:
                                statusCode?.statuscode != 11
                                  ? Color.cloudyGrey
                                  : theme
                                  ? Color.white
                                  : Color.black,
                            }}
                            numberOfLines={2}>
                            {statusCode?.statuscode == 19
                              ? statusCode?.driverstatus
                              : t('Permission')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => setLeaveVisible(true)}
                          disabled={statusCode?.statuscode != 10}>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              backgroundColor:
                                statusCode?.statuscode != 10
                                  ? Color.lightgrey
                                  : Color.primary,
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              shadowColor: Color.black,
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,
                              elevation: 8,
                            }}>
                            <F5Icon
                              name="door-closed"
                              size={20}
                              color={
                                statusCode?.statuscode != 10
                                  ? Color.cloudyGrey
                                  : Color.white
                              }
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              marginVertical: 10,
                              color:
                                statusCode?.statuscode != 10
                                  ? Color.cloudyGrey
                                  : theme
                                  ? Color.white
                                  : Color.black,
                            }}
                            numberOfLines={2}>
                            {t('Leave')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
              }
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Color.white,
              shadowColor: Color.black,
              backgroundColor: theme ? Color.lightBlack : Color.white,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 8,
              width: 60,
              height: 60,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
            onPress={() => {
              navigation.navigate('ChatScreen');
            }}>
            <Image
              source={Media.customersupport}
              style={{height: 100, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          {/* <View style={{backgroundColor:"#fff",flexDirection:'row',gap:20,flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:10}}
             onPress={()=>setStartTimer()}
            >
              <Text>Timer ON</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"red",padding:10,borderRadius:10}}
            onPress={()=>setEndStart()}
            >
              <Text>Timer Off</Text>
            </TouchableOpacity>
          </View> */}
        </>
      )}
      <MeterReadingModal />
      {ActiveLoginModal && <ActiveModal />}
      <LeaveRequestModal
        setLeaveVisible={setLeaveVisible}
        leaveVisible={leaveVisible}
      />
      <PermissionModal
        setPermissionVisible={setPermissionVisible}
        permissionVisible={permissionVisible}
      />
      <TripCompletedModal />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  emptyOrderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 4,
  },
  EmptyOrderText: {
    fontSize: 18,
    color: Color.cloudyGrey,
  },
});
