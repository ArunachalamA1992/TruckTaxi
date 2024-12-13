import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {InteractionManager, Keyboard, StyleSheet, Text} from 'react-native';
import {Pressable, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../Config/Color';

export const MapOtpInput1 = ({
  inputRef,
  code,
  setCode,
  maximumLength,
  setIsPinReady,
  editable,
}) => {
  // console.log('codemmmmmmm', code);
  
  const boxArray = new Array(maximumLength).fill(0);
  const theme = useSelector(state => state?.ThemeReducer?.theme);

  const value = code?.split(' ');
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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

export const MapOtpInput2 = ({
  inputRef,
  code,
  setCode,
  maximumLength,
  setIsPinReady,
  editable,
}) => {
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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
        editable={editable}
        style={{
          ...styles.input,
          borderColor: theme
            ? Color.white
            : editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          color: theme ? Color.white : Color.black,
        }}
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

export const MapOtpInput3 = ({
  inputRef,
  code,
  setCode,
  maximumLength,
  setIsPinReady,
  editable,
}) => {
  const theme = useSelector(state => state.ThemeReducer.theme);
  const boxArray = new Array(maximumLength).fill(0);
  //   const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useLayoutEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  useLayoutEffect(() => {
    if (code.length == 6) {
      Keyboard.dismiss();
    }
  }, [code]);
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    return (
      <View
        key={index}
        style={{
          borderColor: theme
            ? Color.white
            : digit && editable
            ? Color.primary
            : editable
            ? Color.black
            : Color.lightgrey,
          borderWidth: 1,
          borderRadius: 5,
          padding: 4,
          minWidth: 25,
          marginVertical: 10,
          marginHorizontal: 1,
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: theme ? Color.white : Color.black,
          }}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <Pressable
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
        onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={{
          position: 'absolute',
          opacity: 0,
        }}
        editable={editable}
        keyboardType="number-pad"
        value={code}
        onChangeText={value => {
          // if (value.length > 2) {
          setCode(value);
          // }
        }}
        autoFocus={true}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

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
    fontSize: 15,
    textAlign: 'center',
    width: 30,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 1,
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
