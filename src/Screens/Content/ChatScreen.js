// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ChatScreen = () => {
//   return (
//     <View>
//       <Text>ChatScreen</Text>
//     </View>
//   )
// }

// export default ChatScreen

// const styles = StyleSheet.create({})
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import socketIO from 'socket.io-client';
const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: <Text>Chat Support</Text>,
      // headerRight: () => (
      //     <View style={{ flexDirection: 'row' }}>

      //         <FontAwesome style={{ padding: 10 }} onPress={() => {
      //             home();
      //         }} name="home" size={25} backgroundColor="#ffffff"
      //             color="#85388d" />

      //     </View>
      // ),
    });
  });

  useEffect(() => {
    const socket = socketIO('https://trucktaxi.co.in', {
      path: '/socket/socket.io',
      transports: ['websocket'],
      jsonp: false,
    });
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    // const [messageToSend] = messages;
    // console.log("message",messageToSend)
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  });

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  // const home = () => {
  //     navigation.navigate('Home');
  // };

  return (
    <View style={{flex: 1, padding: 10}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        textInputStyle={styles.text}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
});
