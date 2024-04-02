import axios from 'axios';
const serverUrl = 'http://192.168.0.193:5000/api/user';
const serverUrlT = 'http://192.168.0.193:5000/api/chat';

export const registerProfile =
  (name, email, password, pic) => async dispatch => {
    try {
      dispatch({type: 'registerRequest'});

      const {data} = await axios.post(
        `${serverUrl}/register`,
        {
          name,
          email,
          password,
          pic,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      dispatch({type: 'registerSuccess', payload: data});
    } catch (error) {
      dispatch({
        type: 'registerFailure',
        payload: error.response.data.message,
      });
    }
  };

export const login = (email, password) => async dispatch => {
  try {
    dispatch({type: 'loginRequest'});

    const {data} = await axios.post(
      `${serverUrl}/login`,
      {email, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data', data);
    dispatch({type: 'loginSuccess', payload: data});
  } catch (error) {
    console.log(error + ' Hi i am error');
    dispatch({type: 'loginFailure', payload: error.response.data.message});
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({type: 'loadUserRequest'});

    const {data} = await axios.get(`${serverUrl}/me`);

    dispatch({type: 'loadUserSuccess', payload: data});
  } catch (error) {
    console.log('error.response.data.message.loadUser', error);
    dispatch({type: 'loadUserFailure', payload: error.response.data.message});
  }
};
export const getAllUser = search => async dispatch => {
  try {
    dispatch({type: 'getAllUserRequest'});

    const {data} = await axios.get(`${serverUrl}/getalluser?search=${search}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(data);

    dispatch({type: 'getAllUserSuccess', payload: data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'getAllUserFailure',
      payload: error.response.data.message,
    });
  }
};

export const accessChat = userId => async dispatch => {
  try {
    dispatch({type: 'accessChatRequest'});
    console.log('in accessChat', userId);
    const {data} = await axios.post(
      `${serverUrlT}/accesschat`,
      {userId},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data', data);
    dispatch({type: 'accessChatSuccess', payload: data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'accessChatFailure',
      payload: error.response.data.message,
    });
  }
};

export const getAllChats =()=> async dispatch => {
  console.log("in getAllChats from server");
  try {
    dispatch({type: 'getAllChatsRequest'});
    const {data} = await axios.get(`${serverUrlT}/getallchats`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(data);

    dispatch({type: 'getAllChatsSuccess', payload: data});
  } catch (error) {
    console.log("error");
    dispatch({
      type: 'getAllChatsFailure',
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({type: 'logoutRequest'});

    await axios.get(`${serverUrl}/logout`);

    dispatch({type: 'logoutSuccess'});
  } catch (error) {
    dispatch({type: 'logoutFailure', payload: error.response.data.message});
  }
};
