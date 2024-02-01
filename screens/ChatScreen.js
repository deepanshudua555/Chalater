import {View, Text, Alert, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
var hasAlerted = false;
const ChatScreen = () => {
  const data = [
    {
      _id: '65ba0af7436b3c6631f0de24',
      name: 'tushar Rai',
      email: 'tusharrai132@gmail.com',
      password: '$2b$10$IBLbWPKaeC3gKN1rnXiqAeRAYf1DEiQvoFIZo2VXau78XHsbeojtK',
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      verified: true,
      otp: null,
      otp_expiry: null,
      createdAt: '2024-01-31T08:55:19.177Z',
      __v: 0,
    },
    {
      _id: '65ba0b18436b3c6631f0de2c',
      name: 'Tripti singla',
      email: 'singlatripti55@gmail.com',
      password: '$2b$10$8JTLP3kJlbiSkrZt0BVY..pm9bvDGnp2zUgFzFo56ot8Vz573SQiK',
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      verified: true,
      otp: null,
      otp_expiry: null,
      createdAt: '2024-01-31T08:55:52.667Z',
      __v: 0,
    },
    {
      _id: '65ba0b5a436b3c6631f0de32',
      name: 'surbhit thakur',
      email: 'tsurbhit5@gmail.com',
      password: '$2b$10$KNFm7dj3EYydkJvU7nfOpeoNwJmxJpK9VCvI53CGTZpzGPueQaK6y',
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      verified: true,
      otp: null,
      otp_expiry: null,
      createdAt: '2024-01-31T08:56:58.410Z',
      __v: 0,
    },
  ];
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loading, message, error} = useSelector(state => state.auth);
  useEffect(() => {
    // if (error) {
    //   Alert.alert('ERROR', error, [{text: 'ok'}], {
    //     cancelable: false,
    //   });
    //   dispatch({type: 'clearError'});
    // }
    console.log(hasAlerted);
    if (message && !hasAlerted) {
      Alert.alert('MESSAGE', message, [{text: 'ok'}], {
        cancelable: false,
      });
      hasAlerted = true;
      dispatch({type: 'clearMessage'});
    }
  }, [Alert, error, message, dispatch]);
  return (
    <>
      <StatusBar backgroundColor="#3A69F7" />
      <View
        style={{
          backgroundColor: '#3A69F7',
          flex: 1,

          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Text>Hi</Text>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 12,

          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Text>Hi</Text>
      </View>
    </>
  );
};

export default ChatScreen;
