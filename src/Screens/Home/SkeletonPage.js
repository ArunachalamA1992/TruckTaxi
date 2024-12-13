import React from 'react';
import {View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Color from '../../Config/Color';
import { useSelector } from 'react-redux';

const SkeletonPage = () => {
  const theme = useSelector(state => state.ThemeReducer.theme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.transparantBlack : Color.white,
        padding: 10,
      }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item flex={1} justifyContent={'space-between'}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={150}
              marginTop={15}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" marginTop={30}>
          <SkeletonPlaceholder.Item
            flex={1}
            justifyContent={'space-between'}
            marginLeft={12}>
            <SkeletonPlaceholder.Item
              width="90%"
              height={80}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="60%"
              height={10}
              marginTop={10}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flex={1}
            justifyContent={'space-between'}
            marginLeft={12}>
            <SkeletonPlaceholder.Item
              width="90%"
              height={80}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="60%"
              height={10}
              marginTop={10}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="60%"
            height={10}
            borderRadius={4}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width="100%"
            height={160}
            borderRadius={4}
            marginTop={10}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item
            width="60%"
            height={10}
            borderRadius={4}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width="100%"
            height={160}
            borderRadius={4}
            marginTop={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonPage;
