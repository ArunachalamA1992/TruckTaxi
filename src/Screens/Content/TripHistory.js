import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
  Animated,
  Image,
  Easing,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Color from '../../Config/Color';
import {Button, Divider} from 'react-native-elements';
import {setTripRemoveDetails} from '../../Redux';
import fetchData from '../../Config/fetchData';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import WeeklyCalendar from 'react-native-weekly-calendar';
import {
  setMapTotalDistance,
  setMonthlyTrip,
  setPreviousDistance,
  setTripCompleteData,
  setTripCoordinates,
  setTripHistory,
  setTripMapStart,
  setTripTimer,
  settriptimerAction,
} from '../../Redux/Trip/TripAction';
import TripAssignModal from '../../Components/TripAssignModal';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Media} from '../../Global/Media';
import {useTranslation} from 'react-i18next';
import '../../Translation';
import {TripendNotification} from '../../Components/pushNotify/PushController';
import {log} from 'react-native-reanimated';
var {width, height} = Dimensions.get('window');
// const CurrentTrip = ({
//   TripAssigned,
//   TripStart,
//   AssignedId,
//   TripStarted,
//   navigation,
//   loading,
//   setLoading,
//   theme,
//   index,
// }) => {
//   var {
//     AssignedId,
//     TripStarted,
//     initialSpeedometer,
//     finalSpeedometer,
//     startMeterImage,
//     endMeterImage,
//     otpcode,
//     TripStoped,
//     startTripdate,
//   } = TripStart;
//   // console.log(TripStart,'TripAssignedTripAssigned');

//   const dispatch = useDispatch();
//   const [expanded, setExpanded] = useState(false);
//   const {t} = useTranslation();
//   const [uniqueId, setUniqueId] = useState('');
//   const [statusCode, setStatusCode] = useState({});

//   useEffect(() => {
//     DeviceInfo.getUniqueId().then(uniqueId => {
//       setUniqueId(uniqueId);
//     });
//   }, [uniqueId]);

//   const statusData = async () => {
//     const value = await AsyncStorage.getItem('Active_Login_status');
//     setStatusCode(JSON.parse(value));
//   };

//   useEffect(() => {
//     if (index == 0) {
//       const interval = setInterval(() => {
//         statusData();
//       }, 100);
//       if (
//         Object.values(TripAssigned)?.length > 0 &&
//         statusCode?.statuscode === 11
//       ) {
//         dispatch(setTripCompleteData({completed: true,tripstatus: true}));
//         // TripendNotification();
//         dispatch(
//           setTripRemoveDetails({
//             item: {
//               assignId: TripAssigned[0]?.assignId,
//               fromdistrict: '',
//               pickup: TripAssigned[0]?.pickup,
//               drop: TripAssigned[0]?.drop,
//               fromloclat: TripAssigned[0]?.fromloclat,
//               fromloclong: TripAssigned[0]?.fromloclong,
//               toloclat: TripAssigned[0]?.toloclat,
//               toloclong: TripAssigned[0]?.toloclong,
//               todistrict: '',
//               status: statusCode?.tripstatus,
//               date: TripAssigned[0]?.date,
//               distance: 0,
//               time: '',
//               amount: TripAssigned[0]?.total,
//               number: TripAssigned[0]?.number,
//               customerName: TripAssigned[0]?.customerName,
//             },
//           }),
//         );
//         dispatch(
//           setTripMapStart({
//             TripCompleted: false,
//             TripStoped: false,
//             TripStarted: false,
//             AssignedId: AssignedId,
//             initialSpeedometer: '',
//             otpcode: 0,
//             finalSpeedometer: '',
//             startImage: '',
//             endImage: '',
//             startTripdate: '',
//           }),
//         );
//         dispatch(
//           setMapTotalDistance({
//             totalDistance: 0,
//             destinationReached: false,
//           }),
//         );
//         dispatch(
//           setPreviousDistance({
//             previous: 0,
//             current: 0,
//           }),
//         );
//         dispatch(
//           setTripCoordinates({
//             triplatitude: 0,
//             triplongitude: 0,
//           }),
//         );
//         navigation.navigate('Home');
//       }
//       return () => clearInterval(interval);
//     }
//   }, [statusCode]);

//   const TimerRange = useSelector(state => state.TripReducer.TripTimer);
//   var {tripSeconds, tripMinutes, tripHours} = TimerRange;

//   const [endDate, setEnddate] = useState('');

//   const [totalMin, setTotalMin] = useState(0);

//   const convertMinsToHrsMins = minutes => {
//     var hours = Math.trunc(minutes / 60);
//     var tminutes = minutes % 60;
//     dispatch(
//       setTripTimer({
//         tripSeconds: tripSeconds,
//         tripMinutes: tminutes,
//         tripHours: hours,
//       }),
//     );
//   };
//   useEffect(() => {
//     if (TripStarted) {
//       const interval = setInterval(() => {
//         setEnddate(new Date());
//         setTotalMin(endDate - startTripdate);
//         convertMinsToHrsMins(totalMin / (1000 * 60));

//         if (startTripdate == 0) {
//           dispatch(
//             setTripMapStart({
//               TripStoped: false,
//               TripStarted: true,
//               AssignedId: AssignedId,
//               initialSpeedometer: initialSpeedometer,
//               otpcode: otpcode,
//               finalSpeedometer: finalSpeedometer,
//               startImage: startMeterImage,
//               endImage: endMeterImage,
//               TripCompleted: false,
//               startTripdate: new Date(),
//             }),
//           );
//         }
//       }, 1000);
//       return () => {
//         clearInterval(interval);
//       };
//     } else {
//       dispatch(
//         setTripTimer({
//           tripSeconds: tripSeconds,
//           tripMinutes: tripMinutes,
//           tripHours: tripHours,
//         }),
//       );
//     }
//   }, [tripSeconds, TripStarted, endDate, startTripdate]);

//   return (
//     <View style={{flex: 1, backgroundColor: theme ? Color.black : Color.white}}>
//       <FlatList
//         data={Object.values(TripAssigned)}
//         keyExtractor={(item, index) => item + index}
//         initialNumToRender={5}
//         renderItem={({item}) => {
//           // console.log(item,'+++#####++');
//           // console.log(statusCode,'statusCode?.tripstatusstatusCode?.tripstatus');
//           console.log(item.assignId, 'item.assignId');
//           console.log(item.assignId, 'item.assignId');
//           console.log(otpcode, 'item.assignId');

