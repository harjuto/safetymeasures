import { LOGIN_SUCCESFUL, CLEAR_AUTHENTICATION } from '../actions/login';


const initialState = {
  auth: undefined
}

export default (state = initialState, action ) => {
  switch(action.type) {
    case LOGIN_SUCCESFUL: {
      return Object.assign({}, state, {
        auth: action.auth
      })
    }
    case CLEAR_AUTHENTICATION: {
      return Object.assign({} ,state, initialState)
    }

    default: {
      return state;
    }
  }
}
