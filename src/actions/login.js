export const LOGIN = "LOGIN";
export const UPDATE_CREDENTIALS = "UPDATE_CREDENTIALS";
export const LOGIN_SUCCESFUL = "LOGIN_SUCCESFUL";
export const LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const LOGGED_OUT = "LOGGED_OUT";
export const GET_AUTHENTICATION = "GET_AUTHENTICATION";
export const CLEAR_AUTHENTICATION = "CLEAR_AUTHENTICATION";

import history from '../utilities/history';

import FirebaseApp from '../firebase/app';

import firebase from '../utilities/firebase';

export function connectToFirebase() {
  return dispatch => {
    FirebaseApp.attachAuthChangeListener( (authData) => {
      if (authData) {
      } else {
        dispatch(loggedOut());
      }
    })
  }
}
export function login(credentials) {
  return dispatch => {
    dispatch(loginInProgress());
    FirebaseApp.login(credentials, (authData, error) => {
      if (error) {
        dispatch(loginFailed(error));
      } else {
        dispatch(loginSuccessful(authData));
        history.push('/')
      }
      }
    )
  }
}

export function logout() {
  return dispatch => {
    firebase.logout()
  }
}
export function loggedOut() {
  return dispatch => {
    dispatch(clearAuthentication())
    history.push('/login')
  }
}
export function clearAuthentication() {
  return {
    type: CLEAR_AUTHENTICATION
  }
}
export function getAuthentication() {
  return dispatch => {
    var authData = FirebaseApp.getAuthentication();
    if(authData) {
      dispatch(loginSuccessful(authData))
    }
  }
  return {
    type: GET_AUTHENTICATION
  }
}
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}
export function loginInProgress() {
  return {
    type: LOGIN_IN_PROGRESS
  }
}
export function loginSuccessful(authData) {
  return {
    type: LOGIN_SUCCESFUL,
    auth: authData
  }
}

export function updateCredentials(credentials) {
  return {
    type: UPDATE_CREDENTIALS,
    credentials
  }
}
