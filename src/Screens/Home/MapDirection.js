import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  getCurrentLocation,
  locationPermission,
} from '../../Components/helperfn';
import Icon from 'react-native-vector-icons/Ionicons';
import {Media} from '../../Global/Media';
import Color from '../../Config/Color';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import {
  setMapTotalDistance,
  setPreviousDistance,
  setTripMapStart,
  setTripTimer,
} from '../../Redux';
import {LottieLoader} from '../../Components/Lottie';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapDirectionScreen = ({navigation, route}) => {
  const [mapItem] = useState(route.params.mapItem);
  const [mapcurlatitude] = useState(route.params.latitude);
  const [mapcurlongitude] = useState(route.params.longitude);
  const mapRef = useRef();
  const markerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  let distravelled = 0;
  let TotalDistanceTravelled = 0;

  const [state, setState] = useState({
    curLoc: {
      latitude: mapcurlatitude,
      longitude: mapcurlongitude,
    },
    destinationCords: {
      latitude: mapcurlatitude,
      longitude: mapcurlongitude,
    },
    previousCoords: {
      latitude: mapcurlatitude,
      longitude: mapcurlongitude,
    },
    currentCoords: {
      latitude: mapcurlatitude,
      longitude: mapcurlongitude,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: mapcurlatitude,
      longitude: mapcurlongitude,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const GOOGLE_MAP_KEY = 'AIzaSyBaclFXXGbKWdfL9A-MN6D0yj5OzU50q6U';
  const TimerRange = useSelector(state => state.TripReducer.TripTimer);
  var {tripSeconds, tripMinutes, tripHours} = TimerRange;
  const TripStart = useSelector(state => state.TripReducer.TripStart);
  const Mapdistance = useSelector(state => state.TripReducer.distance);
  var {totalDistance, destinationReached} = Mapdistance;
  const PreviousDistance = useSelector(
    state => state.TripReducer.previousDistance,
  );
  var {previous, current} = PreviousDistance;
  const dispatch = useDispatch();

  var {
    AssignedId,
    TripStarted,
    initialSpeedometer,
    finalSpeedometer,
    startMeterImage,
    endMeterImage,
    otpcode,
    TripStoped,
    startTripdate,
  } = TripStart;
  const {
    curLoc,
    time,
    distance,
    previousCoords,
    currentCoords,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const EndTripDate = new Date();

  const EndHour = EndTripDate.getHours();
  const EndMinute = EndTripDate.getMinutes();
  const Endseconds = EndTripDate.getSeconds();

  const [triphours, setTriphours] = useState(0);
  const [tripminutes, setTripminutesdate] = useState(0);
  const [endDate, setEnddate] = useState('');

  const [totalMin, setTotalMin] = useState(0);

  const convertMinsToHrsMins = minutes => {
    var hours = Math.trunc(minutes / 60);
    var tminutes = minutes % 60;
    dispatch(
      setTripTimer({
        tripSeconds: tripSeconds,
        tripMinutes: tminutes,
        tripHours: hours,
      }),
    );
  };

  useEffect(() => {
    if (TripStarted) {
      const interval = setInterval(() => {
        setEnddate(new Date());
        setTotalMin(endDate - startTripdate);
        convertMinsToHrsMins(totalMin / (1000 * 60));

        if (startTripdate == 0) {
          dispatch(
            setTripMapStart({
              TripStoped: false,
              TripStarted: true,
              AssignedId: AssignedId,
              initialSpeedometer: initialSpeedometer,
              otpcode: otpcode,
              finalSpeedometer: finalSpeedometer,
              startImage: startMeterImage,
              endImage: endMeterImage,
              TripCompleted: false,
              startTripdate: new Date(),
            }),
          );
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      dispatch(
        setTripTimer({
          tripSeconds: tripSeconds,
          tripMinutes: tripMinutes,
          tripHours: tripHours,
        }),
      );
    }
  }, [tripSeconds, TripStarted, endDate, startTripdate]);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      setlatitude(latitude);
      setlongitude(longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        currentCoords: {latitude, longitude},
        previousCoords: currentCoords,
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', {getCordinates: fetchValue});
  };
  const fetchValue = data => {
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0,
    });
  };

  const fetchTime = (d, t) => {
    const travelled = distravelled + d;
    const TotalTravelled = TotalDistanceTravelled + travelled;
    dispatch(
      setMapTotalDistance({
        totalDistance: TotalTravelled,
        destinationReached: destinationReached,
      }),
    );
  };

  useEffect(() => {
    setLoading(true);
    const mapTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearInterval(mapTimeout);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...previousCoords,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}>
          <Marker.Animated ref={markerRef} coordinate={currentCoords}>
            <Icon name="radio-button-on" size={20} color={Color.primary} />
          </Marker.Animated>
          <Marker coordinate={previousCoords} />
          <MapViewDirections
            origin={previousCoords}
            destination={currentCoords}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={6}
            strokeColor={Color.primary}
            optimizeWaypoints={true}
            mode="DRIVING"
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              if (totalDistance === 0) {
                dispatch(
                  setPreviousDistance({
                    previous: result.distance,
                    current: result.distance,
                  }),
                );
              }
              fetchTime(result.distance, result.duration);
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {},
              });
            }}
            onError={errorMessage => {}}
          />
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            backgroundColor: Color.white,
            padding: 10,
            borderRadius: 100,
            top: 10,
            shadowColor: Color.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 8,
          }}
          onPress={onCenter}>
          <MIcon name="my-location" size={30} color={Color.primary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: 150,
          backgroundColor: Color.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'flex-start', flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Media.loaction_mark}
                style={{height: 25, width: 25}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                From
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                textAlign: 'justify',
                marginVertical: 10,
              }}
              numberOfLines={3}>
              {mapItem.pickup}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="radio-button-off" size={25} color={'#87CEEB'} />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                To
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                textAlign: 'justify',
                marginVertical: 10,
              }}
              numberOfLines={3}>
              {mapItem.drop}
            </Text>
          </View>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieLoader />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginVertical: 5,
          }}>
          <Text style={{fontSize: 14, color: Color.black, fontWeight: 'bold'}}>
            Time :
            {tripHours < 10 ? `0${tripHours.toFixed(0)}` : tripHours.toFixed(0)}
            :
            {tripMinutes < 10
              ? `0${tripMinutes.toFixed(0)}`
              : tripMinutes.toFixed(0)}
          </Text>
          <Text style={{fontSize: 14, color: Color.black, fontWeight: 'bold'}}>
            Distance : {totalDistance.toFixed(2)} Km
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default MapDirectionScreen;
