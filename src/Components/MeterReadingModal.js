import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  PermissionsAndroid,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {setVehicleEndMeter, setVehicleStartMeter} from '../Redux';

const MeterReadingModal = () => {
  const startVehicleReading = useSelector(
    state => state.MeterReducer.startVehicleMeter,
  );
  const endVehicleReading = useSelector(
    state => state.MeterReducer.endVehicleMeter,
  );
  const dispatch = useDispatch();
  var {startMeterImage, startMeterVisible} = startVehicleReading;
  var {endMeterImage, endMeterVisible} = endVehicleReading;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
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
        // console.log("sourec",source);
        {
          startMeterVisible
            ? dispatch(
                setVehicleStartMeter({
                  startMeterImage: source[0].uri,
                  startMeterVisible: false,
                }),
              )
            : dispatch(
                setVehicleEndMeter({
                  endMeterImage: source[0].uri,
                  endMeterVisible: false,
                }),
              );
        }
      }
    });
  };

  return (
    <Modal
      // visible={startMeterVisible ? startMeterVisible : endMeterVisible}
      visible={false}
      transparent={true}
      animationType="slide">
      <View style={{flex: 1, backgroundColor: Color.transparantBlack}}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            startMeterVisible
              ? dispatch(setVehicleStartMeter({startMeterVisible: false}))
              : dispatch(setVehicleEndMeter({endMeterVisible: false}));
          }}
        />
        <View
          style={{
            backgroundColor: Color.white,
            padding: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            width: '100%',
          }}>
          <Text style={{fontSize: 14, color: Color.black, fontWeight: '600'}}>
            {startMeterVisible
              ? 'Enter Start Meter by Picking the Image'
              : 'Enter End Meter by Picking the Image'}
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Icon name="image" size={100} color={Color.black} />
            <TouchableOpacity
              onPress={() => {
                chooseFile();
              }}
              style={{
                backgroundColor: Color.primary,
                width: '100%',
                alignItems: 'center',
                padding: 10,
                borderRadius: 50,
              }}>
              <Text
                style={{fontSize: 14, color: Color.white, fontWeight: '600'}}>
                Click Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MeterReadingModal;
