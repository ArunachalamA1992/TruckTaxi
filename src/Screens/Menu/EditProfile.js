import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';

const EditProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.UserReducer.userData);
  var {
    driverid,
    drivername,
    vehicleno,
    driverlicenceno,
    incexpiry,
    drivermobno,
    driveraddress,
    totalamt,
    comissionamt,
    tripscount,
    cabid,
  } = userData;
  const [name, setName] = useState(drivername ?? '');
  const [vehicleNumber, setVehicleNumber] = useState(vehicleno ?? '');
  const [expiryDate, setExpiryDate] = useState(incexpiry ?? '');
  const [number, setNumber] = useState(drivermobno ?? 0);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState(driveraddress ?? '');
  const [fileData, setFileData] = useState('');

  const theme = useSelector(state => state.ThemeReducer.theme);

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
  return (
    <View
      style={{
        ...styles.profileContainer,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      <ScrollView>
        {driverid.length != '' && (
          <View style={styles.ImageContainer}>
            <TouchableOpacity
              style={{
                ...styles.ImageView,
                backgroundColor: theme ? Color.white : Color.transparantBlack,
              }}
              onPress={() => chooseFile()}>
              {fileData == '' ? (
                <Text
                  style={{
                    ...styles.ImageText,
                    color: theme ? Color.white : Color.black,
                  }}>
                  {String(drivername).substring(0, 1)}
                </Text>
              ) : (
                <Image
                  source={{uri: fileData}}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    resizeMode: 'contain',
                  }}
                />
              )}
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                }}>
                <FIcon name="edit" size={40} color={Color.black} />
              </View>
            </TouchableOpacity>
            <View style={{marginHorizontal: 30}}>
              <Text
                style={{
                  ...styles.userName,
                  color: theme ? Color.white : Color.black,
                }}>
                {drivername}
              </Text>
            </View>
          </View>
        )}
        <View style={{marginVertical: 5}}>
          <View style={styles.ProfileSingleContainer}>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  Name
                </Text>
                <TextInput
                  placeholder="name"
                  placeholderTextColor={Color.cloudyGrey}
                  value={name}
                  onChangeText={text => setName(text)}
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    width: '100%',
                    color: Color.black,
                    fontWeight: '600',
                    backgroundColor: '#EEEEEE',
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  Vehicle Number
                </Text>
                <TextInput
                  placeholder="Vehicle Number"
                  placeholderTextColor={Color.cloudyGrey}
                  value={vehicleNumber}
                  onChangeText={text => setVehicleNumber(text)}
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    width: '100%',
                    color: Color.black,
                    fontWeight: '600',
                    backgroundColor: '#EEEEEE',
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  Expiry Date
                </Text>
                <TextInput
                  placeholder="Expiry Date"
                  placeholderTextColor={Color.cloudyGrey}
                  value={expiryDate}
                  onChangeText={text => setExpiryDate(text)}
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    width: '100%',
                    color: Color.black,
                    fontWeight: '600',
                    backgroundColor: '#EEEEEE',
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  Mobile Number
                </Text>
                <TextInput
                  placeholder="Mobile Number"
                  value={number}
                  placeholderTextColor={Color.cloudyGrey}
                  onChangeText={number => setNumber(number)}
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    width: '100%',
                    color: Color.black,
                    fontWeight: '600',
                    backgroundColor: '#EEEEEE',
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  City
                </Text>
                <TextInput
                  placeholder="City"
                  placeholderTextColor={Color.cloudyGrey}
                  value={city}
                  onChangeText={text => setCity(text)}
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    width: '100%',
                    color: Color.black,
                    fontWeight: '600',
                    backgroundColor: '#EEEEEE',
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View onPress={() => {}} style={styles.Click}>
              <View style={{}}>
                <Text
                  style={{
                    ...styles.PageName,
                    color: theme ? Color.white : Color.black,
                  }}>
                  Address
                </Text>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={Color.cloudyGrey}
                  value={address}
                  onChangeText={text => setAddress(text)}
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
                  }}
                  multiline
                />
              </View>
            </View>
          </View>
          <Button
            title={'Submit'}
            titleStyle={{
              fontSize: 14,
              color: Color.white,
              marginHorizontal: 10,
            }}
            buttonStyle={{
              backgroundColor: Color.primary,
              padding: 10,
              borderRadius: 10,
            }}
            containerStyle={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={() => (
              <Icon name="arrow-redo" size={18} color={Color.white} />
            )}
            onPress={() => {
              console.log('edit');
            }}
            iconRight={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {flex: 1, padding: 10},
  ImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  ImageView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  ImageText: {
    padding: 15,
    fontSize: 50,
    fontFamily: 'Poppins-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editprofileText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    color: Color.primary,
    textAlign: 'center',
  },
  ProfileSingleContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  Click: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 5,
  },
  PageName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
