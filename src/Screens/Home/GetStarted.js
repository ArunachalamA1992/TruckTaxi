import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../Config/Color';
import {Media} from '../../Global/Media';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');
const WIDTH_IMAGE = width - 80;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 390) / 375;

const GetStartScreen = ({navigation}) => {
  const theme = useSelector(state => state.ThemeReducer.theme);
  const carouselRef = useRef();
  const [activeItem, setActiveItem] = useState(0);
  var {replace} = navigation;
  const moveNext = () => {
    carouselRef.current.snapToNext();
  };
  const movePrev = () => {
    carouselRef.current.snapToPrev();
  };

  const handleGettingStarted = () => {
    // var data = {
    //   user_id: '0',
    //   get_start: '1',
    // };
    // AsyncStorage.setItem('data', JSON.stringify(data));
    replace('Auth', {
      //   user_id: '0',
      //   get_start: '1',
    });
  };
  const data = [
    {
      image: Media.getstart1,
      title: 'Welcome',
      subTitle:
        '“Truck taxi” the concept itself tells that the project driven by call taxi method, that means easy availability at phone calls and prompt tariff package to the consumers as well as regular works and more earnings to the mini truck owners/drivers!',
    },
    {
      image: Media.getstart2,
      title: 'Choose Your Vehicle',
      subTitle:
        '“Truck Taxi” the name itself defines the cargo services which lagging in domestic market. That case there is no proper services for customers to lifting the cargos. Here we will sort out the issues in service problem hence “Truck taxi” has to be operated as call taxi procedure!',
    },
    {
      image: Media.getstart3,
      title: 'Enable Location',
      subTitle:
        'You can let apps use your phone’s location to take actions for you or give you information. For example, apps can use your phones location to display commute traffic.',
    },
  ];
  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    } catch (err) {
      console.log('location  ', err);
    }
  };
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        ...styles.container,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      <Carousel
        ref={carouselRef}
        data={data}
        onSnapToItem={index => setActiveItem(index)}
        renderItem={({item, index}) => {
          var {image, title, subTitle} = item;
          return (
            <View key={index} style={styles.viewItem}>
              <Image source={image} style={styles.image} />
              <View style={styles.viewInfo}>
                <Text
                  style={{
                    ...styles.text,
                    color: theme ? Color.white : Color.black,
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    ...styles.subtext,
                    color: theme ? Color.white : Color.black,
                  }}>
                  {subTitle}
                </Text>
              </View>
            </View>
          );
        }}
        sliderWidth={width}
        itemWidth={width}
      />
      {/* {activeItem > 1 && (
        <Button
          title={activeItem > 1 && 'Allow Access'}
          titleStyle={{
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold',
            marginHorizontal: 10,
          }}
          buttonStyle={{
            backgroundColor: Color.primary,
            borderRadius: 50,
          }}
          icon={() => <Icon name="arrow-redo" size={20} color={Color.white} />}
          iconRight={true}
          containerStyle={{alignItems: 'center'}}
          onPress={() => checkPermission()}
        />
      )} */}
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeItem}
        containerStyle={{backgroundColor: 'transparent', marginVertical: 40}}
        dotStyle={{
          width: 25,
          height: 10,
          borderRadius: 5,
          backgroundColor: Color.primary,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Color.black,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        {activeItem > 0 ? (
          <Button
            title={activeItem > 0 && 'Prev'}
            titleStyle={{
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              marginHorizontal: 10,
              color: Color.primary,
            }}
            buttonStyle={{
              backgroundColor: Color.white,
              borderColor: Color.primary,
              // color: Color.primary,
              borderWidth: 1,
              borderRadius: 50,
              width: 120,
            }}
            // icon={() => (
            //   <Icon name="arrow-undo" size={20} color={Color.primary} />
            // )}
            containerStyle={{
              marginHorizontal: 20,
              alignItems: 'flex-start',
            }}
            onPress={() => {
              if (activeItem > 0) {
                movePrev();
              }
            }}
          />
        ) : (
          <View />
        )}
        <View style={styles.viewButton}>
          <Button
            title={activeItem < 2 ? 'Next' : 'Get Started'}
            titleStyle={{
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              marginHorizontal: 10,
            }}
            buttonStyle={{
              width: 120,
              backgroundColor: Color.primary,
              borderRadius: 50,
            }}
            // icon={() => (
            //   <Icon name="arrow-redo" size={20} color={Color.white} />
            // )}
            iconRight={true}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              if (activeItem < 2) {
                moveNext();
              } else {
                handleGettingStarted();
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewItem: {
    marginTop: 70,
    padding: 10,
  },
  image: {
    width: '100%',
    height: HEIGHT_IMAGE,
    resizeMode: 'contain',
  },
  viewInfo: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 20,
  },
  viewPagination: {
    justifyContent: 'center',
  },
  viewButton: {
    // marginBottom: 20,
  },
  buttonTitle: {
    marginVertical: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2B2A28',
  },
  buttonContainer: {
    marginHorizontal: 20,
    // width:"40%",
    alignItems: 'flex-end',
  },
});
