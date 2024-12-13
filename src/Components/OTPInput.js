import React, {useState, useEffect, useRef} from 'react';
import {InteractionManager, StyleSheet} from 'react-native';
import {Pressable, TextInput, View, Keyboard, Text} from 'react-native';
import Color from '../Config/Color';
import {useSelector} from 'react-redux';

const OTPInput = ({inputRef, code, setCode, maximumLength, setIsPinReady}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const theme = useSelector(state => state.ThemeReducer.theme);

  const value = code.split(' ');
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const [code1, setCode1] = useState(code[0] ?? '');
  const [code2, setCode2] = useState(code[1] ?? '');
  const [code3, setCode3] = useState(code[2] ?? '');
  const [code4, setCode4] = useState(code[3] ?? '');
  const [code5, setCode5] = useState(code[4] ?? '');
  const [code6, setCode6] = useState(code[5] ?? '');
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const handleOnPress = () => {
    inputRef1.current.focus();
    setIsInputBoxFocused(true);
  };

  useEffect(() => {
    setCode1(code[0] ? code[0] : '');
    setCode2(code[1] ? code[1] : '');
    setCode3(code[2] ? code[2] : '');
    setCode4(code[3] ? code[3] : '');
    setCode5(code[4] ? code[4] : '');
    setCode6(code[5] ? code[5] : '');
  }, [code]);

  useEffect(() => {
    setCode(code1 + code2 + code3 + code4 + code5 + code6);
  }, [code1, code2, code3, code4, code5, code6]);

  useEffect(() => {
    // Must run after animations for keyboard to automatically open
    InteractionManager.runAfterInteractions(() => {
      if (inputRef6?.current) {
        inputRef6.current.focus();
      }
    });
  }, [inputRef6]);

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  useEffect(() => {
    if (code.length === 6) {
      Keyboard.dismiss();
    }
  }, [code]);

  useEffect(() => {
    const otpTimeout = setTimeout(() => inputRef6.current.focus(), 0);
    return () => {
      clearInterval(otpTimeout);
    };
  }, []);

  useEffect(() => {
    const kListener = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });

    return () => {
      kListener.remove();
    };
  }, []);

  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    return (
      <View
        key={index}
        style={{
          ...styles.BoxInputView,
          borderColor: digit
            ? Color.green
            : isInputBoxFocused
            ? Color.primary
            : Color.black,
        }}>
        <Text style={styles.BoxInputValue}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.OtpContainer}>
      {/* <Pressable
        style={styles.otpPressable}
        onPress={() => {
          handleOnPress();
        }}>
        {boxArray.map(boxDigit)}
      </Pressable> */}
      <TextInput
        ref={inputRef1}
        value={code1}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode1(text);
          if (text.length >= 1) {
            inputRef2.current.focus();
          } else if (text.length < 1) {
            inputRef1.current.focus();
          }
        }}
      />
      <TextInput
        ref={inputRef2}
        value={code2}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode2(text);
          if (text.length >= 1) {
            inputRef3.current.focus();
          } else if (text.length < 1) {
            inputRef1.current.focus();
          }
        }}
      />
      <TextInput
        ref={inputRef3}
        value={code3}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode3(text);
          if (text.length >= 1) {
            inputRef4.current.focus();
          } else if (text.length < 1) {
            inputRef2.current.focus();
          }
        }}
      />
      <TextInput
        ref={inputRef4}
        value={code4}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode4(text);
          if (text.length >= 1) {
            inputRef5.current.focus();
          } else if (text.length < 1) {
            inputRef3.current.focus();
          }
        }}
      />
      <TextInput
        ref={inputRef5}
        value={code5}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode5(text);
          if (text.length >= 1) {
            inputRef6.current.focus();
          } else if (text.length < 1) {
            inputRef4.current.focus();
          }
        }}
      />
      <TextInput
        ref={inputRef6}
        value={code6}
        maxLength={1}
        contextMenuHidden
        selectTextOnFocus
        editable={true}
        style={{...styles.input, color: theme ? Color.white : '#000'}}
        keyboardType="decimal-pad"
        onChangeText={text => {
          setCode6(text);
          if (text.length >= 1) {
            inputRef6.current.focus();
          } else if (text.length < 1) {
            inputRef5.current.focus();
          }
        }}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  BoxInputView: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minWidth: 50,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    width: 40,
    height: 55,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  BoxInputValue: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiZBold',
    textAlign: 'center',
    color: Color.cloudyGrey,
  },
  OtpContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  otpPressable: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TextInputValue: {
    position: 'absolute',
    opacity: 0,
    color: '#000',
  },
});
