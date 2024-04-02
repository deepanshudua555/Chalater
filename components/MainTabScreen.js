import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={({focused}) => ({
          tabBarLabel: 'Chats',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon
              name={
                focused
                  ? 'chatbubble-ellipses-sharp'
                  : 'chatbubble-ellipses-outline'
              }
              color={'#3A69F7'}
              size={26}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const CustomHeaderLeft = ({navigation}) => {
  return (
    <View style={{marginLeft: 10}}>
      <Icon.Button
        name="ios-menu"
        size={25}
        backgroundColor="#009387"
        onPress={() => navigation.openDrawer()}></Icon.Button>
        
    </View>
  );
};

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={ChatScreen}
      options={({navigation}) => ({
        headerShown: false, // Hide the header
        // headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      })}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Details"
      component={ChatScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);