//           return (TripStarted && item.assignId === AssignedId) ||
//             (TripStoped && item.assignId === AssignedId) ||
//             (otpcode.length != 0 && item.assignId === AssignedId) ? (
//             <View
//               style={{
//                 marginHorizontal: 5,
//                 borderRadius: 10,
//                 padding: 10,
//               }}>
//               <TouchableOpacity
//                 style={{
//                   shadowColor: Color.black,
//                   backgroundColor: theme ? Color.lightBlack : Color.white,
//                   shadowOffset: {
//                     width: 0,
//                     height: 1,
//                   },
//                   shadowOpacity: 0.2,
//                   shadowRadius: 1.41,
//                   elevation: 8,
//                   borderRadius: 10,
//                 }}
//                 onPress={() => {
//                   navigation.navigate('maps', {
//                     item,
//                     statusCode,
//                   });
//                 }}>
//                 <View style={{padding: 10}}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontWeight: '600',
//                         color: '#6EC374',
//                         flex: 1,
//                         marginHorizontal: 5,
//                       }}>
//                       {item.assignId}
//                     </Text>
//                     <Text
//                       style={{
//                         flex: 1,
//                         fontSize: 14,
//                         color: Color.green,
//                         textAlign: 'center',
//                         backgroundColor: '#DDFFDF',
//                         // paddingHorizontal: 10,
//                         padding: 5,
//                         borderRadius: 50,
//                       }}>
//                       {statusCode?.tripstatus || '- -'}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       padding: 10,
//                       borderRadius: 100,
//                       backgroundColor: theme ? Color.lightBlack : Color.white,
//                     }}>
//                     <View
//                       style={{
//                         width: 40,
//                         height: 40,
//                         backgroundColor: Color.primary,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: 100,
//                       }}>
//                       <Icon name="location" size={30} color={Color.white} />
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         marginHorizontal: 10,
//                       }}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             flex: 1,
//                             fontSize: 14,
//                             fontWeight: '600',
//                             color: theme ? Color.white : Color.black,
//                           }}>
//                           {item.fromdistrict || 'From'}
//                         </Text>
//                         {tripMinutes > 0 || tripHours > 0 ? (
//                           <View style={styles.noReceivecodeView}>
//                             <Text
//                               style={{
//                                 ...styles.noReceiveText,
//                                 color: theme ? Color.white : Color.black,
//                               }}>
//                               {tripHours < 10
//                                 ? `0${tripHours.toFixed(0)}`
//                                 : tripHours.toFixed(0)}
//                               :
//                               {tripMinutes < 10
//                                 ? `0${tripMinutes.toFixed(0)}`
//                                 : tripMinutes.toFixed(0)}
//                             </Text>
//                           </View>
//                         ) : (
//                           <View />
//                         )}
//                       </View>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           marginVertical: 10,
//                           color: Color.cloudyGrey,
//                         }}
//                         numberOfLines={2}>
//                         {item.pickup}
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       height: 40,
//                       width: 1,
//                       marginBottom: 10,
//                       borderWidth: 1,
//                       borderStyle: 'dashed',
//                       borderColor: '#D4B6DF',
//                       position: 'absolute',
//                       left: 40,
//                       top: 95,
//                     }}
//                   />
//                   <Divider
//                     style={{
//                       height: 1,
//                       marginHorizontal: 40,
//                     }}
//                   />
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       padding: 10,
//                       borderRadius: 100,
//                       backgroundColor: theme ? Color.lightBlack : Color.white,
//                     }}>
//                     <View
//                       style={{
//                         width: 40,
//                         height: 40,
//                         backgroundColor: Color.primary,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: 100,
//                       }}>
//                       <F5Icon
//                         name="map-marked-alt"
//                         size={20}
//                         color={Color.white}
//                       />
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         marginHorizontal: 10,
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           fontWeight: '600',
//                           color: theme ? Color.white : Color.black,
//                         }}>
//                         {item.todistrict || 'To'}
//                       </Text>
//                       <View
//                         // onPress={() => {
//                         //   setExpanded(!expanded);
//                         // }}
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'flex-end',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             marginVertical: 10,
//                             color: Color.cloudyGrey,
//                             width: expanded ? '100%' : 200,
//                           }}
//                           numberOfLines={expanded ? undefined : 2}>
//                           {item.drop}
//                           {/* <Text
//                             style={{
//                               fontSize: 14,
//                               marginVertical: 10,
//                               color: Color.primary,
//                               fontWeight: 'bold',
//                             }}>
//                             {expanded && 'Read Less'}
//                           </Text> */}
//                         </Text>
//                         {/* <Text
//                           style={{
//                             fontSize: 14,
//                             marginVertical: 10,
//                             color: Color.primary,
//                             fontWeight: 'bold',
//                           }}>
//                           {!expanded && 'Read More'}
//                         </Text> */}
//                       </View>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         marginHorizontal: 10,
//                       }}>
//                       <View
//                         style={{
//                           borderRadius: 50,
//                           backgroundColor: '#F5E2FC',
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           padding: 10,
//                           width: 100,
//                         }}>
//                         <Text
//                           style={{
//                             color: Color.primary,
//                             fontSize: 12,
//                             marginHorizontal: 5,
//                             fontWeight: 'bold',
//                           }}>
//                           Enter OTP
//                         </Text>
//                         <FIcon name="check" size={16} color={Color.primary} />
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                       }}>
//                       <TouchableOpacity
//                         style={{
//                           alignItems: 'center',
//                           marginHorizontal: 10,
//                           backgroundColor: Color.primary,
//                           borderRadius: 100,
//                           width: 40,
//                           height: 40,
//                           justifyContent: 'center',
//                           shadowColor: Color.black,
//                           shadowOffset: {
//                             width: 0,
//                             height: 1,
//                           },
//                           shadowOpacity: 0.2,
//                           shadowRadius: 1.41,
//                           elevation: 8,
//                         }}
//                         onPress={() => {
//                           RNImmediatePhoneCall.immediatePhoneCall(
//                             '0422 3575757',
//                           );
//                         }}>
//                         <F5Icon name="headset" size={18} color={Color.white} />
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={{
//                           alignItems: 'center',
//                           marginHorizontal: 10,
//                           backgroundColor: Color.primary,
//                           borderRadius: 100,
//                           width: 40,
//                           height: 40,
//                           justifyContent: 'center',
//                           shadowColor: Color.black,
//                           shadowOffset: {
//                             width: 0,
//                             height: 1,
//                           },
//                           shadowOpacity: 0.2,
//                           shadowRadius: 1.41,
//                           elevation: 8,
//                         }}
//                         onPress={() => {
//                           RNImmediatePhoneCall.immediatePhoneCall(item.number);
//                         }}>
//                         <Icon name="call" size={18} color={Color.white} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View
//               style={{
//                 marginHorizontal: 5,
//                 borderRadius: 10,
//                 padding: 10,
//               }}>
//               <View
//                 style={{
//                   shadowColor: Color.black,
//                   backgroundColor: theme ? Color.lightBlack : Color.white,
//                   shadowOffset: {
//                     width: 0,
//                     height: 1,
//                   },
//                   shadowOpacity: 0.2,
//                   shadowRadius: 1.41,
//                   elevation: 8,
//                   borderRadius: 10,
//                 }}>
//                 <View style={{}}>
//                   <View style={{padding: 10}}>
//                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           fontWeight: '600',
//                           color: '#6EC374',
//                           flex: 1,
//                           marginHorizontal: 5,
//                         }}>
//                         #{item.assignId}
//                       </Text>
//                       <Text
//                         style={{
//                           flex: 1,
//                           fontSize: 14,
//                           color: Color.yellow,
//                           textAlign: 'center',
//                           backgroundColor: Color.softPeach,
//                           paddingHorizontal: 10,
//                           padding: 5,
//                           borderRadius: 50,
//                           fontWeight: 'bold',
//                         }}>
//                         {statusCode?.tripstatus || '- -'}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         padding: 10,
//                         borderRadius: 100,
//                         backgroundColor: theme ? Color.lightBlack : Color.white,
//                       }}>
//                       <View
//                         style={{
//                           width: 40,
//                           height: 40,
//                           backgroundColor: Color.primary,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           borderRadius: 100,
//                         }}>
//                         <Icon name="location" size={30} color={Color.white} />
//                       </View>
//                       <View
//                         style={{
//                           flex: 1,
//                           marginHorizontal: 10,
//                         }}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}>
//                           <Text
//                             style={{
//                               fontSize: 14,
//                               fontWeight: '600',
//                               color: theme ? Color.white : Color.black,
//                             }}>
//                             {item.fromdistrict || 'From'}
//                           </Text>
//                           {/* <Text
//                             style={{
//                               fontSize: 14,
//                               fontWeight: '600',
//                               color: '#6EC374',
//                               flex: 1,
//                               marginHorizontal: 5,
//                             }}>
//                             #{item.assignId}
//                           </Text>
//                           <Text
//                             style={{
//                               flex: 1,
//                               fontSize: 14,
//                               color: Color.yellow,
//                               textAlign: 'center',
//                               backgroundColor: Color.softPeach,
//                               paddingHorizontal: 10,
//                               padding: 5,
//                               borderRadius: 50,
//                             }}>
//                             {item.status}
//                           </Text> */}
//                         </View>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             marginVertical: 10,
//                             color: Color.cloudyGrey,
//                           }}
//                           numberOfLines={2}>
//                           {item.pickup}
//                         </Text>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}>
//                           <View
//                             style={{
//                               flex: 1,
//                               flexDirection: 'row',
//                               alignItems: 'center',
//                             }}>
//                             <Button
//                               title={'Enter OTP'}
//                               titleStyle={{
//                                 color: Color.primary,
//                                 fontSize: 12,
//                                 fontWeight: 'bold',
//                               }}
//                               buttonStyle={{
//                                 borderRadius: 50,
//                                 borderColor: Color.primary,
//                                 borderWidth: 1,
//                                 backgroundColor: Color.white,
//                               }}
//                               onPress={() => {
//                                 navigation.navigate('TripOTP', {
//                                   item,
//                                 });
//                                 // setOtpVisible({
//                                 //   visible: true,
//                                 //   otpData: item,
//                                 // });
//                               }}
//                               containerStyle={{width: 100}}
//                             />
//                           </View>
//                           <Text
//                             style={{
//                               color: Color.primary,
//                               fontSize: 18,
//                               fontWeight: 'bold',
//                             }}>
//                             ₹{item.amount}
//                           </Text>
//                         </View>
//                         <View
//                           style={{
//                             flex: 1,
//                             // alignItems: 'flex-end',
//                             marginVertical: 5,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}>
//                           <Text
//                             style={{
//                               flex: 1,
//                               color: Color.cloudyGrey,
//                               fontSize: 14,
//                             }}>
//                             {moment(item.date).format('LL')}
//                           </Text>

//                           <View
//                             style={{
//                               // flex: 1,
//                               flexDirection: 'row',
//                               alignItems: 'center',
//                             }}>
//                             <TouchableOpacity
//                               style={{
//                                 alignItems: 'center',
//                                 marginHorizontal: 10,
//                                 backgroundColor: Color.primary,
//                                 borderRadius: 100,
//                                 width: 40,
//                                 height: 40,
//                                 justifyContent: 'center',
//                                 shadowColor: Color.black,
//                                 shadowOffset: {
//                                   width: 0,
//                                   height: 1,
//                                 },
//                                 shadowOpacity: 0.2,
//                                 shadowRadius: 1.41,
//                                 elevation: 8,
//                               }}
//                               onPress={() => {
//                                 RNImmediatePhoneCall.immediatePhoneCall(
//                                   '0422 3575757',
//                                 );
//                               }}>
//                               <F5Icon
//                                 name="headset"
//                                 size={18}
//                                 color={Color.white}
//                               />
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                               style={{
//                                 alignItems: 'center',
//                                 marginHorizontal: 10,
//                                 backgroundColor: Color.primary,
//                                 borderRadius: 100,
//                                 width: 40,
//                                 height: 40,
//                                 justifyContent: 'center',
//                                 shadowColor: Color.black,
//                                 shadowOffset: {
//                                   width: 0,
//                                   height: 1,
//                                 },
//                                 shadowOpacity: 0.2,
//                                 shadowRadius: 1.41,
//                                 elevation: 8,
//                               }}
//                               onPress={() => {
//                                 RNImmediatePhoneCall.immediatePhoneCall(
//                                   item.number,
//                                 );
//                               }}>
//                               <Icon name="call" size={18} color={Color.white} />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//         ListEmptyComponent={() => {
//           return (
//             <View style={styles.emptyOrderPage}>
//               <MCIcon name="dump-truck" size={80} color={Color.primary} />
//               <Text style={styles.EmptyOrderText}>
//                 {t('NoTripshavebeenassigned')}
//               </Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };
const CurrentTrip = ({theme,navigation}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const {t} = useTranslation();
  const [uniqueId, setUniqueId] = useState('');
  const [statusCode, setStatusCode] = useState({});
  const userData = useSelector(state => state.UserReducer.userData);
  const [loader, setLoader] = useState(false);
  const [CurrentTripData, setCurrentTripData] = useState(null);
  const [BookingDetails, setbookingDetails] = useState(null);
  const Get_Current_Trip = async (Cabid, Cityid) => {
    console.log('cabid', Cabid, 'cityid', Cityid);
    const GetCurrenttrip = await fetchData?.get_available_trip({
      cabid: Cabid,
      cityid: Cityid,
    });
    console.log('GetCurrenttrip', GetCurrenttrip);
    
    if (
      GetCurrenttrip?.tripstatuscode == 1 ||
      GetCurrenttrip?.tripstatuscode == 2 ||
      GetCurrenttrip?.tripstatuscode == 3 ||
      GetCurrenttrip?.tripstatuscode == 4
    ) 
    {
      var data =
        'cabid=' +
        Cabid +
        '&cityid=' +
        Cityid +
        '&bookingid=' +
        GetCurrenttrip?.tripid;
      const GETBookingDetails = await fetchData?.getbookingdeatails(data);
      console.log('GetCurrenttrip', GetCurrenttrip);
      console.log('GETBookingDetails', GETBookingDetails);
      setbookingDetails(GETBookingDetails);
      setCurrentTripData(GetCurrenttrip);
    } else {
      setCurrentTripData(GetCurrenttrip);
    }
  };
  useEffect(() => {
    Get_Current_Trip(userData?.cabid, userData?.cityid);
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
      statusData();
    });
  }, [uniqueId]);

  const statusData = async () => {
    const value = await AsyncStorage.getItem('Active_Login_status');
    setStatusCode(JSON.parse(value));
  };

  // useEffect(() => {
  //   if (index == 0) {
  //     const interval = setInterval(() => {
  //       statusData();
  //     }, 100);
  //     if (
  //       Object.values(TripAssigned)?.length > 0 &&
  //       statusCode?.statuscode === 11
  //     ) {
  //       dispatch(setTripCompleteData({completed: true,tripstatus: true}));
  //       // TripendNotification();
  //       dispatch(
  //         setTripRemoveDetails({
  //           item: {
  //             assignId: TripAssigned[0]?.assignId,
  //             fromdistrict: '',
  //             pickup: TripAssigned[0]?.pickup,
  //             drop: TripAssigned[0]?.drop,
  //             fromloclat: TripAssigned[0]?.fromloclat,
  //             fromloclong: TripAssigned[0]?.fromloclong,
  //             toloclat: TripAssigned[0]?.toloclat,
  //             toloclong: TripAssigned[0]?.toloclong,
  //             todistrict: '',
  //             status: statusCode?.tripstatus,
  //             date: TripAssigned[0]?.date,
  //             distance: 0,
  //             time: '',
  //             amount: TripAssigned[0]?.total,
  //             number: TripAssigned[0]?.number,
  //             customerName: TripAssigned[0]?.customerName,
  //           },
  //         }),
  //       );
  //       dispatch(
  //         setTripMapStart({
  //           TripCompleted: false,
  //           TripStoped: false,
  //           TripStarted: false,
  //           AssignedId: AssignedId,
  //           initialSpeedometer: '',
  //           otpcode: 0,
  //           finalSpeedometer: '',
  //           startImage: '',
  //           endImage: '',
  //           startTripdate: '',
  //         }),
  //       );
  //       dispatch(
  //         setMapTotalDistance({
  //           totalDistance: 0,
  //           destinationReached: false,
  //         }),
  //       );
  //       dispatch(
  //         setPreviousDistance({
  //           previous: 0,
  //           current: 0,
  //         }),
  //       );
  //       dispatch(
  //         setTripCoordinates({
  //           triplatitude: 0,
  //           triplongitude: 0,
  //         }),
  //       );
  //       navigation.navigate('Home');
  //     }
  //     return () => clearInterval(interval);
  //   }
  // }, [statusCode]);

  // const TimerRange = useSelector(state => state.TripReducer.TripTimer);
  // var {tripSeconds, tripMinutes, tripHours} = TimerRange;

  // const [endDate, setEnddate] = useState('');

  // const [totalMin, setTotalMin] = useState(0);

  // const convertMinsToHrsMins = minutes => {
  //   var hours = Math.trunc(minutes / 60);
  //   var tminutes = minutes % 60;
  //   dispatch(
  //     setTripTimer({
  //       tripSeconds: tripSeconds,
  //       tripMinutes: tminutes,
  //       tripHours: hours,
  //     }),
  //   );
  // };
  // useEffect(() => {
  //   if (TripStarted) {
  //     const interval = setInterval(() => {
  //       setEnddate(new Date());
  //       setTotalMin(endDate - startTripdate);
  //       convertMinsToHrsMins(totalMin / (1000 * 60));

  //       if (startTripdate == 0) {
  //         dispatch(
  //           setTripMapStart({
  //             TripStoped: false,
  //             TripStarted: true,
  //             AssignedId: AssignedId,
  //             initialSpeedometer: initialSpeedometer,
  //             otpcode: otpcode,
  //             finalSpeedometer: finalSpeedometer,
  //             startImage: startMeterImage,
  //             endImage: endMeterImage,
  //             TripCompleted: false,
  //             startTripdate: new Date(),
  //           }),
  //         );
  //       }
  //     }, 1000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   } else {
  //     dispatch(
  //       setTripTimer({
  //         tripSeconds: tripSeconds,
  //         tripMinutes: tripMinutes,
  //         tripHours: tripHours,
  //       }),
  //     );
  //   }
  // }, [tripSeconds, TripStarted, endDate, startTripdate]);

  return (
    <View style={{flex: 1, backgroundColor: theme ? Color.black : Color.white}}>
      {CurrentTripData?.message == 'No Trips Found' ? (
        <View style={styles.emptyOrderPage}>
          <MCIcon name="dump-truck" size={80} color={Color.primary} />
          <Text style={styles.EmptyOrderText}>
            {t('NoTripshavebeenassigned')}
          </Text>
        </View>
      ) : null}
      {CurrentTripData?.tripstatuscode == 1 ? (
        <View
          style={{
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}>
          <View
            style={{
              shadowColor: Color.black,
              backgroundColor: theme ? Color.lightBlack : Color.white,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 8,
              borderRadius: 10,
            }}>
            <View style={{}}>
              <View style={{padding: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#6EC374',
                      flex: 1,
                      marginHorizontal: 5,
                    }}>
                    #{CurrentTripData?.bookingid}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: Color.yellow,
                      textAlign: 'center',
                      backgroundColor: Color.softPeach,
                      paddingHorizontal: 10,
                      padding: 5,
                      borderRadius: 50,
                      fontWeight: 'bold',
                    }}>
                    {CurrentTripData?.tripstatus}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: theme ? Color.lightBlack : Color.white,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: Color.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                    }}>
                    <Icon name="location" size={30} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: theme ? Color.white : Color.black,
                        }}>
                        From
                      </Text>
                      {/* <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#6EC374',
                flex: 1,
                marginHorizontal: 5,
              }}>
              #{item.assignId}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                color: Color.yellow,
                textAlign: 'center',
                backgroundColor: Color.softPeach,
                paddingHorizontal: 10,
                padding: 5,
                borderRadius: 50,
              }}>
              {item.status}
            </Text> */}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        marginVertical: 10,
                        color: Color.cloudyGrey,
                      }}
                      numberOfLines={2}>
                      {CurrentTripData?.fromloc}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Button
                          title={'Enter OTP'}
                          titleStyle={{
                            color: Color.primary,
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}
                          buttonStyle={{
                            borderRadius: 50,
                            borderColor: Color.primary,
                            borderWidth: 1,
                            backgroundColor: Color.white,
                          }}
                          onPress={() => {
                            navigation.navigate('TripOTP',
                              {
                              CurrentTripData,
                              BookingDetails,
                            });
                            // setOtpVisible({
                            //   visible: true,
                            //   otpData: item,
                            // });
                          }}
                          containerStyle={{width: 100}}
                        />
                      </View>
                      {/* <Text
                        style={{
                          color: Color.primary,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        ₹ {BookingDetails?.total}
                      </Text> */}
                    </View>
                    {/* <View
            style={{
              flex: 1,
              // alignItems: 'flex-end',
              marginVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                color: Color.cloudyGrey,
                fontSize: 14,
              }}>
              {moment(CurrentTripData?.pickupdatetime).format('LL')}
            </Text>

            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: Color.primary,
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  shadowColor: Color.black,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 8,
                }}
                onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall(
                    '0422 3575757',
                  );
                }}>
                <F5Icon
                  name="headset"
                  size={18}
                  color={Color.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: Color.primary,
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  shadowColor: Color.black,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 8,
                }}
                // onPress={() => {
                //   RNImmediatePhoneCall.immediatePhoneCall(
                //     item.number,
                //   );
                // }}
                >
                <Icon name="call" size={18} color={Color.white} />
              </TouchableOpacity>
            </View>
          </View> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontSize: 14,
                    }}>
                    {moment(CurrentTripData?.pickupdatetime).format(
                      'MMMM D, YYYY',
                    )}
                  </Text>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        marginHorizontal: 10,
                        backgroundColor: Color.primary,
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        shadowColor: Color.black,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 8,
                      }}
                      onPress={() => {
                        RNImmediatePhoneCall.immediatePhoneCall('0422 3575757');
                      }}>
                      <F5Icon name="headset" size={18} color={Color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        marginHorizontal: 10,
                        backgroundColor: Color.primary,
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        shadowColor: Color.black,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 8,
                      }}
                      onPress={() => {
                        RNImmediatePhoneCall.immediatePhoneCall(BookingDetails?.customermobno);
                      }}>
                      <Icon name="call" size={18} color={Color.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : CurrentTripData?.tripstatuscode == 2 ||
        CurrentTripData?.tripstatuscode == 3 ||
        CurrentTripData?.tripstatuscode == 4 ? (
        <View
          style={{
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              shadowColor: Color.black,
              backgroundColor: theme ? Color.lightBlack : Color.white,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 8,
              borderRadius: 10,
            }}
            onPress={() => {
              
              // dispatch(
              //   setTripMapStart({
              //     TripStoped: false,
              //     TripStarted: true,
              //     AssignedId: AssignedId,
              //     initialSpeedometer: initialSpeedometer,
              //     otpcode: otpcode,
              //     finalSpeedometer: finalSpeedometer,
              //     startImage: startMeterImage,
              //     endImage: endMeterImage,
              //     TripCompleted: false,
              //     startTripdate: new Date(),
              //   }),
              // );
              // console.log("CCCCCCCCCCCCCCCCCCCCCCCC");
              // console.log("VVVVVVVVVVVVVVVVVVVVV");



              if(CurrentTripData?.tripstatuscode == 3){
                dispatch(
                    setTripMapStart({
                      TripStoped: true,
                      TripStarted: false,
                      AssignedId:BookingDetails?.bookingid ,
                      initialSpeedometer: statusCode?.livekm,
                      otpcode:1234 ,
                      finalSpeedometer: 0,
                      startImage:"" ,
                      endImage:"" ,
                      TripCompleted: false,
                      startTripdate:BookingDetails?.tripdatetime,
                    }),
                  );
              }
              navigation.navigate('maps', {
                CurrentTripData,
                statusCode,
                BookingDetails,
              });
              
              console.log('CurrentTripData', CurrentTripData);
              console.log('statusCode', statusCode);
              console.log('BookingDetails', BookingDetails);
              
            }}>
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#6EC374',
                    flex: 1,
                    marginHorizontal: 5,
                  }}>
                  {CurrentTripData?.bookingid || '- -'}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: Color.green,
                    textAlign: 'center',
                    backgroundColor: '#DDFFDF',
                    // paddingHorizontal: 10,
                    padding: 5,
                    borderRadius: 50,
                  }}>
                  {CurrentTripData?.tripstatus}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: theme ? Color.lightBlack : Color.white,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: Color.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <Icon name="location" size={30} color={Color.white} />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: '600',
                        color: theme ? Color.white : Color.black,
                      }}>
                      {/* {item.fromdistrict || 'From'} */} From
                    </Text>
                    {/* {tripMinutes > 0 || tripHours > 0 ? (
                          <View style={styles.noReceivecodeView}>
                            <Text
                              style={{
                                ...styles.noReceiveText,
                                color: theme ? Color.white : Color.black,
                              }}>
                              {tripHours < 10
                                ? `0${tripHours.toFixed(0)}`
                                : tripHours.toFixed(0)}
                              :
                              {tripMinutes < 10
                                ? `0${tripMinutes.toFixed(0)}`
                                : tripMinutes.toFixed(0)}
                            </Text>
                          </View>
                        ) : (
                          <View />
                        )} */}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginVertical: 10,
                      color: Color.cloudyGrey,
                    }}
                    numberOfLines={2}>
                    {CurrentTripData?.fromloc}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 40,
                  width: 1,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#D4B6DF',
                  position: 'absolute',
                  left: 40,
                  top: 95,
                }}
              />
              <Divider
                style={{
                  height: 1,
                  marginHorizontal: 40,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: theme ? Color.lightBlack : Color.white,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: Color.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <F5Icon name="map-marked-alt" size={20} color={Color.white} />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: theme ? Color.white : Color.black,
                    }}>
                    {/* {item.todistrict || 'To'} */} To
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginVertical: 10,
                        color: Color.cloudyGrey,
                        width: expanded ? '100%' : 200,
                      }}
                      numberOfLines={expanded ? undefined : 2}>
                     {CurrentTripData?.toloc}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: '#F5E2FC',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      width: 100,
                    }}>
                    <Text
                      style={{
                        color: Color.primary,
                        fontSize: 12,
                        marginHorizontal: 5,
                        fontWeight: 'bold',
                      }}>
                      Enter OTP
                    </Text>
                    <FIcon name="check" size={16} color={Color.primary} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      marginHorizontal: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 100,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      shadowColor: Color.black,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 8,
                    }}
                    onPress={() => {
                      RNImmediatePhoneCall.immediatePhoneCall('0422 3575757');
                    }}>
                    <F5Icon name="headset" size={18} color={Color.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      marginHorizontal: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 100,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      shadowColor: Color.black,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 8,
                    }}
                    onPress={() => {
                      // RNImmediatePhoneCall.immediatePhoneCall(item.number);
                      console.log('call Pressed');
                    }}>
                    <Icon name="call" size={18} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const TripHistory = ({theme}) => {
  const {t} = useTranslation();
  const [tripHistory, setTripHistory] = useState([]);
  const [weekHistory, setWeekHistory] = useState([]);
  const [markDates, setMarkedDates] = useState({});
  const [starttDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const FilterDate = useSelector(state => state.UserReducer.filterDate);
  const userData = useSelector(state => state.UserReducer.userData);
  const weeklyVisible = useSelector(state => state.TripReducer.WeeklyTrip);
  const monthlyVisible = useSelector(state => state.TripReducer.MonthlyTrip);
  const [starttWeekDate, setStartWeekDate] = useState('');
  const [endWeekDate, setEndWeekDate] = useState('');
  var {cabid} = userData;

  const getHistoryData = async () => {
    try {
      var data =
        'cabid=' + cabid + '&fromdate=' + starttDate + '&todate=' + endDate;
      const History = await fetchData.triphistory(data);
      console.log('====================================');
      console.log('history', History);
      console.log('====================================');
      setTripHistory(History?.data);
      var data =
        'cabid=' +
        cabid +
        '&fromdate=' +
        starttWeekDate +
        '&todate=' +
        moment(endWeekDate).add(1, 'day').format('YYYY-MM-DD');
      console.log('data', data);
      const WeekHistory = await fetchData.triphistory(data);
      setWeekHistory(WeekHistory?.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getHistoryData().finally(() => {
      setLoading(false);
    });
  }, [starttDate, endDate, starttWeekDate, endWeekDate]);

  const dispatch = useDispatch();

  const markFutureDatesAsDisabled = () => {
    const currentDate = moment();
    const endDate = moment().endOf('year');

    const disabledDates = {};

    for (
      let date = moment();
      date.isSameOrBefore(endDate, 'day');
      date.add(1, 'day')
    ) {
      const dateString = date.format('YYYY-MM-DD');

      if (date.isAfter(currentDate, 'day')) {
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

    if (!isStartDatePicked) {
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
      const startMoment = moment(starttDate);
      const endMoment = moment(day.dateString);
      const range = endMoment.diff(startMoment, 'days');

      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          const tempDate = startMoment.add(1, 'day').format('YYYY-MM-DD');
          newMarkedDates[tempDate] =
            i < range
              ? {color: '#00B0BF', textColor: '#FFFFFF'}
              : {endingDay: true, color: '#00B0BF', textColor: '#FFFFFF'};
        }

        setMarkedDates(newMarkedDates);
        setIsStartDatePicked(false);
        setIsEndDatePicked(true);
        setStartDate(starttDate);
        setEndDate(moment(day.dateString).add(1, 'day').format('YYYY-MM-DD'));
        dispatch(setMonthlyTrip(false));
      } else {
        setEndDate(moment(starttDate).add(1, 'day').format('YYYY-MM-DD'));
        dispatch(setMonthlyTrip(false));
      }
    }
  };

  useEffect(() => {
    markFutureDatesAsDisabled();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      {weeklyVisible ? (
        <>
          {monthlyVisible && (
            <View
              style={{
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
              }}>
              <Calendar
                monthFormat={'MMMM yyyy'}
                markedDates={markDates}
                markingType="period"
                hideExtraDays={true}
                hideDayNames={true}
                onDayPress={day => onDayPress(day)}
              />
            </View>
          )}
        </>
      ) : (
        <View>
          <WeeklyCalendar
            events={[]}
            style={{height: 105}}
            renderDay={(eventView, weekdayToAdd, i) => {
              setStartWeekDate(
                moment(weekdayToAdd).startOf('week').format('YYYY-MM-DD'),
              );
              setEndWeekDate(
                moment(weekdayToAdd).endOf('week').format('YYYY-MM-DD'),
              );
            }}
          />
        </View>
      )}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Media.Loaderwheel} style={{width: 100, height: 100}} />
        </View>
      ) : (
        <>
          {weeklyVisible ? (
            <FlatList
              data={tripHistory}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={5}
              renderItem={({item, index}) => {
                console.log('item======>', item);

                var {
                  tripid,
                  dateandtime,
                  tripstatus,
                  total,
                  fromloc,
                  toloc,
                  distance,
                  driverrating,
                } = item;
                if (
                  tripstatus !== 'Completed' 
                ) {
                  return null;
                }
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme ? Color.lightBlack : Color.white,
                      marginHorizontal: 5,
                      borderRadius: 10,
                      padding: 5,
                      shadowColor: Color.black,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      borderWidth: 1,
                      borderColor:
                        tripstatus == 'Completed' ? Color.green : Color.red,
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,
                      marginVertical: 5,
                      elevation: 4,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                      }}>
                      <View style={{}}>
                        <View style={{padding: 5}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              color: '#6EC374',
                              flex: 1,
                              marginHorizontal: 5,
                            }}>
                            #{tripid}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              padding: 5,
                              borderRadius: 100,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                              }}>
                              <Icon
                                name="location"
                                size={30}
                                color={Color.white}
                              />
                            </View>
                            <View
                              style={{
                                flex: 1,
                                marginHorizontal: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    flex: 1,
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: theme ? Color.white : Color.black,
                                  }}>
                                  {fromloc}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.primary,
                                    textAlign: 'center',
                                    backgroundColor: '#F5E2FC',
                                    paddingHorizontal: 10,
                                    padding: 5,
                                    marginVertical: 5,
                                    borderRadius: 50,
                                  }}>
                                  {tripstatus}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: Color.cloudyGrey,
                                  }}>
                                  {moment(dateandtime).format('LL')}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              // paddingLeft: 10,
                              height: 20,
                              width: 1,
                              marginBottom: 10,
                              borderWidth: 1,
                              borderStyle: 'dashed',
                              borderColor: '#D4B6DF',
                              position: 'absolute',
                              left: 30,
                              top: 75,
                            }}
                          />
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginVertical: 10,
                              marginHorizontal: 5,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                              }}>
                              <F5Icon
                                name="map-marked-alt"
                                size={20}
                                color={Color.white}
                              />
                            </View>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 14,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                color: theme ? Color.white : Color.black,
                                fontWeight: '600',
                              }}
                              numberOfLines={2}>
                              {toloc}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: theme ? Color.white : Color.black,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                Amount:
                              </Text>
                              <Text
                                style={{
                                  fontSize: 20,
                                  marginHorizontal: 10,
                                  color: Color.red,
                                  fontWeight: 'bold',
                                }}
                                numberOfLines={2}>
                                ₹{total}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: theme ? Color.white : Color.black,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                Distance:
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  marginHorizontal: 10,
                                  color: Color.red,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                {distance} KM
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              marginVertical: 5,
                            }}>
                            <MIcon
                              name={driverrating >= 1 ? 'star' : 'star-border'}
                              size={20}
                              color={
                                item.driverrating >= 1 ? '#ffb300' : '#aaa'
                              }
                            />
                            <MIcon
                              name={driverrating >= 2 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 2 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 3 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 3 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 4 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 4 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 5 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 5 ? '#ffb300' : '#aaa'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MCIcon name="dump-truck" size={80} color={Color.primary} />
                    <Text
                      style={{
                        ...styles.EmptyOrderText,
                        color: Color.primary,
                      }}>
                      {t('NoTripsHistory')}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
            <FlatList
              data={weekHistory}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={5}
              renderItem={({item, index}) => {
                var {
                  tripid,
                  dateandtime,
                  tripstatus,
                  total,
                  fromloc,
                  toloc,
                  driverrating,
                  distance,
                  driverrating,
                } = item;
                console.log('====================================');
                console.log('item', item);
                console.log('====================================');
                if (
                  tripstatus === 'Current Duty' ||
                  tripstatus === 'New Booking' ||
                  tripstatus === 'Cancel'
                ) {
                  return null;
                }
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme ? Color.lightBlack : Color.white,
                      marginHorizontal: 5,
                      borderRadius: 10,
                      padding: 5,
                      shadowColor: Color.black,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      borderWidth: 1,
                      borderColor:
                        tripstatus == 'Completed' ? Color.green : Color.red,
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,
                      marginVertical: 5,
                      elevation: 4,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                      }}>
                      <View style={{}}>
                        <View style={{padding: 5}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              color: '#6EC374',
                              flex: 1,
                              marginHorizontal: 5,
                            }}>
                            #{tripid}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              padding: 5,
                              borderRadius: 100,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                              }}>
                              <Icon
                                name="location"
                                size={30}
                                color={Color.white}
                              />
                            </View>
                            <View
                              style={{
                                flex: 1,
                                marginHorizontal: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    flex: 1,
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: theme ? Color.white : Color.black,
                                  }}>
                                  {fromloc}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.primary,
                                    textAlign: 'center',
                                    backgroundColor: '#F5E2FC',
                                    paddingHorizontal: 10,
                                    padding: 5,
                                    marginVertical: 5,
                                    borderRadius: 50,
                                  }}>
                                  {tripstatus}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: Color.cloudyGrey,
                                  }}>
                                  {moment(dateandtime).format('LL')}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              // paddingLeft: 10,
                              height: 20,
                              width: 1,
                              marginBottom: 10,
                              borderWidth: 1,
                              borderStyle: 'dashed',
                              borderColor: '#D4B6DF',
                              position: 'absolute',
                              left: 30,
                              top: 75,
                            }}
                          />
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginVertical: 10,
                              marginHorizontal: 5,
                            }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                              }}>
                              <F5Icon
                                name="map-marked-alt"
                                size={20}
                                color={Color.white}
                              />
                            </View>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 14,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                color: theme ? Color.white : Color.black,
                                fontWeight: '600',
                              }}
                              numberOfLines={2}>
                              {toloc}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: theme ? Color.white : Color.black,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                {t('Amount')}:
                              </Text>
                              <Text
                                style={{
                                  fontSize: 20,
                                  marginHorizontal: 10,
                                  color: Color.red,
                                  fontWeight: 'bold',
                                }}
                                numberOfLines={2}>
                                ₹{total}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: theme ? Color.white : Color.black,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                {t('Distance')}:
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  marginHorizontal: 10,
                                  color: Color.red,
                                  fontWeight: '600',
                                }}
                                numberOfLines={2}>
                                {distance} {t('KM')}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              marginVertical: 5,
                            }}>
                            <MIcon
                              name={driverrating >= 1 ? 'star' : 'star-border'}
                              size={20}
                              color={
                                item.driverrating >= 1 ? '#ffb300' : '#aaa'
                              }
                            />
                            <MIcon
                              name={driverrating >= 2 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 2 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 3 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 3 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 4 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 4 ? '#ffb300' : '#aaa'}
                            />
                            <MIcon
                              name={driverrating >= 5 ? 'star' : 'star-border'}
                              size={20}
                              color={driverrating >= 5 ? '#ffb300' : '#aaa'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MCIcon name="dump-truck" size={80} color={Color.primary} />
                    <Text
                      style={{
                        ...styles.EmptyOrderText,
                        color: Color.primary,
                      }}>
                      {t('NoTripsHistory')}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const TripHistoryScreen = ({navigation, route}) => {
  const [tripDetails, setTripDetails] = useState(
    route?.params?.bookingData ?? [],
  );
  const {t} = useTranslation();
  const [statusCode, setStatusCode] = useState(route?.params?.statusCode ?? {});
  const layout = useWindowDimensions();
  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripHistorySwitch = useSelector(state => state.TripReducer.TripHistory);
  // const monthlyVisible = useSelector(state => state.TripReducer.MonthlyTrip);
  const weeklyVisible = useSelector(state => state.TripReducer.WeeklyTrip);
  const TripAssigned = useSelector(state => state.TripReducer.TripDetails);
  // console.log('====================================');
  // console.log('++++++', TripAssigned);
  // console.log('====================================');
  const TripCompleteList = useSelector(state => state.TripReducer.TripComplete);
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  const [loading, setLoading] = useState(false);
  // console.log('====================================');
  // console.log('++++++', TripStart);

  var {AssignedId, TripStarted} = TripStart;
  const renderScene = SceneMap({
    // CurrentTrip: () => (
    //   <CurrentTrip
    //     TripAssigned={TripAssigned}
    //     TripStart={TripStart}
    //     AssignedId={AssignedId}
    //     TripStarted={TripStarted}
    //     navigation={navigation}
    //     loading={loading}
    //     setLoading={setLoading}
    //     theme={theme}
    //     index={index}
    //   />
    // ),
    CurrentTrip: () => <CurrentTrip navigation={navigation} theme={theme} />,
    TripHistory: () => <TripHistory navigation={navigation} theme={theme} />,
  });
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (index == 1) {
      dispatch(setTripHistory(true));
    } else {
      dispatch(setTripHistory(false));
    }
  }, [index]);

  const [routes] = React.useState([
    {key: 'CurrentTrip', title: t('Currenttrip')},
    {key: 'TripHistory', title: t('Tripshistory')},
  ]);

  useEffect(() => {
    setLoading(true);
    const tabTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearInterval(tabTimeout);
  }, []);

  useEffect(() => {
    if (loading == true) {
      startImageRotateFunction();
    }
  }, [loading]);

  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      startImageRotateFunction();
    });
  };

  const bearing = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={{flex: 1, backgroundColor: theme ? Color.black : Color.white}}>
      {loading ? (
        <View
          style={{
            flex: 1,
            // padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            // height: Dimensions.get('screen').height / 1.5,
          }}>
          <Image source={Media.Loaderwheel} style={{width: 100, height: 100}} />
        </View>
      ) : (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: Color.primary, height: 60}}
            />
          )}
        />
      )}
      {statusCode?.statuscode == 2 && tripDetails?.tripstatuscode == 0 && (
        <TripAssignModal item={tripDetails} />
      )}
    </View>
  );
};

export default TripHistoryScreen;

const styles = StyleSheet.create({
  emptyOrderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 1.5,
  },
  TabviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TabViewName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  TabViewServices: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  TabViewDivider: {
    width: width / 15,
    backgroundColor: 'black',
    height: 1,
  },
  TabViewAboutus: {
    width: width / 2,
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderRadius: 50,
    padding: 5,
  },
  storeDetailDivider: {
    width: width / 15,
    backgroundColor: 'black',
    height: 1,
  },

  orderContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  imageEmptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageEmpty: {width: 150, height: 150},
  orderSingleView: {
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
    borderRadius: 10,
    padding: 10,
  },
  orderDataView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderBoxView: {marginHorizontal: 10, flex: 1},
  historyView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  historyStatus: {
    marginHorizontal: 5,
    color: Color.black,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  orderIdView: {flexDirection: 'row', alignItems: 'center'},
  orderHeaderText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 5,
    color: Color.black,
  },
  orderValueText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  orderDateText: {
    color: Color.black,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  totalText: {
    color: Color.red,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  EmptyOrderText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Color.primary,
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReceiveText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
