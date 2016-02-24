import io from 'socket.io-client';
import store from '../store/store';
import actions from '../../shared/actions';
import {initializeApp} from '../actions/socket';

class SocketManager {

  connect() {
    this.socket = io();
    this.socket.on('connect', () => {
      console.info('Socket connected');
    })
    this.socket.on(actions.INITIALIZE, (data) => {
      store.dispatch(initializeApp(data))
      console.info('Initialized');
    })
    this.socket.on('disconnect', () => {
      console.info('Socket disconnected');
    })
  }

  emit(action, data) {
    console.info('Emitting to server... ' + action);
    console.info(this.socket)
    this.socket.emit(action, data);
  }
}
export default new SocketManager();;
