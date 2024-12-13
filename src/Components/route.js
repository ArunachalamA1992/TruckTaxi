import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import Color from '../Config/Color';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            return (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'home'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.white : Color.black,
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name === 'ServiceTab') {
            return (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <MCIcon name={'dots-grid'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.white : Color.black,
                  }}>
                  Services
                </Text>
              </View>
            );
          } else if (route.name === 'ActivityTab') {
            return (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'home'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.white : Color.black,
                  }}>
                  Activity
                </Text>
              </View>
            );
          } else if (route.name === 'ProfileTab') {
            return (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'person'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.white : Color.black,
                  }}>
                  Account
                </Text>
              </View>
            );
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.white,
        tabBarInactiveTintColor: Color.black,
        tabBarStyle: {backgroundColor: Color.primary},
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="ServiceTab"
        component={HomeStack}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="ActivityTab"
        component={HomeStack}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={HomeStack}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
