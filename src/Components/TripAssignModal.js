import React, {useEffect, useState,useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {Image, Modal, Text, ToastAndroid, View} from 'react-native';
import Color from '../Config/Color';
import {useDispatch, useSelector} from 'react-redux';
import {setTripAssignDetails, setTripAssignModalVisible} from '../Redux';
import {Media} from '../Global/Media';
import {Button} from 'react-native-elements';
import fetchData from '../Config/fetchData';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

import {useTranslation} from 'react-i18next';
import '../Translation';
import i18n from '../Translation';
import {locationPermission} from './helperfn';
import {LocalNotification} from './pushNotify/PushController';
import {getlocation} from './getCurrentlocation/getCurrentlocation';

const TripAssignModal = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  var {item} = props;
  const [Trip, setTrip] = useState(null);
  const [BookingDetails, setbookingDetails] = useState(null);

  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripAssignModal = useSelector(state => state.TripReducer.TripAssign);
  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid, driverid, drivername, cityid, drivermobno, cabno} = userData;
  const [location, setlocation] = useState({
    longitude: 0,
    latitude: 0,
    address: null,
  });
  //  useEffect(() => {
  //   //  call a local notification
  //   LocalNotification()
  //  })


  // UseEffect:
  useEffect(() => {
    CurrentLocation();
    getTripData();
  }, []);

  // UseFocusEffect:
  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        CurrentLocation();
        getTripData();
      }, 5000); 
      return () => {
        clearInterval(intervalId);
        console.log('Screen is unfocused, cleanup');
      };
    }, [])
  );

  // GET Current Trip Data :
  const getTripData = async () => {
    try {
      const GetCurrenttrip = await fetchData?.get_available_trip({
        cabid: cabid,
        cityid: cityid,
      });
       if(GetCurrenttrip?.tripstatuscode == 0)
      {
        var data =
        'cabid=' +
        cabid +
        '&cityid=' +
        cityid +
        '&bookingid=' +
        GetCurrenttrip?.tripid;
        const GETBookingDetails = await fetchData?.getbookingdeatails(data);
        console.log('GetCurrenttrip', GetCurrenttrip);
        console.log('GETBookingDetails', GETBookingDetails);
        setTrip(GetCurrenttrip);
        setbookingDetails(GETBookingDetails);
      }else{  
        if(GetCurrenttrip?.message == "No Trips Found")
        {
          ToastAndroid.show('No Trips Found', ToastAndroid.SHORT);
          dispatch(setTripAssignModalVisible(false));
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000);
        }else{
          setTrip(null);
          setbookingDetails(null);
        }
      }
    } catch (error) {
      console.log('error', error);
      
    }
    
  }

  // GetAddressFromCoordinates:
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const {results} = response.data;
      if (results.length > 0) {
        // return results[0].formatted_address;
        setlocation({
          longitude: longitude,
          latitude: latitude,
          address: results[0].formatted_address,
        });
      } else {
        console.log('====================================');
        console.log('Address not found', 'Address not found');
        console.log('====================================');
      }
    } catch (error) {
      console.error(error);
      setAddress('Error fetching address');
    }
  };

  // Current Location:
  const CurrentLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          console.log('longitude', position?.coords?.longitude);
          console.log('latitude', position?.coords?.latitude);
          getAddressFromCoordinates(
            position?.coords?.latitude,
            position?.coords?.longitude,
          );
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  // Booking Status:
  const bookingStatus = async () => {
    try {
      await getlocation(userData);
      const booking = await fetchData.bookingstatus({
        cabid: cabid,
        cityid: cityid,
        bookingid: Trip?.bookingid,
        acceptedlat: Trip?.fromloclat,
        acceptedlong: Trip?.toloclong,
        Current_latitude: location.latitude,
        Current_longitude: location.longitude,
        Current_address: location.address,
      });
      // dispatch(setTripAssignModalVisible(false));
      if (booking?.status == 200) {
        // await AsyncStorage.getItem('Active_Login_status');
        // await AsyncStorage.setItem(
        //   'Active_Login_status',
        //   JSON.stringify(booking),
        // );
        // console.log('booking', booking);
        console.log('bookingitem', item);       
        dispatch(
          setTripAssignDetails({
            item: {
              assignId: Trip?.bookingid,
              fromdistrict: '',
              pickup: Trip?.fromloc,
              drop: Trip?.toloc,
              fromloclat: Trip?.fromloclat,
              fromloclong: Trip?.fromloclong,
              toloclat: Trip?.toloclat,
              toloclong: Trip?.toloclong,
              todistrict: '',
              status: BookingDetails?.tripstatus,
              date: BookingDetails?.tripdatetime,
              distance: 0,
              time: '',
              amount: BookingDetails?.total,
              number: BookingDetails?.customermobno,
              customerName: BookingDetails?.customername,
            },
          }),
        );
        dispatch(setTripAssignModalVisible(false));
      }else{
        console.log('booking', booking);       
        ToastAndroid.show('Something went wrong try again', ToastAndroid.SHORT);    
      }
    } catch (error) {
      console.log( 'catch in bookingStatus :',error);

    }
  };
  const dispatch = useDispatch();
  return (
    <>
      {TripAssignModal && item?.tripstatuscode == 0 && (
        <Modal
          visible={TripAssignModal && item?.tripstatuscode == 0}
          transparent={true}
          animationType="slide">
          <View style={{flex: 1, backgroundColor: Color.transparantBlack}}>
            <View style={{flex: 1}} />
            <View
              style={{
                backgroundColor: theme ? Color.black : Color.white,
                padding: 20,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}>
              {/* <View style={{}}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: -80,
                  width: 100,
                  height: 100,
                  backgroundColor: Color.white,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomColor: Color.primary,
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{fontSize: 25, fontWeight: '600', color: Color.red}}>
                  {seconds}
                </Text>
                <Text style={{fontSize: 20, color: Color.black}}>sec</Text>
              </View>
            </View>
          </View> */}
              {/* {item.map((single, index) => {
            return ( */}
              <View>
                <View
                  style={{
                    marginVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#6EC374',
                      flex: 1,
                    }}>
                    #{Trip?.tripid}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.yellow,
                      textAlign: 'center',
                      backgroundColor: Color.softPeach,
                      paddingHorizontal: 20,
                      padding: 5,
                      borderRadius: 50,
                    }}>
                    {BookingDetails?.tripstatus}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme ? Color.white : Color.black,
                      marginRight: 5,
                      textAlign: 'left',
                    }}>
                    {Trip?.fromloc}
                  </Text>
                  <Image
                    source={Media.ArrowSwitchIcon}
                    style={{height: 30, resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: theme ? Color.white : Color.black,
                      fontWeight: '600',
                      textAlign: 'right',
                      marginHorizontal: 5,
                    }}>
                    {Trip?.toloc}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: Color.cloudyGrey,
                    }}>
                    {moment(BookingDetails?.tripdatetime).format('LLL')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: theme ? Color.white : Color.black,
                      }}>
                      {/* {single.distance} */}
                    </Text>
                    {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                        marginVertical: 5,
                        fontWeight: '600',
                      }}>
                      {single.time}
                    </Text> */}
                  </View>
                  {/* <View>
                    <Text
                      style={{
                        fontSize: 22,
                        color: Color.primary,
                        fontWeight: '600',
                      }}>
                      ₹{BookingDetails?.total}
                    </Text>
                  </View> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    title={t('accept')}
                    titleStyle={{color: Color.white}}
                    buttonStyle={{
                      backgroundColor: Color.primary,
                      padding: 10,
                      borderRadius: 50,
                      marginHorizontal: 10,
                    }}
                    onPress={() => {
                      bookingStatus();
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                  />
                  {/* <Button
                    title={'Decline'}
                    titleStyle={{color: Color.black}}
                    buttonStyle={{
                      backgroundColor: Color.lightgrey,
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 50,
                      marginHorizontal: 10,
                    }}
                    onPress={() => dispatch(setTripAssignModalVisible(false))}
                    containerStyle={{
                      width: '50%',
                    }}
                  /> */}
                </View>
              </View>
              {/* );
          })} */}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default TripAssignModal;
