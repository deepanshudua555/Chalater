import {
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  List,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Fontisto';
import Iconn from 'react-native-vector-icons/Entypo';
import {getAllChats, getAllUser} from '../redux/action';
import {  TextInput } from 'react-native-paper';
import DrawerPanel from '../components/DrawerPanel';

var hasAlerted = false;
const ChatScreen = ({navigation}) => {
 
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loading, message, error, userArray, chatArray, accessChatData} =
    useSelector(state => state.auth);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    navigation.openDrawer();
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
    // console.log('userArray', userArray);

    if (message && !hasAlerted) {
      Alert.alert('MESSAGE', message, [{text: 'ok'}], {
        cancelable: false,
      });
      hasAlerted = true;
      dispatch({type: 'clearMessage'});
    }
    dispatch(getAllChats()); 
    console.log(JSON.stringify(chatArray));
  }, [Alert, error, message, dispatch, userArray, accessChatData]);
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
        {/* <Text>
          {chatArray?JSON.stringify(chatArray):hi}
        </Text> */}
        {/* <View>
          {chatArray?.map((chat, index) => (
            <View key={index}>
              {chat.users.map(cuser => (
                <View key={cuser._id}>
                  {cuser.name !== user.name && (
                    <View>
                      <Text>{cuser.name}</Text>
                      <Text>{cuser.email}</Text>
                      <Image
                        source={{uri: cuser.pic}}
                        style={{width: 100, height: 100}}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View> */}

        <View>
          {chatArray?.map((chat, index) => (
            <View key={index}>
              {chat.users.map(cuser => (
                <View key={cuser._id}>
                  {cuser.name !== user.name && (
                    <TouchableOpacity style={styles.chatItem}>
                      <Image source={{uri: cuser.pic}} style={styles.avatar} />
                      <View style={styles.chatInfo}>
                        <Text style={styles.name}>{cuser.name}</Text>
                        <Text style={styles.email}>{cuser.email}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default ChatScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
  chatMeta: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#128C7E',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
});




