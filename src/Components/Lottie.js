import Lottie from 'lottie-react-native';
import {Media} from '../Global/Media';

export const LottieLoader = () => {
  return (
    <Lottie
      source={Media.Loader}
      style={{position: 'absolute', width: 150, height: 150, bottom: 0}}
      autoPlay
      loop
    />
  );
};

export const LottieCelebration= () => {
  return (
    <Lottie
      source={Media.Celebration}
      style={{width: 150, height: 150}}
      autoPlay
      loop
    />
  );
};