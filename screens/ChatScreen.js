import {
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  List,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Fontisto';
import Iconn from 'react-native-vector-icons/Entypo';
import {getAllUser} from '../redux/action';
import {  TextInput } from 'react-native-paper';
var hasAlerted = false;
const ChatScreen = () => {
  // const data = [
  //   {
  //     _id: '65ba0af7436b3c6631f0de24',
  //     name: 'tushar Rai',
  //     email: 'tusharrai132@gmail.com',
  //     password: '$2b$10$IBLbWPKaeC3gKN1rnXiqAeRAYf1DEiQvoFIZo2VXau78XHsbeojtK',
  //     pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  //     isAdmin: false,
  //     verified: true,
  //     otp: null,
  //     otp_expiry: null,
  //     createdAt: '2024-01-31T08:55:19.177Z',
  //     __v: 0,
  //   },
  //   {
  //     _id: '65ba0b18436b3c6631f0de2c',
  //     name: 'Tripti singla',
  //     email: 'singlatripti55@gmail.com',
  //     password: '$2b$10$8JTLP3kJlbiSkrZt0BVY..pm9bvDGnp2zUgFzFo56ot8Vz573SQiK',
  //     pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  //     isAdmin: false,
  //     verified: true,
  //     otp: null,
  //     otp_expiry: null,
  //     createdAt: '2024-01-31T08:55:52.667Z',
  //     __v: 0,
  //   },
  //   {
  //     _id: '65ba0b5a436b3c6631f0de32',
  //     name: 'surbhit thakur',
  //     email: 'tsurbhit5@gmail.com',
  //     password: '$2b$10$KNFm7dj3EYydkJvU7nfOpeoNwJmxJpK9VCvI53CGTZpzGPueQaK6y',
  //     pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  //     isAdmin: false,
  //     verified: true,
  //     otp: null,
  //     otp_expiry: null,
  //     createdAt: '2024-01-31T08:56:58.410Z',
  //     __v: 0,
  //   },
  // ];
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loading, message, error, userArray} = useSelector(state => state.auth);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  const handleSearch = () => {
    // Implement the logic to handle the search with the searchQuery
    // For now, let's just log the searchQuery
    
    console.log('Search query:', searchQuery);
    dispatch(getAllUser(searchQuery));

  };

  // const handlePress = () => {
  //   console.log('handle Press');
  //   dispatch(getAllUser('g'));
  // };
  // const handlePress2 = () => {
  //   console.log('handle Press2');
  //   console.log(userArray);
  // };

  useEffect(() => {
    // if (error) {
    //   Alert.alert('ERROR', error, [{text: 'ok'}], {
    //     cancelable: false,
    //   });
    //   dispatch({type: 'clearError'});
    // }
    // console.log(hasAlerted);
    console.log('userArray', userArray);

    if (message && !hasAlerted) {
      Alert.alert('MESSAGE', message, [{text: 'ok'}], {
        cancelable: false,
      });
      hasAlerted = true;
      dispatch({type: 'clearMessage'});
    }
  }, [Alert, error, message, dispatch, userArray]);
  return (
    <>
      <StatusBar backgroundColor="#3A69F7" />
      <View
        style={{
          backgroundColor: '#3A69F7',
          flex: 1,
          borderRightColor: '#000',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 24,
            marginLeft: 10,
            marginBottom: 5,
            color: '#fff',
            fontWeight: '600',
          }}>
          Convo Connect
        </Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Icon
            name="search"
            size={20}
            color="#fff"
            style={{
              backgroundColor: '#3A69F7',
              marginBottom: 10,
              marginLeft: 50,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(58, 136, 550, 0.5)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 10,
            marginBottom: 6,
            height: 40,
            width: 65,
            paddingLeft: 10,
            paddingRight: 35,
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Image
            size={30}
            style={{
              backgroundColor: '#3A69F7',
              width: 30,
              height: 30,
              borderRadius: 50,
            }}
            source={{uri: user?.pic}}
          />
          <Iconn
            name="chevron-down"
            size={25}
            color="#fff"
            style={
              {
                // alignSelf:"center"
                // backgroundColor: '#3A69F7',
              }
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 12,
        }}>
        {searchVisible && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginRight: 10,
                paddingLeft: 5,
                flex: 1,
              }}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            /> */}
            <TextInput
              mode="outlined"
              outlineColor="#3A69F7"
              activeOutlineColor="#3A69F7"
              label="Name*"
              style={{position: 'absolute', width: 325}}
              placeholder="Search..."
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Text
                style={{
                  backgroundColor: '#3A69F7',
                  color: '#fff',
                  padding: 10,
                  borderRadius: 5,
                  left: 136,
                  top: 11,
                }}>
                Go
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {userArray != null && (
          <View>
            {/* <Text>{JSON.stringify(userArray)}</Text> */}
            <FlatList
              data={userArray}
              keyExtractor={item => item._id}
              renderItem={({item}) => <Text>{item.name}</Text>}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ChatScreen;
