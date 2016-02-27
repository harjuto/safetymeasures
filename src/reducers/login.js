import {UPDATE_CREDENTIALS, LOGIN_IN_PROGRESS, LOGIN_FAILED, CLEAR_AUTHENTICATION} from '../actions/login';

const initialState = {
  loginInProgress: false,
  message: '',
  username: '',
  password: ''
}
export default (state = initialState, action) => {

  switch(action.type) {
    case UPDATE_CREDENTIALS: {
      return Object.assign({}, state, action.credentials, {
        message: ''
      });
    }
    case LOGIN_IN_PROGRESS: {
      return Object.assign({}, state, {
        password: '',
        loginInProgress: true,
        message: ''
      })
    }
    case LOGIN_FAILED: {
      return Object.assign({}, state, {
        loginInProgress: false,
        message: action.error
      })
    }
    case CLEAR_AUTHENTICATION: {
      return Object.assign({}, state, initialState)
    }

    default: {
      return state;
    }
  }


}
