import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import Color from '../Config/Color';
import { useDispatch, useSelector } from 'react-redux';
import { setTripAssignDetails, setTripAssignModalVisible } from '../Redux';
import { Media } from '../Global/Media';
import { Button, Divider } from 'react-native-elements';
import fetchData from '../Config/fetchData';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { common_fn } from '../Config/common_fn';
import { Dropdown } from 'react-native-element-dropdown';



import { useTranslation } from 'react-i18next';
import '../Translation';
import i18n from '../Translation';

const PermissionModal = props => {

  const { t } = useTranslation();
  var { setPermissionVisible, permissionVisible } = props;
  const [markDates, setMarkedDates] = useState({});
  const [starttDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [hourError, setHourError] = useState('');
  const [minError, setMinError] = useState('');
  const [error, setError] = useState('');
  const [hourVisible, setHourVisible] = useState(false);
  const [minVisible, setMinVisible] = useState(false);
  const [minvalue, setMinvalue] = useState('');
  const [hourvalue, setHourvalue] = useState('');

  const theme = useSelector(state => state.ThemeReducer.theme);
  const userData = useSelector(state => state.UserReducer.userData);
  var { cabid, driverid, drivername, cityid, drivermobno, cabno } = userData;
  const [getData, setGetData] = useState([]);
  const [selItem, setSelItem] = useState('');


  useEffect(() => {
    try {
      getReasonData();
    } catch (error) {
      console.log("catch in useEffect : ", error);
    }
  }, [])

  const chkReason = reason => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (reason.length === 0) {
      setReasonError('Enter Your Reason');
    } else if (reg.test(reason) === false) {
      setReasonError(false);
    } else if (reg.test(reason) === true) {
      setReasonError('');
    }
  };

  const chkHourtimer = hour => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (hour.length === 0) {
      setHourError('Enter Your Hour');
    } else if (reg.test(hour) === false) {
      setHourError(false);
    } else if (reg.test(hour) === true) {
      setHourError('');
    }
  };

  const chkMintimer = min => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (min.length === 0) {
      setMinError('Enter Your Minutes');
    } else if (reg.test(min) === false) {
      setMinError(false);
    } else if (reg.test(min) === true) {
      setMinError('');
    }
  };

  const [hourCount] = useState([
    { label: '1 hour', value: '1 hour' },
    { label: '2 hour', value: '2 hour' },
    { label: '3 hour', value: '3 hour' },
  ]);

  const [minCount] = useState([
    { label: '0 Mins', value: '0 Mins' },
    // {label: '5 Mins', value: '5 Mins'},
    // {label: '10 Mins', value: '10 Mins'},
    // {label: '20 Mins', value: '20 Mins'},
    { label: '30 Mins', value: '30 Mins' },
    // {label: '40 Mins', value: '40 Mins'},
    // {label: '50 Mins', value: '50 Mins'},
  ]);

  const driverErrorInput = () => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;
    if (!hourvalue.trim()) {
      var msg = 'Please Enter Hour';
      setHourError(msg);
      return;
    } else {
      setHourError(false);
    }
    // if (!minvalue.trim()) {
    //   var msg = 'Please Enter Min';
    //   setMinError(msg);
    //   return;
    // } else {
    //   setMinError(false);
    // }
    if (!reason.trim()) {
      var msg = 'Please Enter Reason';
      setReasonError(msg);
      return;
    } else if (reg.test(reason) === false) {
      setReasonError(false);
    } else {
      setReasonError(false);
    }
  };

  const getPermissionData = async () => {
    try {
      driverErrorInput();
      if (hourvalue != '') {
        const permission = await fetchData.permission({
          cabid: cabid,
          hours: hourvalue,
          "preason": selItem,
          perreqtime: new Date(),
        });
        if (permission?.status == 200) {
          setPermissionVisible(false);
          common_fn.showToast(permission?.message);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getReasonData = async () => {
    try {
      let response = await fetch('https://trucktaxi.co.in/api/app/reasonsforleave', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let responseJson = await response.json();
      if (responseJson?.status == 200) {
        // console.log('response =============123 : ', responseJson.data);
        setGetData(responseJson.data)
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  function renderReasonItem(item, index) {
    try {
      return (
        <TouchableOpacity onPress={() => selectReasonItem(item)}
          style={{
            margin: 5, padding: 10, paddingHorizontal: 20, justifyContent: 'center',
            alignItems: 'center', backgroundColor: selItem === item.id ? Color.primary : '#e5e5e5', borderRadius: 40
          }}>
          <Text style={{ fontSize: 14, color: selItem === item.id ? Color.white : Color.black }}>{item.reason}</Text>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log('catch in renderReason_Item : ', error)
    }
  }

  function selectReasonItem(item, index) {
    try {
      setSelItem(item.id)
    } catch (error) {
      console.log('catch in selectReason_Item : ', error)
    }
  }

  return (
    <Modal visible={permissionVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Color.transparantBlack,
        }}>
        <View
          // onPress={() => setPermissionVisible(false)}
          style={{ flex: 1 }}
        />
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 20,
                color: Color.black,
                fontWeight: '600',
                textAlign: 'center',
                marginVertical: 10,
              }}>{t('driverpermission')}</Text>
            {reasonError && (
              <Text style={styles.invalidError}>{reasonError}</Text>
            )}
            {hourError && <Text style={styles.invalidError}>{hourError}</Text>}
            {/* {minError && <Text style={styles.invalidError}>{minError}</Text>} */}
            {error && <Text style={styles.invalidError}>{error}</Text>}
          </View>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: '700',
              marginTop: 10,
              marginLeft: 10,
            }}>
            {t('perm_date')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              justifyContent: 'space-evenly',
            }}>
            <View style={{ width: '100%' }}>
              <Dropdown
                style={{
                  marginHorizontal: 10,
                  backgroundColor: '#EEEEEE',
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  height: 40,
                  borderColor: hourError ? Color.red : Color.primary,
                }}
                placeholderStyle={{ fontSize: 16, color: Color.cloudyGrey }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: Color.black,
                }}
                iconStyle={{ width: 20, height: 20 }}
                itemTextStyle={{ fontSize: 16, color: Color.cloudyGrey }}
                data={hourCount}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Pick Hour"
                searchPlaceholder="Search..."
                value={hourvalue}
                onChange={item => {
                  setHourvalue(item.value);
                  chkHourtimer(item.value);
                }}
              />
            </View>

          </View>


          <View style={{ width: '100%', marginVertical: 10 }}>
            <Text
              style={{
                ...styles.PageName, fontSize: 16, fontWeight: '700',
                color: theme ? Color.white : Color.black,
              }}>
              {t('reason')}
            </Text>

            <View style={{
              width: '100%', flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}>
              {getData.map((item, index) => renderReasonItem(item, index))}
            </View>
          </View>


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title={t('cancel')}
              titleStyle={{ color: Color.black }}
              buttonStyle={{
                backgroundColor: Color.white,
                borderWidth: 1,
                borderColor: Color.primary,
                padding: 10,
                marginVertical: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() => setPermissionVisible(false)}
              containerStyle={{
                width: '50%',
              }}
            />
            <Button
              title={t('submit')}
              titleStyle={{ color: Color.white }}
              buttonStyle={{
                backgroundColor: Color.primary,
                padding: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() => {
                getPermissionData();
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

export default PermissionModal;

const styles = StyleSheet.create({
  PageName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  invalidError: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
  },
});
