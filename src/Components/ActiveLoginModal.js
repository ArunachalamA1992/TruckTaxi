import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Config/Color';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import fetchData from '../Config/fetchData';
import {setActiveLogin} from '../Redux';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from 'react-native';
import {MapOtpInput2} from './MapOtpInput';
import OTPInput from './OTPInput';
import { getlocation } from './getCurrentlocation/getCurrentlocation';
import DeviceInfo from 'react-native-device-info';

const ActiveModal = props => {
  const [isPinReady, setIsPinReady] = useState(false);
  const [fileData, setFileData] = useState('');
  const [statusCode, setStatusCode] = useState({});
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const ActiveLogin = useSelector(state => state.UserReducer.ActiveLogin);
  var {ActiveLoginModal, ActiveLoginData} = ActiveLogin;

  const userData = useSelector(state => state.UserReducer.userData);  
  var {cabid, cityid} = userData;
  const [code, setCode] = useState(
    ActiveLoginData?.statuscode == 10 || ActiveLoginData?.statuscode == 15
      ? ActiveLoginData?.previous_closingkm
      : ActiveLoginData?.statuscode == 11
      ? ActiveLoginData?.livekm
      : '',
  );
  const chooseFile = () => {
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
        // console.log('sourec', source[0].uri);
        setFileData(source[0].uri);
      }
    });
  };

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

  const punchData = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    setStatusCode(JSON.parse(value));
  };

  const otpZeroConverSion = () => {
    var myNumber = code;
    let result = '';
    for (i = 0; i < 6; i++) {
      let a = Math.floor(myNumber % 10);
      if (a != 0) {
        result += a;
      } else {
        result += '0';
      }
      myNumber /= 10;
    }
    setCode(result.split('').reverse().join(''));
  };
  useEffect(() => {
    otpZeroConverSion();
    punchData();
  }, []);
  const currentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        getApiData(position.coords.longitude, position.coords.latitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // setInterval(() => {

  // }, 1000);

  // useEffect(() => {

  //   request_permission();

  //   punchData();
  //   return () => {
  //     clearInterval(currentLocation);
  //   };
  // }, []);
  const Onsubmit = async () => {
    await request_permission();
    await punchData();
    getlocation(userData)
    currentLocation();
  };
  const getApiData = async (longitude, latitude) => {
    if (code.length == 6) {
      const value = await AsyncStorage.getItem('Active_Login_status');
      var {statuscode} = JSON.parse(value);
      console.log('statuscode', statuscode);
      if (statuscode == 11) {
        var punchOutData = {
          cabid: cabid,
          cityid: cityid,
          endlat: latitude,
          endlong: longitude,
          closingKM: code,
        };
        if (fileData != '') {
          punchOutData.odameterimg = fileData;
        }
        console.log('data', punchOutData);
        const punchout = await fetchData.punchout(punchOutData);
        console.log('punchout', punchout);
        if (punchout?.status == 200) {
          dispatch(
            setActiveLogin({
              ActiveLoginModal: false,
              ActiveLoginData: punchout,
            }),
          );
        } else {
          setError(punchout.message);
        }
      } else {
        var punchInData = {
          cabid: cabid,
          cityid: cityid,
          startlat: latitude,
          startlong: longitude,
          openingKM: code,
          appversion:DeviceInfo?.getVersion(),
        };
        if (fileData != '') {
          punchInData.odameterimg = fileData;
        } 
        console.log('punchInData', punchInData, '+++++>');
        const punchIn = await fetchData.punchIn(punchInData);
        console.log(punchIn, 'punchIn-----------------------');
        
        // try {
        //   const response = await fetch('https://trucktaxi.co.in/api/app/punchin', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(punchInData),
        //   });
        
        //   console.log('====================================');
        //   console.log("xcccc",response.json());
        //   console.log('====================================');
        //   if (!response.ok) {
        //     // Handle HTTP errors
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        //   }
        
        //   const data = await response.json();
        //   console.log('====================================');
        //   console.log(data,'====');
        //   console.log('====================================');
        // } catch (error) {
        //   console.error('Error:', error);
        // }
        // const myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/json');

        // const raw = JSON.stringify({
        //   cabid: 'TEST02',
        //   cityid: 'CBE001',
        //   startlat: 37.421998333333335,
        //   startlong: -122.084,
        //   openingKM: 159086,
        //   odometering: '',
        // });

        // const requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: 'follow',
        // };

        // fetch('https://trucktaxi.co.in/api/app/punchin', requestOptions)
        //   .then(response => {
        //     response.text();
        //     console.log(response.text(), '++++');
        //   })
        //   .then(result => console.log(result,'++++'))
        //   .catch(error => console.error(error));

        if (punchIn?.status == 200) {
          await AsyncStorage.setItem('Punch_in_data', JSON.stringify(punchIn));
          dispatch(
            setActiveLogin({ActiveLoginModal: false, ActiveLoginData: punchIn}),
          );
        } else {
          console.log({punchIn});
          setError(punchIn.message);
        }
      }
    } else {
      setError('Enter your 6 digit Meter');
    }
  };
  const dispatch = useDispatch();
  return (
    <Modal visible={ActiveLoginModal} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          marginVertical: 20,
          backgroundColor: Color.transparantBlack,
        }}
        // onPress={() => dispatch(setActiveLogin({ActiveLoginModal: false}))}
      >
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
              {console.log(statusCode,'+++++++++++++++++++++++')}
            <Text style={{fontSize: 20, color: Color.black, fontWeight: '600'}}>
              {statusCode?.statuscode == 11 ? 'Punch-Out' : 'Punch-In'}
            </Text>
            {error && <Text style={styles.invalidLogin}>{error}</Text>}
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontWeight: '600',
                marginTop: 10,
              }}>
              {statusCode?.statuscode == 11
                ? 'Enter current(end) meter reading'
                : 'Enter current(start) meter reading'}
            </Text>
            <OTPInput
              code={code.toString()}
              setCode={setCode}
              setIsPinReady={setIsPinReady}
              maximumLength={6}
              inputRef={inputRef}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            (Or)
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 14, color: Color.black, fontWeight: '600'}}>
              Capture Your Current Speedometer
            </Text>
            {fileData != '' ? (
              <Image
                source={{uri: fileData}}
                style={{
                  width: '50%',
                  height: 100,
                  borderRadius: 10,
                  marginVertical: 20,
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  chooseFile();
                }}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 20,
                  borderWidth: 1,
                  borderColor: Color.primary,
                  borderStyle: 'dashed',
                }}>
                <Icon name="image" size={100} color={Color.primary} />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title={'Decline'}
              titleStyle={{color: Color.black}}
              buttonStyle={{
                backgroundColor: Color.lightgrey,
                padding: 10,
                marginVertical: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() =>
                dispatch(setActiveLogin({ActiveLoginModal: false}))
              }
              containerStyle={{
                width: '50%',
              }}
            />
            <Button
              title={'Submit'}
              titleStyle={{color: Color.white}}
              buttonStyle={{
                backgroundColor: Color.primary,
                padding: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() => {
                Onsubmit();
              }}
              containerStyle={{
                width: '50%',
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActiveModal;
const styles = StyleSheet.create({
  invalidLogin: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
    marginVertical: 10,
  },
});
