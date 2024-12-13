import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MICon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../Config/Color';
import {Button} from 'react-native-elements';
import {Modal} from 'react-native';
import {Image} from 'react-native';
import {Media} from '../../Global/Media';
import {useSelector} from 'react-redux';
import {LottieCelebration, LottieLoader} from '../../Components/Lottie';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FeedbackScreen = () => {
  const [starRating, setStarRating] = useState(null);
  const theme = useSelector(state => state.ThemeReducer.theme);
  const [feedback, setFeedback] = useState('');
  const [height, setHeight] = useState(0);
  const [feedModal, setFeedModal] = useState(false);
  const [timing, setTiming] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [selectedimage, setSelectedimage] = useState([]);

  useEffect(() => {
    setTiming(true);
    const time = setTimeout(() => {
      setTiming(false);
    }, 3000);
    return () => clearInterval(time);
  }, []);

  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      name: 'on Time Delivery',
    },
    {
      id: 2,
      name: 'Ride Safety',
    },
    {
      id: 3,
      name: 'Good',
    },
  ]);
  const getimagepicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 9,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          // alert(response.customButton);
        } else {
          let source = response.assets;
          setSelectedimage(source);
        }
      },
    );
  };
  const removeimage = deleteitem => {
    Alert.alert(
      'Alert',
      'Are you want to delete this image?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setSelectedimage(selectedimage.filter(item => item !== deleteitem));
          },
        },
      ],
      {cancelable: false},
    );
  };
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.uri}} style={styles.image} />
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}>
        <MaterialCommunityIcons
          name="delete"
          size={20}
          color={Color.primary}
          onPress={() => removeimage(item)}
        />
      </View>
    </View>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme ? Color.black : Color.white,
        padding: 10,
      }}>
      {timing ? (
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('screen').height / 2,
          }}>
          <LottieLoader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...styles.container,
              backgroundColor: theme ? Color.black : Color.white,
            }}>
            <Text
              style={{
                ...styles.heading,
                color: theme ? Color.white : Color.cloudyGrey,
              }}>
              How did we do?
            </Text>
            <View style={styles.stars}>
              <TouchableOpacity onPress={() => setStarRating(1)}>
                <MICon
                  name={starRating >= 1 ? 'star' : 'star-border'}
                  size={50}
                  style={
                    starRating >= 1
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(2)}>
                <MICon
                  name={starRating >= 2 ? 'star' : 'star-border'}
                  size={50}
                  style={
                    starRating >= 2
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(3)}>
                <MICon
                  name={starRating >= 3 ? 'star' : 'star-border'}
                  size={50}
                  style={
                    starRating >= 3
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(4)}>
                <MICon
                  name={starRating >= 4 ? 'star' : 'star-border'}
                  size={50}
                  style={
                    starRating >= 4
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStarRating(5)}>
                <MICon
                  name={starRating >= 5 ? 'star' : 'star-border'}
                  size={50}
                  style={
                    starRating >= 5
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {feedbackData.map(item => {
                return (
                  <Button
                    title={item.name}
                    titleStyle={{
                      color:
                        item.id === itemSelected.id
                          ? Color.white
                          : Color.primary,
                      marginHorizontal: 10,
                    }}
                    buttonStyle={{
                      borderColor: Color.primary,
                      borderWidth: 1,
                      backgroundColor:
                        item.id === itemSelected.id
                          ? Color.primary
                          : Color.white,
                      borderRadius: 50,
                      marginVertical: 5,
                      marginHorizontal: 5,
                    }}
                    iconRight
                    containerStyle={{
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      setItemSelected(item);
                    }}
                  />
                );
              })}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme ? Color.white : Color.cloudyGrey,
                  textTransform: 'capitalize',
                  marginVertical: 20,
                }}>
                share your expreicence with us ?
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: Color.cloudyGrey,
                  padding: 15,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => getimagepicker()}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: Color.primary,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}>
                  select image
                </Text>
              </TouchableOpacity>
              {selectedimage?.length === 0 ? null : (
                <FlatList
                  data={selectedimage}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  contentContainerStyle={styles.container1}
                />
              )}
            </View>
            <View style={{marginVertical: 40}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme ? Color.white : Color.cloudyGrey,
                }}>
                Care to share about it?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginVertical: 20,
                }}>
                <TextInput
                  placeholder="Type Something..."
                  value={feedback}
                  placeholderTextColor={Color.cloudyGrey}
                  onChangeText={msg => setFeedback(msg)}
                  onContentSizeChange={event => {
                    setHeight(event.nativeEvent.contentSize.height);
                  }}
                  textAlignVertical="top"
                  textContentType="name"
                  style={{
                    height: Math.max(150, height),
                    color: Color.black,
                    backgroundColor: Color.lightgrey,
                    width: '100%',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  multiline={true}
                />
              </View>
            </View>
            <Button
              title={'Publish Feedback'}
              buttonStyle={{
                height: 50,
                backgroundColor: Color.primary,
                borderRadius: 10,
              }}
              onPress={() => {
                setFeedModal(true);
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: Color.cloudyGrey,
                marginVertical: 20,
                textAlign: 'center',
              }}>
              Your review will be posted on google play store
            </Text>
          </View>
        </ScrollView>
      )}
      <Modal visible={feedModal} transparent={true} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: Color.transparantBlack,
            justifyContent: 'center',
            padding: 10,
          }}
          onPress={() => {
            setFeedModal(false);
          }}>
          <View
            style={{
              backgroundColor: Color.white,
              borderRadius: 20,
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setFeedModal(false);
              }}
              style={{
                backgroundColor: '#F5E2FC',
                position: 'absolute',
                right: 0,
                width: 50,
                height: 50,
                borderBottomLeftRadius: 50,
                borderTopRightRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MICon name="close" size={20} color={Color.primary} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <View style={{}}>
                <Image
                  source={Media.Feedback}
                  style={{height: 200, resizeMode: 'contain'}}
                />
              </View>
              <View style={{marginVertical: 10, alignItems: 'center'}}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                  }}>
                  {timing && <LottieCelebration />}
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: Color.black,
                    marginTop: 30,
                    textAlign: 'center',
                  }}>
                  Thank You!
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    marginVertical: 10,
                    textAlign: 'center',
                  }}>
                  By making your voice heard you help us improve Tribevibe.
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  container1: {
    padding: 10, // Adjust padding around the grid
  },
  imageContainer: {
    flex: 1, // Ensure items take up equal space
    margin: 5, // Space between items
  },
  image: {
    width: '100%', // Make the image fill its container
    height: 100,
    borderRadius: 10, // Optional: Add rounded corners
  },
});
