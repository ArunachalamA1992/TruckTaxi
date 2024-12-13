import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Color from '../Config/Color';
import {useDispatch, useSelector} from 'react-redux';
import {setTripAssignDetails, setTripAssignModalVisible} from '../Redux';
import {Media} from '../Global/Media';
import {Button} from 'react-native-elements';
import fetchData from '../Config/fetchData';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';
import {TextInput} from 'react-native-gesture-handler';
import {common_fn} from '../Config/common_fn';

import {useTranslation} from 'react-i18next';
import '../Translation';
import i18n from '../Translation';

const LeaveRequestModal = props => {
  const {t} = useTranslation();
  var {leaveVisible, setLeaveVisible} = props;
  const [markDates, setMarkedDates] = useState({});
  const [starttDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [calenderVisible, setCalenderVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [dateError, setDateError] = useState('');
  const [error, setError] = useState('');

  const theme = useSelector(state => state.ThemeReducer.theme);
  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid, driverid, drivername, cityid, drivermobno, cabno} = userData;

  const [getData, setGetData] = useState([]);
  const [selItem, setSelItem] = useState('');

  useEffect(() => {
    try {
      getReasonData();
    } catch (error) {
      console.log('catch in useEffect : ', error);
    }
  }, []);

  const markFutureDatesAsDisabled = () => {
    const currentDate = moment();
    const endDate = moment().startOf('year');

    const disabledDates = {};

    for (
      let date = moment();
      date.isSameOrAfter(endDate, 'day');
      date.subtract(1, 'day')
    ) {
      const dateString = date.format('YYYY-MM-DD');

      if (date.isBefore(currentDate, 'day')) {
        disabledDates[dateString] = {disabled: true};
      }
    }

    setMarkedDates(disabledDates);
  };

  React.useEffect(() => {
    markFutureDatesAsDisabled();
  }, []);

  const onDayPress = day => {
    if (markDates[day.dateString]?.disabled) {
      return;
    }
    if (isStartDatePicked == false) {
      if (markDates[day.dateString]?.disabled) {
        return;
      }

      const newMarkedDates = {};
      newMarkedDates[day.dateString] = {
        startingDay: true,
        color: '#00B0BF',
        textColor: '#FFFFFF',
      };

      setMarkedDates({...markDates, ...newMarkedDates});
      setIsStartDatePicked(true);
      setIsEndDatePicked(false);
      setStartDate(day.dateString);
    } else {
      const newMarkedDates = {...markDates};
      let startDate = moment(starttDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            newMarkedDates[tempDate] =
              i < range
                ? {color: '#00B0BF', textColor: '#FFFFFF'}
                : {endingDay: true, color: '#00B0BF', textColor: '#FFFFFF'};
          } else {
            newMarkedDates[tempDate] =
              i < range
                ? {color: '#00B0BF', textColor: '#FFFFFF'}
                : {endingDay: true, color: '#00B0BF', textColor: '#FFFFFF'};
          }
        }
        setMarkedDates(newMarkedDates);
        setIsStartDatePicked(false);
        setIsEndDatePicked(true);
        setStartDate(starttDate);
        setEndDate(day.dateString);
        setCalenderVisible(false);
      } else {
        setEndDate(starttDate);
        setCalenderVisible(false);
      }
    }
  };

  const chkReason = reason => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;

    if (reason.length === 0) {
      setReasonError('Enter Your Reason');
    } else if (reg.test(reason) === false) {
      setReasonError(false);
      setError(false);
    } else if (reg.test(reason) === true) {
      setReasonError('');
      setError('');
    }
  };

  const chkDatePicker = date => {
    let reg = /^[6-9][0-9]*$/;

    if (date.length === 0) {
      setDateError('Enter Your Date');
    } else if (reg.test(date) === false) {
      setDateError(false);
      setError(false);
    } else if (reg.test(date) === true) {
      setDateError('');
    }
  };

  const driverErrorInput = () => {
    let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;
    if (!starttDate.trim()) {
      var msg = 'Please Enter start Date';
      setDateError(msg);
      return;
    } else {
      setDateError(false);
    }
    if (!endDate.trim()) {
      var msg = 'Please Enter End Date';
      setDateError(msg);
      return;
    } else {
      setDateError(false);
    }
    if (!reason.trimStart()) {
      var msg = 'Please Enter Reason';
      setReasonError(msg);
      return;
    } else if (reg.test(reason) === false) {
      setReasonError(false);
      setError(false);
    } else {
      setReasonError(false);
      setError(false);
    }
  };

  const getLeaveData = async () => {
    try {
      driverErrorInput();
      if (starttDate && endDate != '') {
        const leaveData = await fetchData.driverleave({
          cabid: cabid,
          cityid: cityid,
          reason: selItem,
          fromdate: starttDate,
          todate: endDate,
          leavereqtime: new Date(),
        });
        if (leaveData?.status == 200) {
          common_fn.showToast(leaveData?.message);
          setLeaveVisible(false);
        } else {
          console.log('else in getLeaveData ');
          // setError(leaveData?.message);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getReasonData = async () => {
    try {
      let response = await fetch(
        'https://trucktaxi.co.in/api/app/reasonsforleave',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      if (responseJson?.status == 200) {
        // console.log('response =============123 : ', responseJson.data);
        setGetData(responseJson.data);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  function renderReasonItem(item, index) {
    try {
      return (
        <TouchableOpacity
          onPress={() => selectReasonItem(item)}
          style={{
            margin: 5,
            padding: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selItem === item.id ? Color.primary : '#e5e5e5',
            borderRadius: 40,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: selItem === item.id ? Color.white : Color.black,
            }}>
            {item.reason}
          </Text>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log('catch in renderReason_Item : ', error);
    }
  }

  function selectReasonItem(item, index) {
    try {
      setSelItem(item.id);
    } catch (error) {
      console.log('catch in selectReason_Item : ', error);
    }
  }

  return (
    <Modal visible={leaveVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Color.transparantBlack,
        }}>
        <View
          //  onPress={() => setLeaveVisible(false)}
          style={{flex: 1}}
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
              }}>
              {t('driverLeave')}
            </Text>
            {reasonError != '' && (
              <Text style={styles.invalidError}>{reasonError}</Text>
            )}
            {dateError != '' && (
              <Text style={styles.invalidError}>{dateError}</Text>
            )}
            {error != '' && <Text style={styles.invalidError}>{error}</Text>}
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontWeight: '600',
                marginTop: 10,
                marginLeft: 10,
                marginVertical: 10,
              }}>
              {t('pickdate')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <TextInput
              placeholder="Start"
              value={starttDate}
              style={{
                fontSize: 15,
                textAlign: 'center',
                flex: 1,
                marginHorizontal: 10,
                fontFamily: 'Poppins-SemiBold',
                color: Color.black,
                fontWeight: '600',
                backgroundColor: '#EEEEEE',
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: dateError ? Color.red : Color.primary,
              }}
              onChangeText={date => chkDatePicker(date)}
              editable={false}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins-SemiBold',
                color: Color.black,
              }}>
              to
            </Text>
            <TextInput
              placeholder="End"
              value={endDate}
              style={{
                fontSize: 15,
                flex: 1,
                textAlign: 'center',
                marginHorizontal: 10,
                fontFamily: 'Poppins-SemiBold',
                color: Color.black,
                fontWeight: '600',
                backgroundColor: '#EEEEEE',
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: dateError ? Color.red : Color.primary,
              }}
              onChangeText={date => chkDatePicker(date)}
              editable={false}
            />
            <TouchableOpacity
              onPress={() => {
                setCalenderVisible(true);
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#EEEEEE',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: dateError ? Color.red : Color.primary,
              }}>
              <MIcon name="date-range" size={35} color={Color.primary} />
            </TouchableOpacity>
          </View>
          {calenderVisible && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: Color.white,
                shadowColor: Color.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                marginVertical: 5,
                marginHorizontal: 5,
                elevation: 4,
                zIndex: 1,
                width: '100%',
              }}>
              <Calendar
                // minDate={Date()}
                monthFormat={'MMMM yyyy'}
                markedDates={markDates}
                markingType="period"
                hideExtraDays={true}
                hideDayNames={true}
                onDayPress={day => onDayPress(day)}
              />
            </View>
          )}
          <View style={{}}>
            <Text
              style={{
                ...styles.PageName,
                fontSize: 16,
                color: Color.cloudyGrey,
                fontWeight: '600',
                // color: theme ? Color.white : Color.black,
              }}>
              {t('reason')}
            </Text>
            {/* <TextInput
              placeholder={t('reason')}
              placeholderTextColor={Color.cloudyGrey}
              value={reason.trimStart().trimEnd()}
              onChangeText={text => {
                setReason(text);
                chkReason(text);
              }}
              textAlignVertical="top"
              style={{
                fontSize: 15,
                fontFamily: 'Poppins-SemiBold',
                width: '100%',
                color: Color.black,
                fontWeight: '600',
                backgroundColor: '#EEEEEE',
                padding: 10,
                borderRadius: 10,
                height: 100,
                borderWidth: 1,
                borderColor: reasonError ? Color.red : '#EEEEEE',
              }}
              multiline
            /> */}

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
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
              titleStyle={{color: Color.black}}
              buttonStyle={{
                backgroundColor: Color.white,
                borderWidth: 1,
                borderColor: Color.primary,
                padding: 10,
                marginVertical: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() => setLeaveVisible(false)}
              containerStyle={{
                width: '50%',
              }}
            />
            <Button
              title={t('submit')}
              titleStyle={{color: Color.white}}
              buttonStyle={{
                backgroundColor: Color.primary,
                padding: 10,
                borderRadius: 50,
                marginHorizontal: 10,
              }}
              onPress={() => {
                getLeaveData();
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

export default LeaveRequestModal;

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
