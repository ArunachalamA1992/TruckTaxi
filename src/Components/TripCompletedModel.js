import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Color from '../Config/Color';
import {LottieCelebration} from './Lottie';
import {useDispatch, useSelector} from 'react-redux';
import {
  setTripAssignDetails,
  setTripCompleteData,
  setTripCompleteModalVisible,
  setTripMapStart,
  settriptimerAction,
} from '../Redux';
import {Media} from '../Global/Media';
import MICon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import fetchData from '../Config/fetchData';
import {common_fn} from '../Config/common_fn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-paper';
import {
  LocalNotification,
  TripcancelNotification,
  TripendNotification,
} from './pushNotify/PushController';

const {height, width} = Dimensions.get('screen');

const TripCompletedModal = ({navigation}) => {
  const dispatch = useDispatch();
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripAmount = useSelector(state => state.TripReducer.TripAmount);
  const TripComplete = useSelector(state => state.TripReducer.TripComplete);
  const [checked, setChecked] = useState(false);

  var {completed, tripstatus} = TripComplete;
  var {
    AssignedId,
    TripStarted,
    TripStoped,
    TripCompleted,
    AssignedId,
    otpcode,
    startSpeedometer,
    startMeterImage,
    otpcode,
    endSpeedometer,
    endMeterImage,
    startTripdate,
  } = TripStart;
  const [visible, setVisible] = useState(true);
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
    },
    {
      id: 2,
      rating: 2,
    },
    {
      id: 3,
      rating: 3,
    },
    {
      id: 4,
      rating: 4,
    },
    {
      id: 5,
      rating: 5,
    },
  ]);
  const [defaultRating, setDefaultRating] = useState(0);
  const starImageFilled = Media.star;
  const starImageCorner = Media.starOutline;

  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid, cityid, authkey} = userData;

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  const customerRatingPayment = async () => {
    try {
      //rating
      var data = {
        cabid: cabid,
        cityid: cityid,
        authkey: authkey,
        tripid: AssignedId,
        customerrating: defaultRating,
        comment: 'XYZ',
      };
      var paymentdata = {
        tripid: AssignedId,
        status: checked,
      };
      const payment = await fetchData.paymentUpdate(paymentdata);
      const rating = await fetchData.rating(data);
      if (rating?.status == 200) {
        // paymentReceived();
        dispatch(setTripCompleteData({completed: false, tripstatus: false}));
        setChecked(false);
      } else {
        common_fn.showToast('Please Fill The Rating');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  // const paymentReceived = async () => {
  //   try {
  //     var paymentdata = {
  //       tripid: AssignedId,
  //       status: checked,
  //     };
  //     const payment = await fetchData.paymentUpdate(paymentdata);
  //     if (payment?.status == 200) {
  //       dispatch(setTripCompleteData({completed: false}));
  //       setChecked(false);
  //     } else {
  //       common_fn.showToast('Please select The Payment');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const animated = useRef(new Animated.Value(0)).current;
  const statusBarHeight = useSafeAreaInsets().top;

  useEffect(() => {
    if (completed) {
      if (tripstatus == true) {
        dispatch(settriptimerAction(null));
        // dispatch(
        //   setTripAssignDetails({
        //     item:{

        //     }
        //   })),
        dispatch(
          setTripMapStart({
            TripStarted: false,
            AssignedId: 0,
            initialSpeedometer: 0,
            finalSpeedometer: 0,
            otpcode: 0,
            startImage: '',
            endImage: '',
            TripStoped: false,
            TripCompleted: false,
            startTripdate: '',
          }),
        );
        TripendNotification();
      } else {
        // dispatch(
        //   setTripAssignDetails({
        //     item:{

        //     }
        //   })),
        dispatch(
          setTripMapStart({
            TripStarted: false,
            AssignedId: 0,
            initialSpeedometer: 0,
            finalSpeedometer: 0,
            otpcode: 0,
            startImage: '',
            endImage: '',
            TripStoped: false,
            TripCompleted: false,
            startTripdate: '',
          }),
        );
        dispatch(settriptimerAction(null));
        TripcancelNotification();
      }
      Animated.timing(animated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [completed]);
  return (
    // <Modal
    //   visible={completed}
    //   transparent={true}
    //   animationType="slide">
    <>
      {completed && (
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: '#00000050',
            height,
            width,
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Color.transparantBlack,
              // alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <View
              style={{
                // flex: 1,
                backgroundColor: Color.white,
                padding: 10,
                borderRadius: 10,
                height: height / 2,
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // dispatch(
                  //   setTripMapStart({
                  //     TripStoped: false,
                  //     TripStarted: false,
                  //     AssignedId: AssignedId,
                  //     initialSpeedometer: startSpeedometer,
                  //     otpcode: 0,
                  //     finalSpeedometer: endSpeedometer,
                  //     startImage: startMeterImage,
                  //     endImage: endMeterImage,
                  //     TripCompleted: false,
                  //     startTripdate: startTripdate,
                  //   }),
                  // );
                  dispatch(
                    setTripCompleteData({completed: false, tripstatus: false}),
                  );
                }}
                style={{
                  backgroundColor: '#F5E2FC',
                  position: 'absolute',
                  right: 0,
                  width: 60,
                  height: 60,
                  top: 0,
                  borderBottomLeftRadius: 50,
                  borderTopRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MICon name="close" size={20} color={Color.primary} />
              </TouchableOpacity>
              <View style={{}}>
                <View
                  style={{
                    position: 'absolute',
                    top: -80,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Media.Check}
                    style={{width: 100, height: 100}}
                  />
                </View>
                <View style={{marginVertical: 10, alignItems: 'center'}}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      alignItems: 'center',
                    }}>
                    <LottieCelebration />
                  </View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '600',
                      color: theme ? Color.white : Color.black,
                      marginTop: 30,
                    }}>
                    {/* {tripstatus == true ? 'Trip Completed' : 'Trip Cancelled '} */}
                    Trip Completed
                  </Text>
                  {/* <Text
                style={{
                  fontSize: 18,
                  color: Color.cloudyGrey,
                  marginVertical: 10,
                  textAlign: 'center',
                }}>
                Trip Completed
              </Text> */}

                  {tripstatus == true ? (
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.cloudyGrey,
                        marginVertical: 10,
                        textAlign: 'center',
                      }}>
                      Your Trip Amount :{' '}
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.red,
                          marginVertical: 10,
                          textAlign: 'center',
                        }}>
                        ₹{TripAmount}
                      </Text>
                    </Text>
                  ) : null}
                </View>
                <View style={styles.customRatingBarStyle}>
                  {maxRating.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        onPress={() => handleRatingPress(item.rating)}
                        style={{
                          marginHorizontal: 10,
                          alignItems: 'center',
                        }}>
                        <Image
                          style={styles.starImageStyle}
                          source={
                            item.rating <= defaultRating
                              ? starImageFilled
                              : starImageCorner
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View
                  style={{
                    // flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  {/* <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      setChecked(!checked);
                    }}> */}
                  {/* <MCIcon
                      name={
                        !checked ? 'checkbox-blank-outline' : 'checkbox-marked'
                      }
                      size={24}
                      color={Color.black}
                    /> */}
                  <Switch
                    value={checked}
                    onValueChange={() => {
                      setChecked(!checked);
                    }}
                  />
                  {/* </TouchableOpacity> */}
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        textAlign: 'center',
                      }}>
                      IS Payment Received
                    </Text>
                  </View>
                </View>

                <Button
                  title={'Submit'}
                  titleStyle={{color: Color.white, marginHorizontal: 10}}
                  buttonStyle={{
                    backgroundColor: Color.primary,
                    marginVertical: 10,
                    borderRadius: 50,
                  }}
                  containerStyle={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    if (defaultRating != 0) {
                      customerRatingPayment();
                    } else {
                      common_fn.showToast('Please Fill The Rating');
                    }
                  }}
                />
                <Button
                  title={'Back'}
                  titleStyle={{color: Color.black, marginHorizontal: 10}}
                  buttonStyle={{
                    backgroundColor: '#EEEEEE',
                    borderRadius: 50,
                  }}
                  iconRight
                  containerStyle={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    // dispatch(
                    //   setTripMapStart({
                    //     TripStoped: false,
                    //     TripStarted: false,
                    //     AssignedId: AssignedId,
                    //     initialSpeedometer: startSpeedometer,
                    //     otpcode: 0,
                    //     finalSpeedometer: endSpeedometer,
                    //     startImage: startMeterImage,
                    //     endImage: endMeterImage,
                    //     TripCompleted: false,
                    //     startTripdate: startTripdate,
                    //   }),
                    // );
                    dispatch(
                      setTripCompleteData({
                        completed: false,
                        tripstatus: false,
                      }),
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      )}
    </>
    // </Modal>
  );
};

export default TripCompletedModal;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 30,
    marginVertical: 20,
  },
  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});
