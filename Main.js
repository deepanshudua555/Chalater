import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from './screens/Home';
import {View, Text} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
// import Login from './screens/Login';
// import Footer from './components/Footer';
// import Profile from './screens/Profile';
// import Register from './screens/Register';
// import ChangeAvatar from './screens/ChangeAvatar';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {loadUser} from './redux/action';
import Loader from './components/Loader';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent';
import MainTabScreen from './components/MainTabScreen';
import RootStackScreen from './components/RootStackScreen';
import SupportScreen from './screens/supportScreen';
// import ChangePassword from './screens/ChangePassword';
// import Verify from './screens/Verify';
// import ForgetPassword from './screens/ForgetPassword';
// import ResetPassword from './screens/ResetPassword';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const {isAuthenticated, loading} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <RootStackScreen />
      ) : (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="mainTabScreen" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;
// <NavigationContainer>
//   <Stack.Navigator initialRouteName={isAuthenticated ? 'chat' : 'login'}>
//     <Stack.Screen
//       name="signup"
//       component={SignUpScreen}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="login"
//       component={LoginScreen}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="chat"
//       component={ChatScreen}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
//   {/* {isAuthenticated && <Footer />} */}
// </NavigationContainer>
