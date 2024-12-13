import React from 'react';
import {View, Image} from 'react-native';
import {Media} from '../Global/Media';

const LogoTitle = () => {
  return (
    <Image
      source={Media.Logo}
      style={{width: 150, height: 50, resizeMode: 'contain'}}
    />
  );
};

export default LogoTitle;
