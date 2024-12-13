import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../Config/Color';
import moment from 'moment';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';

const NotificationScreen = ({navigation}) => {
  const userData = useSelector(state => state.UserReducer.userData);
  var {cabid} = userData;

  const theme = useSelector(state => state.ThemeReducer.theme);
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    getNotificationData();
    readNotificationData();
  }, [viewableNotificationId, getData]);

  useEffect(() => {
    setLoading(true);
    const tabTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearInterval(tabTimeout);
  }, []);

  useEffect(() => {
    startImageRotateFunction();
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

  const getNotificationData = async () => {
    try {
      var data = 'cabid=' + cabid;
      const notifyData = await fetchData.notification(data);
      if (notifyData.status == 200) {
        // console.log('response ============= : ', notifyData);
        setGetData(notifyData.data);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };
  const readNotificationData = async (id) => {
    try {
      var data = {
        id: id,
      };
      const notifyData = await fetchData.readnotification(data);
      if (notifyData.status == 200) {
        console.log('notification--------------', notifyData);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  const [viewableNotificationId, setViewableNotificationId] = useState(0);

  // const onViewableItemsChanged = useRef(async({viewableItems}) => {
  //   if (viewableItems?.length > 0) {
  //     const firstViewableItem = viewableItems[0];
  //     setViewableNotificationId(firstViewableItem?.item?._id);
  //     var data = {
  //       id: viewableNotificationId,
  //     };
  //     const notifyData = await fetchData.readnotification(data);
  //     if (notifyData.status == 200) {
  //       console.log('notification--------------', notifyData);
  //     }
  //   }
  // }).current;
  function renderNotificationItem(item, index) {
    try {
      return (
        <TouchableOpacity
          onPress={() => {
            readNotificationData(item?._id);
          }}
          style={{
            width: '100%',
            backgroundColor: item?.read == true ? Color.white : Color.softPeach,
            elevation: 2,
            margin: 5,
            paddingVertical: 15,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 16,
              color: 'black',
              fontWeight: '700',
              lineHeight: 25,
            }}
            numberOfLines={5}>
            {item.message}{' '}
          </Text>
          <Text
            style={{
              width: '100%',
              paddingHorizontal: 5,
              textAlign: 'right',
              fontStyle: 'italic',
              fontSize: 14,
              color: '#666',
              marginVertical: 5,
            }}>
            {moment(item.senttime).format('LLL')}
          </Text>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log('catch in renderNotification_Item : ', error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: theme ? Color.black : '#f3f3f3'}}>
      {loading ? (
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('screen').height / 1.2,
          }}>
          <Image source={Media.Loaderwheel} style={{width: 100, height: 100}} />
        </View>
      ) : (
        <FlatList
          data={getData}
          // keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => renderNotificationItem(item, index)}
          keyExtractor={item => item._id}
          // onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfig={{
          //   itemVisiblePercentThreshold: 5,
          // }}
          style={{flexGrow: 1}}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyOrderPage}>
                <Text style={styles.EmptyOrderText}>No Notifications</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  emptyOrderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 1.5,
  },
  EmptyOrderText: {
    fontSize: 18,
    marginVertical: 10,
    color: Color.primary,
    fontWeight: 'bold',
  },
});
