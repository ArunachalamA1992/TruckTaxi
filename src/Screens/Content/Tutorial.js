import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Color from '../../Config/Color';
import { useSelector } from 'react-redux';
import { Media } from '../../Global/Media';
import Video from 'react-native-video';

let scr_width = Dimensions.get('screen').width;
let scr_height = Dimensions.get('screen').height;

import { useTranslation } from 'react-i18next';
import '../../Translation';

const TutorialScreen = () => {

  const { t } = useTranslation();

  const theme = useSelector(state => state.ThemeReducer.theme);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const tutorialLoad = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearInterval(tutorialLoad);
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
  return (
    <View style={{ width: scr_width, height: scr_height, backgroundColor: theme ? Color.black : Color.white }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={Media.Loaderwheel} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View
          style={{
            width: scr_width, height: scr_height,
            backgroundColor: theme ? Color.black : Color.white,
            padding: 20,
          }}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <Text style={{ fontSize: 18, color: 'black', fontWeight: '800',paddingVertical:20 }}> {t('appdemo')}</Text>
            <Video
              repeat
              resizeMode={'contain'}
              onFullScreen={true}
              source={Media.TutorialVideo}
              style={styles.backgroundVideo}
              volume={10}
            />

            <View
              style={{
                marginVertical: 40,
              }}>
              <Image
                source={Media.Tutorial6}
                style={{ height: 500, width: '100%', resizeMode: 'contain' }}
              />
            </View>
          </Animated.ScrollView>
        </View>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    width: scr_width,
    height: 500,
    alignItems: "center", justifyContent: 'center',
  },
});

export default TutorialScreen;
