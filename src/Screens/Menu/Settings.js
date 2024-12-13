import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../../Config/Color';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-native-paper';
import {
  setThemeChange,
  setTripHistory,
} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { Media } from '../../Global/Media';
import DeviceInfo from 'react-native-device-info';

const SettingScreeen = ({ navigation }) => {
  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripHistorySwitch = useSelector(
    state => state.TripReducer.TripHistory,
  );
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  const [uniqueId, setUniqueId] = useState('');
  var {
    drivername,
    drivermobno,
  } = userData;
  const onToggleSwitch = async () => {
    dispatch(setThemeChange(!theme));
    await AsyncStorage.setItem('theme', JSON.stringify(!theme));
  };
  const onTripHistorySwitch = async () => {
    dispatch(setTripHistory(!TripHistorySwitch));
    await AsyncStorage.setItem(
      'TripHistorySwitch',
      JSON.stringify(!TripHistorySwitch),
    );
  };
  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });
  }, [uniqueId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
        }}>
        <Image
          source={Media.Userpng}
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: theme ? Color.white : Color.black,
                fontWeight: '700',
                marginVertical: 5,
              }}>
              {drivername}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: theme ? Color.white : Color.cloudyGrey,
                fontWeight: '700',
                marginVertical: 5,
              }}>
              +91 {drivermobno}
            </Text>
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10, paddingHorizontal: 20
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: Color.primary,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 100,
          }}>
          <MIcon name="theme-light-dark" size={20} color={Color.white} />
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            marginHorizontal: 10,
            color: theme ? Color.white : Color.black,
            fontWeight: '600',
            marginVertical: 5,
          }}>
          Theme
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Switch value={theme} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default SettingScreeen;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 10,
  },
});
