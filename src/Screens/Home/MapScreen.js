import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Color from '../../Config/Color';
import {Media} from '../../Global/Media';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {setVehicleEndMeter, setVehicleStartMeter} from '../../Redux';
import {
  setMapTotalDistance,
  setPreviousDistance,
  setTotalTripAmount,
  setTripCompleteData,
  setTripCoordinates,
  setTripMapStart,
  setTripRemoveDetails,
  setTripTimer,
  settriptimerAction,
} from '../../Redux/Trip/TripAction';
import {common_fn} from '../../Config/common_fn';
import ImageZoom from '../../Components/imageView/imageZoom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
import fetchData from '../../Config/fetchData';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {MapOtpInput1, MapOtpInput2} from '../../Components/MapOtpInput';
import BackgroundTimer from 'react-native-background-timer';
import {locationPermission} from '../../Components/helperfn';

import * as ImagePicker from 'react-native-image-picker';
import {
  TripendNotification,
  TripStartNotification,
} from '../../Components/pushNotify/PushController';
import {getlocation} from '../../Components/getCurrentlocation/getCurrentlocation';

const {height: WINDOW_HEIGHT} = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.16;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({route, navigation}) => {
  var [mapItem] = useState(route.params.CurrentTripData);
  var [itemStatus] = useState(route.params.statusCode);
  var [Bookingdatas] = useState(route.params.BookingDetails);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [mapView] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [region, setRegion] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [heading, setHeading] = useState(0);
  const [statusCode, setStatusCode] = useState({});
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  const [hourToMinutes, setHourToMinutes] = useState(0);
  // console.log(Bookingdatas,"BookingdatasBookingdatasBookingdatas");

  var {
    AssignedId,
    TripStarted,
    initialSpeedometer,
    finalSpeedometer,
    startMeterImage,
    endMeterImage,
    otpcode,
    TripStoped,
    startTripdate,
  } = TripStart;
  console.log(AssignedId, '??????????????????????????????????????');

  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid, cityid} = userData;
  const Coordinates = useSelector(state => state.TripReducer.Coordinates);
  var {triplatitude, triplongitude} = Coordinates;
  const [startSpeedometer, setStartSpeedometer] = useState(
    AssignedId == mapItem?.tripid && initialSpeedometer > 0
      ? initialSpeedometer
      : itemStatus?.livekm != 0
      ? itemStatus?.livekm
      : '',
  );
  const [code, setCode] = useState(
    AssignedId == mapItem.tripid && otpcode != 0 ? otpcode : '',
  );
  const [totalFareAmount, setTotalFareAmount] = useState(0);
  const [endSpeedometer, setEndSpeedometer] = useState(
    AssignedId == mapItem?.tripid && finalSpeedometer > 0
      ? initialSpeedometer
      : itemStatus?.livekm != 0
      ? itemStatus?.livekm
      : '',
  );
  const TimerRange = useSelector(state => state.TripReducer.TripTimer);
  var {tripSeconds, tripMinutes, tripHours} = TimerRange;
  const [loading, setLoading] = useState(false);

  const [triphours, setTriphours] = useState(0);
  const [tripminutes, setTripminutesdate] = useState(0);
  const [endDate, setEnddate] = useState('');

  const [totalMin, setTotalMin] = useState(0);

  const convertMinsToHrsMins = minutes => {
    var hours = Math.trunc(minutes / 60);
    var tminutes = minutes % 60;
    setTriphours(hours);
    setTripminutesdate(tminutes);
    dispatch(
      setTripTimer({
        tripSeconds: tripSeconds,
        tripMinutes: tminutes,
        tripHours: hours,
      }),
    );
  };
  useEffect(() => {
    try {
      if (TripStarted) {
        const interval = setInterval(() => {
          setEnddate(new Date());
          setTotalMin(endDate - startTripdate);
          convertMinsToHrsMins(totalMin / (1000 * 60));

          if (startTripdate == '') {
            dispatch(
              setTripMapStart({
                TripStoped: false,
                TripStarted: true,
                AssignedId: AssignedId,
                initialSpeedometer: initialSpeedometer,
                otpcode: otpcode,
                finalSpeedometer: finalSpeedometer,
                startImage: startMeterImage,
                endImage: endMeterImage,
                TripCompleted: false,
                startTripdate: new Date(),
              }),
            );
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      } else {
        dispatch(
          setTripTimer({
            tripSeconds: tripSeconds,
            tripMinutes: tripMinutes,
            tripHours: tripHours,
          }),
        );
      }
    } catch (error) {
      console.log('catch in convertMinsToHrsMins : ', error);
    }
  }, [tripSeconds, TripStarted, endDate, startTripdate]);

  const [endError, setEndError] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const request_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    } catch (err) {
      console.log('location  ', err);
    }
  };

  const dispatch = useDispatch();

  const fareCalculation = async () => {
    try {
      var data =
        'cabid=' +
        cabid +
        '&bookingid=' +
        mapItem.tripid +
        '&tripminutes=' +
        hourToMinutes.toFixed(0) +
        '&distance=' +
        (endSpeedometer - startSpeedometer) +
        '&cityid=' +
        cityid;
      const fareAmount = await fetchData.farecalculation(data);
      if (fareAmount?.status == 200) {
        setTotalFareAmount(fareAmount?.approximatefare);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fareCalculation();
  }, [endSpeedometer]);

  const getCurrentLocation = async () => {
    try {
      const locPermissionDenied = await locationPermission();
      if (locPermissionDenied) {
        Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setHeading(position?.coords?.heading);

            navigation.navigate('mapDirection', {
              mapItem: mapItem,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            dispatch(
              setTripCoordinates({
                triplatitude: position.coords.latitude,
                triplongitude: position.coords.longitude,
              }),
            );
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.log('Catch in GetCurrentLocation', error);
    }
  };

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = direction => {
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const origin = {latitude: 13.0827, longitude: 80.2707};
  const destination = {latitude: 12.9716, longitude: 77.5946};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyASTHNV45PVLzPHIqvYnP0b3X85gLzT7DI';
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const date = new Date();
  const currentDate = date.toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const animated = useRef(new Animated.Value(0)).current;
  const MapRef = useRef(null);

  const animate = () => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  useEffect(() => {
    animate();
  }, []);

  const startVehicleReading = useSelector(
    state => state.MeterReducer.startVehicleMeter,
  );
  const theme = useSelector(state => state.ThemeReducer.theme);
  const endVehicleReading = useSelector(
    state => state.MeterReducer.endVehicleMeter,
  );

  var {startMeterImage, startMeterVisible} = startVehicleReading;
  var {endMeterImage, endMeterVisible} = endVehicleReading;

  useEffect(() => {
    var timeInMinutes = tripHours * 60 + tripMinutes;
    setHourToMinutes(timeInMinutes);
  }, [tripMinutes, hourToMinutes]);

  const onMapPress = async location => {
    var {zoom} = await MapRef.current.getCamera();
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  };
  // <=============== Start Timer===================>
  const setStartTimer = async () => {
    try {
      console.log('Started TImer');
      const value = {
        start: true,
        stop: false,
        reset: false,
        is_diplay: true,
      };
      await AsyncStorage.setItem('TripTimer', JSON.stringify(value));
      dispatch(settriptimerAction(value));
    } catch (error) {
      console.log('catch in setStartTimer : ', error);
    }
  };
  const setEndStart = async () => {
    try {
      console.log('Stop TImer');
      await AsyncStorage.setItem('TripTimer', JSON.stringify(null));
      dispatch(settriptimerAction(null));
    } catch (error) {
      console.log('catch in setEndStart : ', error);
    }
  };
  // <=============== End Timer===================>
  const getTripStart = async () => {
    // TripStartNotification();
    try {
      await setStartTimer();
      const tripStart = await fetchData.getstarttrip({
        cabid: cabid,
        cityid: cityid,
        bookingid: mapItem.tripid,
        starttriplat: mapItem.fromloclat,
        starttriplong: mapItem.fromloclong,
        starttime: new Date(),
        startimage: startMeterImage,
        otp: code,
        odameterKM: startSpeedometer,
      });
      console.log('====================================');
      console.log('Tripe Start', tripStart);
      console.log('====================================');
      if (tripStart.status == 200) {
        getCurrentLocation();
        dispatch(
          setTripMapStart({
            TripStoped: false,
            TripStarted: true,
            AssignedId: mapItem.tripid,
            initialSpeedometer: startSpeedometer,
            otpcode: code,
            finalSpeedometer: endSpeedometer,
            startImage: startMeterImage,
            endImage: endMeterImage,
            TripCompleted: false,
            startTripdate: '',
          }),
        );
      } else {
        common_fn.showToast(tripStart?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const tripDone = async () => {
    try {
      await getlocation(userData);
      await setEndStart();
      if (
        (mapItem.tripid == AssignedId && endSpeedometer.length != 6) ||
        endSpeedometer.length == undefined ||
        endSpeedometer <= startSpeedometer
      ) {
        setEndError('Enter The End Meter');
        dispatch(
          setTripMapStart({
            TripStoped: true,
            TripStarted: false,
            AssignedId: mapItem.tripid,
            initialSpeedometer: startSpeedometer,
            otpcode: code,
            finalSpeedometer: endSpeedometer,
            startImage: startMeterImage,
            endImage: endMeterImage,
            TripCompleted: false,
            startTripdate: startTripdate,
          }),
        );
      } else {
        console.log('cccccccccccccccccc');
        console.log(mapItem, 'ZZZZZZZZZZZZZZZZZZZZZZZ');
        console.log(cabid, 'ZZZZZZZZZZZZZZZZZZZZZZZ');
        console.log(cityid, 'ZZZZZZZZZZZZZZZZZZZZZZZ');
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZ');
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZ');
        console.log(Bookingdatas, '???????????????????????');

        const tripCompleted = await fetchData.completetrip({
          cabid: cabid,
          cityid: cityid,
          bookingid: mapItem.tripid,
          endtriplat: mapItem.toloclat,
          endtriplong: mapItem.toloclong,
          endtime: new Date(),
          distance: endSpeedometer - startSpeedometer,
          fare: Bookingdatas?.total,
          tripmins: hourToMinutes.toFixed(0),
          odameterKM: endSpeedometer,
          endimage: endMeterImage,
        });
        if (tripCompleted.status == 200) {
          setLoading(true);
          dispatch(setTotalTripAmount(totalFareAmount));
        } else {
          console.log('tripidtrip', tripCompleted);

          console.log(
            'tripidtripidtripidtripidtripidtripidtripidtripidtripidtripidtripidtripidtripidtripid',
          );

          common_fn.showToast(tripCompleted?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkEndMeterError = value => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (value.length === 0) {
      setEndError('Enter Your End Meter');
    } else if (reg.test(value) === false) {
      setEndError(false);
    } else if (reg.test(value) === true) {
      setEndError('');
    }
  };

  const statusBarHeight = useSafeAreaInsets().top;

  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });
  }, [uniqueId]);

  const statusData = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    setStatusCode(JSON.parse(value));
  };

  const otpStartZeroConverSion = () => {
    try {
      var startNumber = startSpeedometer;
      let result = '';
      for (i = 0; i < 6; i++) {
        let a = Math.floor(startNumber % 10);
        if (a != 0) {
          result += a;
        } else {
          result += '0';
        }
        startNumber /= 10;
      }
      setStartSpeedometer(result?.split('').reverse().join(''));
    } catch (error) {
      console.log('OtpStartZeroConverSion Catch Error', error);
    }
  };

  const otpEndZeroConverSion = () => {
    try {
      var endNumber = endSpeedometer;
      let result = '';
      for (i = 0; i < 6; i++) {
        let a = Math.floor(endNumber % 10);
        if (a != 0) {
          result += a;
        } else {
          result += '0';
        }
        endNumber /= 10;
      }
      setEndSpeedometer(result.split('').reverse().join(''));
    } catch (error) {
      console.log('OtpEndZeroConverSion Catch Error', error);
    }
  };

  useEffect(() => {
    try {
      otpStartZeroConverSion();
      otpEndZeroConverSion();
    } catch (error) {
      console.log('otpstartzeroconversion', error);
    }
  }, []);

  useEffect(() => {
    try {
      const interval = setInterval(async () => {
        statusData();
      }, 100);
      if (statusCode?.statuscode == 11) {
        dispatch(setTripCompleteData({completed: true, tripstatus: true}));
        // TripendNotification();
        dispatch(
          setTripMapStart({
            TripCompleted: false,
            TripStoped: false,
            TripStarted: false,
            AssignedId: mapItem.tripid,
            initialSpeedometer: startSpeedometer,
            otpcode: code,
            finalSpeedometer: endSpeedometer,
            startImage: '',
            endImage: '',
            startTripdate: startTripdate,
          }),
        );
        dispatch(
          setTripRemoveDetails({
            item: {
              assignId: mapItem.tripid,
              fromdistrict: '',
              pickup: mapItem.fromloc,
              drop: mapItem.toloc,
              fromloclat: mapItem.fromloclat,
              fromloclong: mapItem.fromloclong,
              toloclat: mapItem.toloclat,
              toloclong: mapItem.toloclong,
              todistrict: '',
              status: statusCode?.tripstatus,
              date: mapItem.pickupdatetime,
              distance: 0,
              time: '',
              amount: Bookingdatas.total,
              number: Bookingdatas.customermobno,
              customerName: Bookingdatas.customername,
            },
          }),
        );
        dispatch(
          setMapTotalDistance({
            totalDistance: 0,
            destinationReached: false,
          }),
        );
        dispatch(
          setTripCoordinates({
            triplatitude: 0,
            triplongitude: 0,
          }),
        );
        dispatch(
          setPreviousDistance({
            previous: 0,
            current: 0,
          }),
        );
        navigation.navigate('Home');
        setLoading(false);
      }
      return () => clearInterval(interval);
    } catch (error) {
      console.log('Catch in useEffect', error);
    }
  }, [statusCode]);

  useEffect(() => {
    if (loading == true) {
      startImageRotateFunction();
    }
  }, [loading]);

  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      startImageRotateFunction();
    });
  };

  const bearing = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const startTripImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.assets;
        dispatch(
          setVehicleStartMeter({
            startMeterImage: source[0].uri,
            startMeterVisible: false,
          }),
        );
      }
    });
  };

  const endTripImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.assets;
        dispatch(
          setVehicleEndMeter({
            endMeterImage: source[0].uri,
            endMeterVisible: false,
          }),
        );
      }
    });
  };
  // console.log('AssignedId', TripStarted || TripStoped && tripMinutes > 0 || tripHours > 0);
  return (
    <View
      style={{
        ...styles.MainContainer,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      {/* {(TripStarted || (TripStoped) && (tripMinutes > 0 || tripHours > 0)) ? (
        <View style={styles.noReceivecodeView}>
          <Text
            style={{
              ...styles.noReceiveText,
              color: Color.white,
            }}>
            {tripHours < 10 ? `0${tripHours.toFixed(0)}` : tripHours.toFixed(0)}
            :
            {tripMinutes < 10
              ? `0${tripMinutes.toFixed(0)}`
              : tripMinutes.toFixed(0)}
          </Text>
        </View>
      ) : (
        <View />
      )} */}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Media.Loaderwheel} style={{width: 100, height: 100}} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: TripStoped ? 0.5 : 1,
              }}>
              <View
                style={{
                  borderColor: '#E8ABFF',
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Image
                  source={Media.Userpng}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'contain',
                    borderRadius: 50,
                  }}
                />
              </View>
              <View style={{marginLeft: 20}}>
                <Text
                  style={{
                    color: theme ? Color.white : Color.black,
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginVertical: 5,
                    width: 120,
                  }}>
                  {Bookingdatas?.customername || 'TeamWork'}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: theme ? Color.white : Color.black,
                  }}>
                  {mapItem.tripid}
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: Color.white,
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 70,
                    borderColor: Color.primary,
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('mapDirection', {
                      mapItem: mapItem,
                      latitude: triplatitude,
                      longitude: triplongitude,
                    });
                  }}>
                  <MIcon name="my-location" size={20} color={Color.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 20,
                    backgroundColor: Color.primary,
                    // borderWidth: 1,
                    padding: 10,
                    borderRadius: 50,
                    shadowColor: Color.black,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 0.25,
                    elevation: 8,
                  }}
                  onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall(
                      Bookingdatas?.customermobno,
                    );
                  }}>
                  <Icon name="call" size={20} color={Color.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                // padding: 10,,
                opacity: TripStoped ? 0.5 : 1,
              }}>
              <View style={{flex: 1}}>
                {/* <Text style={{ fontSize: 14, color: Color.cloudyGrey }}>
                  Estimation Delivery
                </Text> */}
                <Text
                  style={{
                    fontSize: 16,
                    color: theme ? Color.white : Color.black,
                    marginVertical: 5,
                    fontWeight: '600',
                  }}>
                  {moment(mapItem?.pickupdatetime).format('LL')}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 14, color: Color.cloudyGrey}}>
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.green,
                    marginVertical: 5,
                    //
                  }}>
                  {statusCode?.tripstatus || mapItem?.status}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: TripStoped ? 0.5 : 1,
              }}>
              <View style={{alignItems: 'flex-start', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    From
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme ? Color.white : Color.black,
                    textAlign: 'justify',
                    marginVertical: 10,
                  }}
                  numberOfLines={3}>
                  {mapItem.fromloc}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    To
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme ? Color.white : Color.black,
                    textAlign: 'justify',
                    marginVertical: 10,
                  }}
                  numberOfLines={3}>
                  {mapItem.toloc}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: theme ? Color.white : Color.black,
                  fontSize: 16,
                  fontWeight: '600',
                  marginVertical: 5,
                  opacity: TripStoped ? 0.5 : 1,
                }}>
                Meter Record
              </Text>
              <View
                style={{
                  alignItems: 'flex-start',
                  opacity: TripStoped ? 0.5 : 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme ? Color.white : Color.black,
                    textAlign: 'left',
                  }}>
                  Start Meter(KM)
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {console.log('{{{{', startSpeedometer, '{{{{')}
                  <MapOtpInput1
                    code={
                      startSpeedometer != '' ? startSpeedometer?.toString() : ''
                    }
                    setCode={setStartSpeedometer}
                    setIsPinReady={setIsPinReady}
                    maximumLength={6}
                    inputRef={inputRef1}
                    editable={TripStarted == false}
                  />
                  {startMeterImage ? (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setVehicleStartMeter({startMeterVisible: true}),
                        );
                        startTripImage();
                      }}
                      style={{flex: 1, alignItems: 'flex-end'}}>
                      <Image
                        source={{uri: startMeterImage}}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            setVehicleStartMeter({startMeterVisible: true}),
                          );
                          startTripImage();
                        }}
                        disabled={mapItem.tripid == AssignedId && TripStarted}
                        style={{
                          width: 100,
                          height: 60,
                          alignItems: 'center',
                          // padding: 5,
                          borderRadius: 10,
                          // marginVertical: 20,
                          borderWidth: 1,
                          borderColor:
                            mapItem.tripid == AssignedId && TripStarted
                              ? Color.cloudyGrey
                              : Color.primary,
                          borderStyle: 'dashed',
                        }}>
                        <Icon
                          name="image"
                          size={50}
                          color={
                            mapItem.tripid == AssignedId && TripStarted
                              ? Color.cloudyGrey
                              : Color.primary
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <View style={{alignItems: 'flex-start', marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme ? Color.white : Color.black,
                    textAlign: 'left',
                  }}>
                  End Meter(KM)
                </Text>
                {endError && (
                  <Text style={{fontSize: 14, color: Color.red}}>
                    {endError}
                  </Text>
                )}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MapOtpInput2
                    code={
                      TripStoped && endSpeedometer != ''
                        ? endSpeedometer?.toString()
                        : ''
                    }
                    setCode={setEndSpeedometer}
                    setIsPinReady={setIsPinReady}
                    maximumLength={6}
                    inputRef={inputRef2}
                    editable={mapItem.tripid == AssignedId && TripStoped}
                  />
                  {endMeterImage ? (
                    <TouchableOpacity
                      onPress={() => {
                        endTripImage();
                        dispatch(
                          setVehicleStartMeter({startMeterVisible: false}),
                        );
                      }}
                      style={{flex: 1, alignItems: 'flex-end'}}>
                      <Image
                        source={{uri: endMeterImage}}
                        style={{width: 100, height: 50, borderRadius: 10}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => {
                          endTripImage();
                          dispatch(
                            setVehicleStartMeter({startMeterVisible: false}),
                          );
                        }}
                        disabled={mapItem.tripid == AssignedId && !TripStoped}
                        style={{
                          width: 100,
                          height: 60,
                          alignItems: 'center',
                          // padding: 5,
                          borderRadius: 10,
                          // marginVertical: 20,
                          borderWidth: 1,
                          borderColor:
                            mapItem.tripid == AssignedId && !TripStoped
                              ? Color.cloudyGrey
                              : Color.primary,
                          borderStyle: 'dashed',
                        }}>
                        <Icon
                          name="image"
                          size={50}
                          color={
                            mapItem.tripid == AssignedId && !TripStoped
                              ? Color.cloudyGrey
                              : Color.primary
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginVertical: 20,
                opacity: TripStoped ? 0.5 : 1,
              }}>
              {(mapItem.tripid == AssignedId && TripStarted) ||
              (mapItem.tripid == AssignedId && TripStoped) ||
              otpcode.length != 0 ? (
                <View
                  style={{
                    flex: 1,
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: theme ? Color.white : Color.black,
                      fontSize: 14,
                    }}>
                    Terms and Conditions applied
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme ? Color.white : Color.black,
                      fontWeight: '600',
                    }}>
                    Enter OTP
                  </Text>
                </View>
              )}
              {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text
                  style={{
                    color: theme ? Color.white : Color.black,
                    fontSize: 16,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    color: Color.primary,
                    fontSize: 22,
                    fontWeight: '600',
                  }}>
                  ₹ ----
                </Text>
              </View> */}
            </View>
            {/* {console.log(statusCode,"statusCodestatusCodestatusCode")
            }
            {console.log(mapItem,"mapItemmapItemmapItemmapItemmapItemmapItemmapItem")
            } */}
            {/* {console.log(AssignedId,"AssignedIdAssignedIdAssignedIdAssignedIdAssignedId")
            }
            {console.log(TripStoped,"TripStopedTripStopedTripStopedTripStopedTripStoped")
            }*/}
            {/* {console.log(startSpeedometer?.toString().length,"TripStartedTripStartedTripStarted")
            } 
            {console.log(code.length,"TripStartedTripStartedTripStarted")
            }  */}
            {/* {console.log(statusCode, 'TripStartedTripStartedTripStarted')} */}

            <Button
              title={
                mapItem.tripid == AssignedId && TripStarted
                  ? 'Stop Trip'
                  : mapItem.tripid == AssignedId && TripStoped
                  ? 'End Trip'
                  : 'Start Trip'
              }
              onPress={() => {
                if (mapItem.tripid == AssignedId && TripStarted) {
                  dispatch(
                    setTripMapStart({
                      TripStoped: true,
                      TripStarted: false,
                      AssignedId: mapItem.tripid,
                      initialSpeedometer: statusCode?.livekm,
                      otpcode: code,
                      finalSpeedometer: statusCode?.livekm,
                      startImage: startMeterImage,
                      endImage: endMeterImage,
                      TripCompleted: false,
                      startTripdate: startTripdate,
                    }),
                  );
                  dispatch(
                    setTripTimer({
                      tripSeconds: tripSeconds,
                      tripMinutes: tripMinutes,
                      tripHours: tripHours,
                    }),
                  );
                } else if (mapItem.tripid == AssignedId && TripStoped) {
                  // console.log('mapItemmapItemmapItem', mapItem);
                  tripDone();
                } else if (AssignedId == mapItem.tripid) {
                  getTripStart();
                } else {
                  common_fn.showToast(
                    'Please Complete Your Before Trip and get back soon',
                  );
                }
              }}
              disabled={
                startSpeedometer?.toString().length != 6 ||
                // code.length != 4
                //  ||
                statusCode?.statuscode != 3
              }
              buttonStyle={{
                backgroundColor: Color.primary,
                borderRadius: 10,
                padding: 10,
              }}
              containerStyle={{marginHorizontal: 10, marginVertical: 20}}
            />
          </View>
        </ScrollView>
      )}
      <Modal
        transparent={true}
        visible={imageModalVisible}
        animationType="slide"
        onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalViewContainer}>
          <View style={styles.modalView}>
            <ImageZoom
              index={0}
              images={[startMeterImage ? startMeterImage : endMeterImage]}
              width={Dimensions.get('screen').width}
              height={Dimensions.get('screen').height}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.closeModalContainer,
              paddingVertical: statusBarHeight + 10,
            }}
            onPress={() => setImageModalVisible(false)}>
            <Text style={styles.closeModalText}>Close</Text>
            <Icon name="close" size={22} color={Color.white} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    // padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  dot: {
    width: '100%',
    height: 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  Ball: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    // position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  draggableArea: {
    width: 132,
    height: 30, //height diiference need
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 30,
    height: 3,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  modalViewContainer: {flex: 1, backgroundColor: Color.transparantBlack},
  modalView: {flex: 1, justifyContent: 'center'},
  closeModalContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeModalText: {
    opacity: 1,
    color: Color.white,
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginBottom: 10,
    padding: 5,
  },
  noReceiveText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MapScreen;
