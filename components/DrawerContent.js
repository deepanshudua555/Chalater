import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {accessChat, getAllUser, logout} from '../redux/action';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = props => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {loading, message, error, userArray} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const paperTheme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    setModalVisible(true);
    setSearchQuery('');
    // console.log('Search query:', searchQuery);
    dispatch(getAllUser(searchQuery));
  };
 
  const handleCloseDialog = () => {
    setDialogVisible(false);
    setModalVisible(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const sortedUserArray =
    userArray && [...userArray].sort((a, b) => a.name.localeCompare(b.name));

  const accessChatHandler = async userId => {
    console.log(userId);
    dispatch(accessChat(userId));
    setDialogVisible(false);
    setModalVisible(false);
    // props.navigation.closeDrawer();
    props.navigation.closeDrawer();
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
              <Avatar.Image source={{uri: user?.pic}} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{user?.name}</Title>
                <Caption style={styles.caption}>Hare Krishna</Caption>
              </View>
            </View>
            <Drawer.Section></Drawer.Section>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TextInput
                mode="outlined"
                outlineColor="#3A69F7"
                activeOutlineColor="#3A69F7"
                style={styles.input}
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
                    marginHorizontal: 5,
                  }}>
                  Go
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {userArray != null && (
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseDialog}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    // alignContent:"center",
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 20,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}>
                    {userArray && (
                      <FlatList
                        data={sortedUserArray}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => accessChatHandler(item._id)}>
                            <Text style={styles.itemText}>
                              {item.name
                                .split(' ')
                                .map(
                                  word =>
                                    word.slice(0, 1).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(' ')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}

                    <Button title="Close" onPress={handleCloseDialog} />
                  </View>
                </View>
              </Modal>
            </View>
          )}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
            // onPress={() => {
            //   toggleTheme();
            // }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleLogout}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#3A69F7',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 40,
    lineHeight: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3A69F7',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    alignSelf: 'center',
  },
});
