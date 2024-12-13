import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  NativeModules
} from 'react-native';
import Color from '../../Config/Color';
import {Button} from 'react-native-elements';
import {Media} from '../../Global/Media';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../../Redux';
import {useDispatch} from 'react-redux';
import {common_fn} from '../../Config/common_fn';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging';
export const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const LoginScreen = ({navigation}) => {
  const {DevSettings} = NativeModules;
  console.log('DevSettings------>>>>', DevSettings);
  
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const [checked, setChecked] = useState(false);
  const [userHighLight, setUserHighLight] = useState(false);
  const [passHighLight, setPassHighLight] = useState(false);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
      provisional: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    }
  };

  const getFCMToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        try {
          const refreshToken = await messaging().getToken();
          if (refreshToken) {
            setToken(refreshToken);
            await AsyncStorage.setItem('fcmToken', refreshToken);
          } else {
          }
        } catch (error) {
          console.log('Error fetching token :', error);
        }
      } else {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        setToken(fcmToken);
      }
    } catch (error) {
      console.log('Catch in getFcmToken  : ', error);
    }
  };

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
      console.log('================DEVICE ID========================');
      console.log(uniqueId,'---');
    });
    requestUserPermission();
  }, [uniqueId, token]);
  

  const login = async navigation => {
    if (userName.trimStart().trimEnd() && password != '') {
      var data = {
        username: userName.trimStart().trimEnd(),
        password: password,
        deviceid: uniqueId,
        appversion : DeviceInfo.getVersion(),
        datetime: moment(new Date()).format('LLL'),
        refreshtoken: token,
      };
      const login = await fetchData.login(data);
      console.log('login', login);
      
      if (login?.status == 200) {
        await AsyncStorage.setItem('login', JSON.stringify(login?.data));
        dispatch(setUserData(login?.data));
        navigation.replace('Home');
        common_fn.showToast(login?.message);
      } else {
        var msg = login?.message;
        setError(msg);
      }
    } else {
      common_fn.showToast('Enter Your username and Password');
    }
  };

  const chkName = value => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (value.length === 0) {
      setError('Enter Your UserName And Password');
    } else if (reg.test(value) === false) {
      setError(false);
    } else if (reg.test(value) === true) {
      setError('');
    }
  };
  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.primary,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.primary,
            left: 0,
            right: 0,
          }}>
          <Image
            source={Media.tr_Logo}
            style={{resizeMode: 'contain', width: 120, height: 120}}
          />
        </View>
        <View style={{marginVertical: 10, padding: 20}}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 20,
                color: Color.white,
                fontWeight: '600',
                marginStart: 10,
              }}>
              Login
            </Text>
            <Text style={styles.invalidLogin}>{error}</Text>
          </View>
          <View
            style={{
              backgroundColor:
                userName?.length > 0 ? Color.white : 'transparent',
              borderColor: Color.white,
              borderWidth: 1,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              // marginVertical: 20,
              marginBottom: 20,
            }}>
            <Icon
              name={'person'}
              color={userName?.length > 0 ? Color.black : Color.white}
              size={18}
              style={{marginStart: 10}}
            />
            <TextInput
              placeholder="User name"
              value={userName.trimStart().trimEnd()}
              placeholderTextColor={Color.white}
              onChangeText={value => {
                setUserName(value), chkName(value);
                setUserHighLight(true);
              }}
              textContentType="name"
              style={{
                height: 45,
                fontSize: 16,
                // borderColor: Color.cloudyGrey,
                // borderWidth: 1,
                // marginTop: 20,
                // borderRadius: 5,
                color: userName?.length > 0 ? Color.black : Color.white,
                padding: 10,
                marginHorizontal: 5,
                width: '85%',
              }}
            />
          </View>
          <View
            style={{
              backgroundColor:
                password?.length > 0 ? Color.white : 'transparent',
              borderColor: Color.white,
              borderWidth: 1,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              paddingHorizontal: 10,
            }}>
            <FIcon
              name={'lock'}
              color={password?.length > 0 ? Color.black : Color.white}
              size={20}
              style={{marginStart: 10}}
            />
            <TextInput
              placeholder="Password"
              value={password}
              placeholderTextColor={Color.white}
              onChangeText={value => {
                setPassword(value), chkName(value);
                setPassHighLight(true);
              }}
              textContentType="password"
              secureTextEntry={!passwordVisible}
              style={{
                height: 45,
                fontSize: 16,
                // borderColor: Color.cloudyGrey,
                // borderWidth: 1,
                // marginTop: 20,
                // borderRadius: 5,
                marginHorizontal: 10,
                color: password?.length > 0 ? Color.black : Color.white,
                padding: 10,
                width: '80%',
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{position: 'absolute', right: 20}}>
              <FIcon
                name={passwordVisible ? 'eye' : 'eye-slash'}
                color={password?.length > 0 ? Color.black : Color.white}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setChecked(!checked);
              }}>
              <MCIcon
                name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
                size={24}
                color={Color.white}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.white,
                  textAlign: 'center',
                }}>
                By clicking Submit, you agree to our{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.trucktaxi.in/terms-conditions/')
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => login(navigation)}
            // onPress={() => checknotificatioon()}
            style={{
              backgroundColor: !checked ? Color.cloudyGrey : Color.white,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              marginVertical: 20,
            }}
            disabled={!checked}
            >
            <Text
              style={{
                fontSize: 16,
                color: !checked ? Color.darkGrey : Color.primary,
                fontWeight: '600',
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  invalidLogin: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
    marginVertical: 10,
  },
});
