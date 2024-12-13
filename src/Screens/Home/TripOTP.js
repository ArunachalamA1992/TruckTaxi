import React, {useState, useRef, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {Media} from '../../Global/Media';
import Color from '../../Config/Color';
import OtpVerification from '../../Components/OtpVerification';
import {Button} from 'react-native-elements';
import {setTripMapStart} from '../../Redux';
import {common_fn} from '../../Config/common_fn';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from '../../Config/fetchData';

const TripOTPScreen = ({route, navigation}) => {
  // const [item] = useState(route.params);
  // console.log(item);
  const CurrentTripData = route.params?.CurrentTripData;  
  const BookingDetails = route.params?.BookingDetails;  
  const theme = useSelector(state => state.ThemeReducer.theme);
  const [code, setCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [statusCode, setStatusCode] = useState({});

  const statusData = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    setStatusCode(JSON.parse(value));
  };
  useEffect(() => {
    const interval = setTimeout(async () => {
      statusData();
    }, 100);
    return () => clearInterval(interval);
  }, [statusCode]);

  const verifyOTP = async navigation => {
    try {
      var data = {
        tripid: CurrentTripData?.tripid,
        OTP: code,
      };
      const verifyTripOTP = await fetchData.verifydriverOTP(data);
      console.log('verifyTripOTP:', verifyTripOTP);   
      if (verifyTripOTP?.status == 200) {
        dispatch(
          setTripMapStart({
            TripStoped: false,
            TripStarted: false,
            AssignedId: CurrentTripData?.tripid,
            initialSpeedometer: 0,
            otpcode: code,
            finalSpeedometer: 0,
            startImage: '',
            endImage: '',
            TripCompleted: false,
            startTripdate: '',
          }),
        );  
        navigation.replace('maps', {CurrentTripData, statusCode,BookingDetails});
      } else {
        console.log("BookingDetails",BookingDetails);
        
        common_fn.showToast(verifyTripOTP?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
        padding: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: theme ? Color.white : Color.black,
            fontWeight: '600',
            marginVertical: 10,
          }}>
          OTP Verification
        </Text>
        <Image
          source={Media.otpVerification}
          style={{height: 250, resizeMode: 'contain'}}
        />
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            fontWeight: '600',
            marginVertical: 10,
            textAlign: 'center',
          }}>
          We need to confirm your order before OTP verification
        </Text>
        <OtpVerification
          code={code}
          setCode={setCode}
          maximumLength={4}
          inputRef={inputRef}
          setIsPinReady={setIsPinReady}
        />
        <Button
          title={'Submit'}
          onPress={() => {
            if (code.length == 4) {
              verifyOTP(navigation);
            } else {
              common_fn.showToast('Enter The 4 Digit OTP!');
            }
          }}
          titleStyle={{textAlign: 'center'}}
          buttonStyle={{
            backgroundColor: Color.primary,
            borderRadius: 50,
            padding: 10,
          }}
          containerStyle={{
            marginHorizontal: 10,
            marginVertical: 20,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default TripOTPScreen;
