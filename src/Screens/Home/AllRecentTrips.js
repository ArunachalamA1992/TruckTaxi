import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {Button, Divider} from 'react-native-elements';
import {setMapTotalDistance, setPreviousDistance, setTripCoordinates, setTripRemoveDetails} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../../Config/Color';

const AllRecentTripScreen = ({navigation}) => {
  const TripAssigned = useSelector(state => state.TripReducer.TripDetails);
  const theme = useSelector(state => state.ThemeReducer.theme);
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  var {AssignedId, TripStarted, TripStoped, TripCompleted} = TripStart;
  const TripCompleteList = useSelector(state => state.TripReducer.TripComplete);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
        paddingVertical: 10,
      }}>
      <FlatList
        data={Object.values(TripAssigned)}
        keyExtractor={(item, index) => item + index}
        initialNumToRender={5}
        renderItem={({item}) => {
          return (TripStarted && item.assignId === AssignedId) ||
            (TripStoped && item.assignId === AssignedId) ? (
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
                <View style={{padding: 10}}>
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
                          {item.fromdistrict}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#6EC374',
                            flex: 1,
                            marginHorizontal: 5,
                          }}>
                          {item.assignId}
                        </Text>
                        <Text
                          style={{
                            // flex: 1,
                            fontSize: 14,
                            color: Color.green,
                            textAlign: 'center',
                            backgroundColor: '#DDFFDF',
                            // paddingHorizontal: 10,
                            padding: 5,
                            borderRadius: 50,
                          }}>
                          {TripStart ? 'On-Progress' : item.status}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          marginVertical: 10,
                          color: Color.cloudyGrey,
                        }}
                        numberOfLines={2}>
                        {item.pickup}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
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
                              }}>
                              Enter OTP
                            </Text>
                            <FIcon
                              name="check"
                              size={16}
                              color={Color.primary}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <FIcon
                            name="chevron-right"
                            size={16}
                            color={Color.primary}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 100,
                      width: 1,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#D4B6DF',
                      position: 'absolute',
                      left: 40,
                      top: 70,
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
                      <F5Icon
                        name="map-marked-alt"
                        size={20}
                        color={Color.white}
                      />
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
                        {item.todistrict}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginVertical: 10,
                          color: Color.cloudyGrey,
                        }}
                        numberOfLines={2}>
                        {item.drop}
                      </Text>
                      <Button
                        title={'Map'}
                        titleStyle={{
                          color: Color.primary,
                          fontSize: 12,
                        }}
                        buttonStyle={{
                          borderRadius: 50,
                          borderColor: Color.primary,
                          borderWidth: 1,
                          backgroundColor: Color.white,
                        }}
                        onPress={() => {
                          navigation.navigate('maps', {
                            item,
                          });
                        }}
                        containerStyle={{width: 100}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
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
                            {item.fromdistrict}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              color: '#6EC374',
                              flex: 1,
                              marginHorizontal: 5,
                            }}>
                            {item.assignId}
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
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            marginVertical: 10,
                            color: Color.cloudyGrey,
                          }}
                          numberOfLines={2}>
                          {item.pickup}
                        </Text>
                        <Button
                          title={'Enter OTP'}
                          titleStyle={{
                            color: Color.primary,
                            fontSize: 12,
                          }}
                          buttonStyle={{
                            borderRadius: 50,
                            borderColor: Color.primary,
                            borderWidth: 1,
                            backgroundColor: Color.white,
                          }}
                          onPress={() => {
                            navigation.navigate('maps', {
                              item,
                            });
                          }}
                          containerStyle={{width: 100}}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F5E2FC',
                      alignItems: 'center',
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                    onPress={() => {
                      dispatch(
                        setTripRemoveDetails({
                          item: {
                            assignId: item.assignId,
                            fromdistrict: item.fromdistrict,
                            pickup: item.pickup,
                            drop: item.drop,
                            todistrict: item.todistrict,
                            status: item.status,
                            date: item.date,
                            distance: item.distance,
                            time: item.time,
                            amount: item.amount,
                          },
                        }),
                      );
                      dispatch(
                        setTripCoordinates({
                          triplatitude: 0,
                          triplongitude: 0,
                        }),
                      );
                      dispatch(
                        setMapTotalDistance({
                          totalDistance: 0,
                          destinationReached: false,
                        }),
                      );
                      dispatch(
                        setPreviousDistance({
                          previous: 0,
                          current: 0,
                        }),
                      );
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 10,
                        color: Color.primary,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyOrderPage}>
              <MCIcon name="dump-truck" size={80} color={Color.cloudyGrey} />
              <Text style={styles.EmptyOrderText}>
                No Trips Has Been Assigned
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AllRecentTripScreen;

const styles = StyleSheet.create({
  emptyOrderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 1.5,
  },
  EmptyOrderText: {
    fontSize: 18,
    color: Color.cloudyGrey,
  },
});
