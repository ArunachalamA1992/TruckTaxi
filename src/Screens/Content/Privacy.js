import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Inter } from '../../Global/FontFamily';
import { IconName, ItemFont } from '../../Global/GlobalStyles';
import Color from '../../Config/Color';
import { useSelector } from 'react-redux';


import { useTranslation } from 'react-i18next';
import '../../Translation';
import i18n from '../../Translation';

const PrivacyScreen = () => {
  const { t } = useTranslation();
  const theme = useSelector(state => state.ThemeReducer.theme);

  return (
    <View
      style={{
        ...styles.privacyContainer,
        backgroundColor: theme ? Color.black : Color.white,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_one')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_two')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_three')}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('header_four')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_four_one')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_four_two')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_four_three')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_four_four')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_four_five')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} /> {t('header_four_six')}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('header_five')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_five_one')}</Text>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.white : Color.black,lineHeight:25
              }}>{t('header_five_main')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>{t('header_five_sub')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>{t('header_five_sub_one')}</Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.white : Color.black,lineHeight:25
              }}>{t('header_five_two')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>{t('header_five_two_one')}</Text>
          </View>
          <View style={styles.headerView}>
            <Text
              style={{
                ...styles.SubheaderText,
                color: theme ? Color.white : Color.black,
              }}>{t('header_six')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>{t('header_six_sub')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_six_one')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_six_two')} </Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_six_three')}</Text>
            <Text
              style={{
                ...styles.ContentText,
                color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
              }}>
              <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_six_four')}</Text>
          </View>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('header_seven')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_seven_one')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_seven_two')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.name} size={18} color={Color.primary} />  {t('header_seven_three')}</Text>
          <Text
            style={{
              ...styles.SubContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>
            <FIcon name={IconName.check} size={18} color={Color.primary} />  {t('header_seven_four')}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('header_eight')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_eight_one')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_eight_two')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_eight_three')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:25
            }}>{t('header_eight_four')}</Text>
        </View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('header_nine')}</Text>
          <Text
            style={{
              ...styles.ContentText,
              color: theme ? Color.white : Color.cloudyGrey,lineHeight:22
            }}>{t('header_nine_one')}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  privacyContainer: { flex: 1, padding: 10 },
  headerView: { marginVertical: 5 },
  headerText: {
    color: Color.primary,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
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
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 5,
    marginHorizontal: 5,
    textAlign: 'justify',
    lineHeight: 20,
  },
  SubContentText: {
    fontSize: 14,
    color:Color.cloudyGrey,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
});
