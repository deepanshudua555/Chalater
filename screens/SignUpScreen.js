import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {registerProfile, updateProfile} from '../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const SignUpScreen = () => {
  const serverUrl = 'http://192.168.0.200:5000/api/user';
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordCVisible, setPasswordCVisible] = useState(true);
  const dispatch = useDispatch();
  const handleImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access gallery',
          message: 'We need your permission to access your gallery',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 1000,
            maxWidth: 1000,
            quality: 1,
          },
          response => {
            console.log(response);
            if (
              response &&
              response.assets &&
              response.assets.length > 0 &&
              !response.didCancel
            ) {
              // Handle the selected image (response.uri)
              let newFile = {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              };
              handleImageUpload(newFile);
              //   console.log('Image URI:', response.assets[0].uri);
              //   setProfilePhoto(response.assets[0].uri);
            }
          },
        );
      } else {
        // Alert.alert('Gallery permission denied', [{text: 'give prmission to app in settings'}], {
        //   cancelable: false,
        // });
        Alert.alert('Gallery permission denied by you');
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageUpload = image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'chat-app');
    data.append('cloud_name', 'dvib3la0z');
    fetch('https://api.cloudinary.com/v1_1/dvib3la0z/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setProfilePhoto(data.url.toString());
        console.log(data.url.toString());
        console.log(`handleImageUpload ${typeof data.url.toString()}`);

        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // const registerHandler = async  () => {
  //   try {
  //     console.log(name, email, password, profilePhoto);
  //     const response = await axios.post(
  //       `${serverUrl}/register`,
  //       {
  //         name,
  //         email,
  //         password,
  //         pic: profilePhoto,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json, text/plain, */*',
  //         },
  //       },
  //       {mode: 'cors'},
  //     );
  //     console.log("Successful signup");
  //     navigation.navigate('chat')
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       console.error('Server responded with error:', error.response.data);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error('No response received. Request:', error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error('Error during request setup:', error.message);
  //     }
  //     console.error('Error config:', error.config);
  //     Alert.alert('Network Error. Please try again.');
  //     console.log(error);
  //   }
  //   //   dispatch(registerProfile(name, email.toLowerCase(), password, avatar));
  // };
    const registerHandler = () => {
      dispatch(registerProfile(name, email.toLowerCase(), password, profilePhoto));
    };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        size={100}
        style={{
          backgroundColor: '#3A69F7',
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
        source={
          profilePhoto
            ? {uri: profilePhoto}
            : {
                uri: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
              }
        }
      />
      <View>
        <TouchableOpacity onPress={handleImage}>
          <Iconn
            name="camera-plus"
            size={25}
            color="#fff"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 15,
              margin: 10,
              padding: 8,
              backgroundColor: '#3A69F7',
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          outlineColor="#3A69F7"
          activeOutlineColor="#3A69F7"
          label="Name*"
          style={styles.input}
          placeholder="enter your full name"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          outlineColor="#3A69F7"
          activeOutlineColor="#3A69F7"
          keyboardType="email-address"
          label="E-mail*"
          style={styles.input}
          placeholder="enter your e-mail"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={email}
          onChangeText={setEmail}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            label="Password*"
            secureTextEntry={passwordVisible}
            outlineColor="#3A69F7"
            activeOutlineColor="#3A69F7"
            style={[styles.input, {flex: 1}]}
            placeholder="enter strong password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#3A69F7"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            label="Confirm Password*"
            secureTextEntry={passwordCVisible}
            style={[{flex: 1}]}
            outlineColor="#3A69F7"
            activeOutlineColor="#3A69F7"
            placeholder="enter strong password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordCVisible(!passwordCVisible)}>
            <Icon
              name={passwordCVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#3A69F7"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        {!(password === confirmPassword) && (
          <Text style={{color: '#3A69F7', fontSize: 11}}>
            *Password does not match with confirm password*
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={
          !name ||
          !email ||
          !password ||
          !confirmPassword ||
          !(password === confirmPassword)
            ? styles.registerbtnEnbld
            : styles.registerbtn
        }
        disabled={
          !name ||
          !email ||
          !password ||
          !profilePhoto ||
          !(password === confirmPassword)
        }
        onPress={registerHandler}>
        <Text style={{color: '#fff'}}>Sign up</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#3A69F7',
            height: 30,
            marginLeft: 20,
            // marginRight: 20,
            marginVertical: 20,
          }}>
          Have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text
            style={{
              color: '#3A69F7',
              height: 30,
              marginVertical: 20,
              marginLeft: 5,
              marginRight: 20,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },
  registerbtn: {
    backgroundColor: '#3A69F7',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
  },
  registerbtnEnbld: {
    backgroundColor: '#3A69F7',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
    opacity: 0.5,
  },
});
