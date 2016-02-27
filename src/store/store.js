import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root';
import listReducer from '../reducers/list';
import reportReducer from '../reducers/report'
import formReducer from '../reducers/form';
import loginReducer from '../reducers/login';
import {getAuthentication, connectToFirebase} from '../actions/login';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

const combinedReducer = combineReducers({
  rootReducer,
  listReducer,
  reportReducer,
  formReducer,
  loginReducer
});

const store = createStoreWithMiddleware(combinedReducer);

store.dispatch(connectToFirebase());
store.dispatch(getAuthentication());

export default store;
