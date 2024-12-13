import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Media } from '../../Global/Media';
import { useSelector } from 'react-redux';
import { Button, SocialIcon } from 'react-native-elements';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import { useTranslation } from 'react-i18next';
import '../../Translation';
import i18n from '../../Translation';


const ContactUsScreen = () => {
  const { t } = useTranslation();
  const theme = useSelector(state => state.ThemeReducer.theme);
  const [message, setMessage] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={Media.ContactUs}
              style={{ height: 150, resizeMode: 'contain' }}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme ? Color.white : Color.black,
                  marginVertical: 5,
                }}>{t('needhelp')}</Text>

            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
              onPress={() => {
                RNImmediatePhoneCall.immediatePhoneCall('0422 3575757');
              }}>
              <Image
                source={Media.customersupport}
                style={{ height: 40, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  color: Color.blue,
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginVertical: 5,
                  textDecorationLine: 'underline',
                  marginHorizontal: 10,
                }}>0422 3575757</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}
              onPress={() => {
                Linking.openURL('mailto:' + 'info@truck_taxi.in');
              }}>
              <Icon name="mail" size={32} color={Color.primary} />
              <Text
                style={{
                  color: Color.blue,
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '600',
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}>info@trucktaxi.in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}
              onPress={() => {
                Linking.openURL('https://goo.gl/maps/MeHZv8FuR3ZW7B1z7');
              }}>
              <Icon name="location" size={32} color={Color.primary} />
              <Text
                style={{
                  color: Color.blue,
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '600',
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
                numberOfLines={2}>Truck_Taxi services, #122, Sarojini street, Ram nagar, Coimbatore 641009</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme ? Color.white : Color.black,
                marginVertical: 10,
              }}>{t('issues')}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                backgroundColor: '#EEEEEE',
                marginVertical: 10,
              }}>
              <TextInput
                placeholder={t('type')}
                value={message}
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={msg => setMessage(msg)}
                textAlignVertical="top"
                textContentType="name"
                style={{
                  height: 150,
                  color: theme ? Color.white : Color.black,
                  padding: 10,
                }}
                multiline={true}
              />
            </View>
            <Button
              title={t('submit')}
              buttonStyle={{
                height: 50,
                backgroundColor: Color.primary,
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;
