import {createAction, createReducer} from '@reduxjs/toolkit';

const registerRequest = createAction('registerRequest');
const registerSuccess = createAction('registerSuccess');
const registerFailure = createAction('registerFailure');
const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginFailure = createAction('loginFailure');
const loadUserRequest = createAction('loadUserRequest');
const loadUserSuccess = createAction('loadUserSuccess');
const loadUserFailure = createAction('loadUserFailure');
const getAllUserRequest = createAction('getAllUserRequest');
const getAllUserSuccess = createAction('getAllUserSuccess');
const getAllUserFailure = createAction('getAllUserFailure');
const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');




export const authReducer = createReducer(
  // Initial state
  {
    loading: false,
    isAuthenticated: false,
    user: null,
    message: null,
    error: null,
    userArray:null
  },
  // Builder callback
  builder => {
    builder

      // REGISTER
      .addCase(registerRequest, state => {
        state.loading = true;
      })
      .addCase(registerSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(registerFailure, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      //LOGIN
      .addCase(loginRequest, state => {
        state.loading = true;
      })
      .addCase(loginSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(loginFailure, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      //LOADUSER
      .addCase(loadUserRequest, state => {
        state.loading = true;
      })
      .addCase(loadUserSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loadUserFailure, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // ALLUSER
      .addCase(getAllUserRequest, state => {
        state.loading = true;
      })
      .addCase(getAllUserSuccess, (state, action) => {
        state.loading = false;
        state.userArray = action.payload;
      })
      .addCase(getAllUserFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //    clearError: state => {
      //   state.error = null;
      // },
      // clearMessage: state => {
      //   state.message = null;
      // },

      .addCase(clearError, state => {
        state.error = null;
        
      })
      .addCase(clearMessage, state => {
        state.message = null;
      });

  },
);
