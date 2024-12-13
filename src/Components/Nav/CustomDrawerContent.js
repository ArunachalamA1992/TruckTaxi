import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  Appearance,
  ScrollView,
} from 'react-native';
import { Media } from '../../Global/Media';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import OIcon from 'react-native-vector-icons/Octicons';
import FdIcon from 'react-native-vector-icons/Foundation';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import { Divider, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  setAsyncTrip,
  setThemeChange,
  setTripAssignDetails,
  setTripMapStart,
} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from '../../Config/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { common_fn } from '../../Config/common_fn';
import { StackActions, useRoute } from '@react-navigation/native';
import { ColorTheme } from '../../Global/GlobalStyles';

import { useTranslation } from 'react-i18next';
import '../../Translation';
import i18n from '../../Translation';

const CustomDrawerContent = props => {
  var { navigation } = props;
  const { t } = useTranslation();
  const [itemSelected, setItemSelected] = useState('');
  const [visible, setVisible] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  const theme = useSelector(state => state.ThemeReducer.theme);
  var { cabid, drivername, drivermobno } = userData;
  const [uniqueId, setUniqueId] = useState('');
  const dispatch = useDispatch();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });
  }, []);

  const onToggleSwitch = async () => {
    dispatch(setThemeChange(!theme));
    await AsyncStorage.setItem('theme', JSON.stringify(!theme));
  };

  const logout = async () => {
    try {
      Alert.alert('Hi ' + drivername, 'Are you sure want to logout', [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const logout = await fetchData.logout({
              cabid: cabid,
              authkey: uniqueId,
            });
            if (logout.status == 200) {
              setItemSelected('logout'), AsyncStorage.clear();
              setAsyncTrip({});
              setTripAssignDetails({});
              setTripMapStart({});
              StackActions.replace({ replace: 'Auth' });
              navigation.navigate('Auth');
              common_fn.showToast(logout.message);
            }
          },
        },
      ]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    // <DrawerContentScrollView {...props}>
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme ? Color.black : Color.white }}>
      <View
        style={{
          backgroundColor: Color.primary,
          height: 210,
        }}>
        <View >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={Media.Splash}
              style={{ width: 100, height:100, resizeMode: 'contain' }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              padding: 20,
              flexDirection: 'row',
            }}>
            <Image
              source={Media.User}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  paddingVertical: 5,
                }}>
                {drivername}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.darkGrey,
                  marginVertical: 5,
                  fontWeight: '600',
                }}>
                +91 {drivermobno}
              </Text>
            </View>
            {/* <F5Icon name={'caret-right'} size={20} color={Color.white} /> */}
          </View>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View>
          <View
            style={{
              backgroundColor:
                itemSelected === 'Home'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Home'), props.navigation.navigate('Home');
              }}>
              <Icon name="home" size={20} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('Dashboard')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Profile'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 0,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Profile'),
                  props.navigation.navigate('Profile');
              }}>
              <FontAwesome name="user" size={22} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('Profile')}
              </Text>
            </TouchableOpacity>
          </View>


          <View
            style={{
              backgroundColor:
                itemSelected === 'My Trips'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('My Trips'),
                  props.navigation.navigate('TripHistory');
              }}>
              <FdIcon name="clipboard-notes" size={22} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('MyTrips')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Tutorial'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Tutorial'),
                  props.navigation.navigate('Tutorial');
              }}>
              <F5Icon
                name="chalkboard-teacher"
                size={20}
                color={Color.primary}
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('Tutorial')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'ChatScreen'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('ChatScreen'),
                  props.navigation.navigate('ChatScreen');
              }}>
              <Ionicons
                name="chatbox-ellipses"
                size={22}
                color={Color.primary}
              />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('Chat')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Privacy'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : theme
                      ? Color.black
                      : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Privacy'),
                  props.navigation.navigate('Privacy');
              }}>
              <F5Icon name="user-shield" size={20} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('PrivacyPolicy')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Contact Us'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Contact Us'),
                  props.navigation.navigate('Contactus');
              }}>
              <Icon name="call" size={20} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('ContactUs')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'Terms'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Terms'), props.navigation.navigate('Terms');
              }}>
              <OIcon name="checklist" size={20} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('TermsandConditions')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'selectLang'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('selectLang'), setShouldShow(!shouldShow);
              }}>
              <FontAwesome name="language" size={20} color={Color.primary} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('SelectLanguage')}
              </Text>
              <F5Icon
                name={shouldShow ? 'caret-down' : 'caret-right'}
                size={20}
                color={Color.primary}
              />
            </TouchableOpacity>

            {shouldShow ? (
              <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    i18n.changeLanguage('ta'), setItemSelected('tamil');
                  }}
                  style={{
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:theme
                      ? Color.white
                      : Color.black,
                      fontWeight: '700',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    தமிழ்
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    i18n.changeLanguage('en'), setItemSelected('english');
                  }}
                  style={{
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:theme
                      ? Color.white
                      : Color.black,
                      fontWeight: '700',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'settings'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                    ? Color.black
                    : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('settings'),
                  props.navigation.navigate('settings');
              }}>
              <Icon name="settings" size={20} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('Settings')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              alignItems: 'flex-end',
              marginRight: 10,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                width: 150,
                textAlign: 'right',
                color: Color.green,
                fontWeight: 'bold',
              }}>
              {t('AppVersion')} : {DeviceInfo.getVersion()}
            </Text>
          </View> */}
          {/* <View style={{marginVertical: 10}}>
            <Switch value={theme} onValueChange={onToggleSwitch} />
          </View> */}
          {/* <Divider style={{height: 1}} />
          <View
            style={{
              backgroundColor:
                itemSelected === 'logout'
                  ? theme
                    ? '#333'
                    : Color.lightgrey
                  : theme
                  ? Color.black
                  : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                logout();
              }}>
              <MIcon name="logout" size={24} color={Color.primary} />
              <Text
                style={{
                  fontSize: 14,
                  width: 150,
                  marginLeft: 15,
                  color: theme ? Color.white : Color.black,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
