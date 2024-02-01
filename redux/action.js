import axios from 'axios';
const serverUrl = 'http://192.168.0.199:5000/api/user';
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
      dispatch({type: 'loadUserFailure', payload: error.response.data.message});
    }
  };