import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import socket from 'socket.io-client';
import listReducer from '../reducers/list';
import reportReducer from '../reducers/report'
import formReducer from '../reducers/form';
import SocketManager from '../utilities/socketmanager';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

const combinedReducer = combineReducers({
  listReducer,
  reportReducer,
  formReducer
});

const store = createStoreWithMiddleware(combinedReducer);

SocketManager.connect();

export default store;
