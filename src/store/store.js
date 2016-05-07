import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root';
import reportReducer from '../reducers/report'
import loginReducer from '../reducers/login';
import projectReducer from '../reducers/project';
import {getAuthentication, connectToFirebase} from '../actions/login';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);


const combinedReducer = combineReducers({
  rootReducer,
  reportReducer,
  loginReducer,
  projectReducer
});

const store = createStoreWithMiddleware(combinedReducer);

store.dispatch(connectToFirebase());
store.dispatch(getAuthentication());

export default store;
