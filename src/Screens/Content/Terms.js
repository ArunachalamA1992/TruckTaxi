import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconName, ItemFont} from '../../Global/GlobalStyles';
import Color from '../../Config/Color';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTranslation} from 'react-i18next';
import '../../Translation';
import i18n from '../../Translation';

let scr_width = Dimensions.get('screen').width;

const TermsConditionScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const theme = useSelector(state => state.ThemeReducer.theme);
  return (
    <View
      style={{
        ...styles.termsContainer,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      <View
        style={{
          width: scr_width,
          backgroundColor: Color.primary,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{flex: 0, paddingHorizontal: 20}}>
          <Ionicons name={'arrow-back-outline'} size={30} color={Color.white} />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: Color.white, fontWeight: 'bold'}}>
            Terms and Conditions
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 10}}>
          <View style={styles.headerView}>
            {/* <Text style={styles.headerText}>Terms And Conditions</Text> */}
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            {/* <Text style={styles.headerText}>Terms And Conditions</Text> */}
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_one_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_two_main')}</Text>
            {/* <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.black,
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />{t('terms_two_main')}</Text> */}
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_two')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_three')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_four')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_five')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_six')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_seven')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_two_eight')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_three_main')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_three_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_three_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_four')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_four_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_four_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_five_main')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_five_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_six_main')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_six_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_six_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.lightGreen : Color.black,
              }}>
              {t('terms_seven_main')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {t('terms_seven_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.lightGreen : Color.black,
              }}>
              {t('terms_eight_main')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eight_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eight_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_nine')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_nine_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_nine_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_ten_main')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_ten_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_ten_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.lightGreen : Color.black,
              }}>
              {t('terms_eleven_main')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eleven_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_twleve')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_twleve_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_twleve_two')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_twleve_three')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_therteen_main')}</Text>
            <View style={styles.headerView}>
              <Text
                style={{
                  ...styles.SubheaderText,
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                {' '}
                {t('terms_therteen_sub')}{' '}
              </Text>
              <Text
                style={{
                  ...styles.ContentText,
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                {' '}
                {t('terms_therteen_one')}
              </Text>
              <Text
                style={{
                  ...styles.ContentText,
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                {' '}
                {t('terms_therteen_two')}
              </Text>

              <Text
                style={{
                  ...styles.SubheaderText,
                  color: theme ? Color.white : Color.black,
                }}>
                {t('terms_therteen_three')}
              </Text>
              <Text
                style={{
                  ...styles.ContentText,
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                {' '}
                {t('terms_therteen_four')}
              </Text>
              <Text
                style={{
                  ...styles.ContentText,
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                {' '}
                {t('terms_therteen_five')}
              </Text>
            </View>
            {/* <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.white : Color.black,
              }}>
              {t('terms_therteen_three')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>  {t('terms_therteen_four')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>  {t('terms_therteen_five')}</Text>
          </View> */}
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_fourteen')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_fourteen_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_fourteen_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_fifteen')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_fifteen_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_fifteen_two')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{t('terms_sixteen')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_sixteen_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_sixteen_two')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />{' '}
              {t('terms_sixteen_three')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.lightGreen : Color.black,
              }}>
              {t('terms_seventeen')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_seventeen_one')}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.lightGreen : Color.black,
              }}>
              {t('terms_eightteen')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eightteen_one')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eightteen_two')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eightteen_three')}
            </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              {' '}
              {t('terms_eightteen_four')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditionScreen;

const styles = StyleSheet.create({
  termsContainer: {flex: 1, height: Dimensions.get('screen').height - 200},
  headerView: {marginVertical: 5},
  headerText: {
    color: Color.primary,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  SubheaderText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginVertical: 10,
  },
  ContentText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 5,
    marginHorizontal: 5,
    textAlign: 'justify',
    lineHeight: 25,
  },
});
