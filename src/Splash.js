import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Color from './Config/Color';
import {LottieLoader} from './Components/Lottie';
import {Media} from './Global/Media';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {setThemeChange, setUserData} from './Redux';
import {Snackbar} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import fetchData from './Config/fetchData';

const SplashScreen = ({navigation}) => {
  // const [driverversion, setDriverVersion] = useState('');
  // const [currentVersion, setCurrentVersion] = useState('');
  // const getAPIdata = async () => {
  //   try {
  //     const driver = await fetchData.driverappversion({});
  //     setDriverVersion(driver?.version);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  // useEffect(() => {
  //   getAPIdata();
  //   setCurrentVersion(DeviceInfo.getVersion());
  //   if (driverversion != currentVersion) {
  //     Alert.alert(
  //       'Hello, it appears that you are using an older version. Kindly make an update. ',
  //       'Do you like to update',
  //       [
  //         {
  //           text: 'Yes',
  //           onPress: async () => {
  //           },
  //         },
  //       ],
  //     );
  //   }
  // }, [currentVersion, driverversion]);
  const dispatch = useDispatch();
  var {replace} = navigation;
  const [loading, setLoading] = useState(false);

  const setNetInfo = () => {
    NetInfo.fetch().then(state => {
      setLoading(state.isConnected);
    });
  };

  const getloginData = async () => {
    try {
      const value = await AsyncStorage.getItem('login');
      if (value == null) {
        replace('Auth');
      } else {
        var {driverid} = JSON.parse(value);
        if (driverid == '0') {
          replace('Auth');
        } else {
          dispatch(setUserData(value));
          replace('Home');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        dispatch(setThemeChange(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setNetInfo();
    getTheme();
  }, []);
  useEffect(() => {
    if (loading) {
      const splashLoad = setTimeout(() => {
        getloginData();
      }, 3000);
      return () => clearInterval(splashLoad);
    }
  }, [loading]);
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Color.primary,
      }}>
      {!loading && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: Color.black,
            padding: 10,
            borderRadius: 10,
            width: '90%',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: '600',
              color: Color.white,
            }}>
            No Internet Connection
          </Text>
          <TouchableOpacity
            onPress={() => setNetInfo()}
            style={{marginHorizontal: 20, alignItems: 'flex-end'}}>
            <Text
              style={{fontSize: 14, fontWeight: '600', color: Color.primary}}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Image
        source={Media.Splash}
        style={{width: 200, height: 200, resizeMode: 'contain'}}
      />
      <LottieLoader />
      <View style={{position: 'absolute', bottom: 5}}></View>
    </View>
  );
};
export default SplashScreen;
