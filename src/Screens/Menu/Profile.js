import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Divider} from 'react-native-elements';
import {Media} from '../../Global/Media';
import {Image} from 'react-native';
import {setAsyncTrip, setTripAssignDetails, setTripMapStart} from '../../Redux';
import {StackActions} from '@react-navigation/native';
import {common_fn} from '../../Config/common_fn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from '../../Config/fetchData';
import DeviceInfo from 'react-native-device-info';
import {LottieLoader,} from '../../Components/Lottie';

const Profile = ({navigation}) => {
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
  const [uniqueId, setUniqueId] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const theme = useSelector(state => state.ThemeReducer.theme);
  const [amount, setAmount] = useState('00');
  const [totalTrips, settotalTrips] = useState('00');

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
      getFareTrips();
    });
  }, [uniqueId]);

  const getFareTrips = async () => {
    try {
      var data = 'cabid=' + cabid;
      const showfareAmount = await fetchData.weekSummary(data);
      if (showfareAmount?.status == 200) {
        setAmount(showfareAmount.Earnings);
        settotalTrips(showfareAmount.Totaltrips);
      }
    } catch (error) {
      console.log('error', error);
    }
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
            console.log('logout', logout);
            if (logout.status == 200) {
              AsyncStorage.clear();
              setAsyncTrip({});
              setTripAssignDetails({});
              setTripMapStart({});
              StackActions.replace({replace: 'Auth'});
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

  useEffect(() => {
    setLoading(true);
    const profileTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearInterval(profileTimeout);
  }, []);

  return (
    <View style={styles.profileContainer}>
      {loading ? (
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('screen').height / 2,
          }}>
          <LottieLoader />
        </View>
      ) : (
        <ScrollView>
          {driverid.length != '' && (
            <View style={styles.ImageContainer}>
              <View style={styles.ImageView}>
                <Text style={styles.ImageText}>
                  {String(drivername).substring(0, 1)}
                </Text>
              </View>
              <View style={{marginHorizontal: 30, alignItems: 'center'}}>
                <Text style={styles.userName}>{drivername}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F5E2FC',
                    padding: 5,
                    borderRadius: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={styles.editprofileText}>ID : {driverid}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Color.white,
                        fontWeight: '600',
                        marginVertical: 10,
                      }}>
                      ₹ {amount}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontWeight: '600',
                      }}>
                      Amount
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 60,
                    width: 1,
                    backgroundColor: Color.lightgrey,
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Color.white,
                        fontWeight: '600',
                        marginVertical: 10,
                      }}>
                      {totalTrips}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontWeight: '600',
                      }}>
                      Total Trips
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              flex: 1,
              backgroundColor: theme ? Color.black : Color.white,
              padding: 10,
            }}>
            <View style={{}}>
              <View style={styles.ProfileSingleContainer}>
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Media.miniTruck}
                      style={{height: 50, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>Vehicle number</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}>
                      {vehicleno}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FIcon
                      name="drivers-license"
                      size={20}
                      color={Color.white}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>License number</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}>
                      TN 66 J4343246814
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Media.sandClock}
                      style={{height: 40, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>Expiry</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}>
                      {incexpiry}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="call" size={20} color={Color.white} />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>Mobile number</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}>
                      {drivermobno}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MIcon name="location-city" size={20} color={Color.white} />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>City</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}>
                      Coimbatore
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View onPress={() => {}} style={styles.Click}>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      padding: 5,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="location" size={20} color={Color.white} />
                  </View>
                  <View style={{}}>
                    <Text style={styles.PageName}>Address</Text>
                    <Text
                      style={{
                        flex: 1,
                        width: '80%',
                        fontSize: 15,
                        fontFamily: 'Poppins-SemiBold',
                        marginHorizontal: 10,
                        color: theme ? Color.white : Color.black,
                        fontWeight: '600',
                      }}
                      numberOfLines={3}>
                      {driveraddress}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {flex: 1, backgroundColor: Color.primary},
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
    backgroundColor: Color.green,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageText: {
    padding: 15,
    color: Color.white,
    fontSize: 50,
    fontFamily: 'Poppins-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    color: Color.white,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  PageName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 10,
    color: '#737373',
    fontWeight: '600',
  },
});
