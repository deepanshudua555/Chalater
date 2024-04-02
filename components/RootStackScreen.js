import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// import SplashScreen from './SplashScreen';
// import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="SplashScreen" component={LoginScreen} /> */}
    <RootStack.Screen name="login" component={LoginScreen} />
    <RootStack.Screen name="signup" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
