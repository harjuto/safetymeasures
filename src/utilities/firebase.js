import firebase from 'firebase';
import {loggedOut} from '../actions/login';

class FirebaseConnector {

  connect() {
    this.firebase = new Firebase("https://shining-torch-8422.firebaseio.com/");
  }

  attachAuthChangeListener(callback) {
    this.firebase.onAuth( callback );
  }

  login(credentials, callback) {
    this.firebase.authWithPassword({
      email    : credentials.username,
      password : credentials.password
    }, callback);
  }

  logout() {
    this.firebase.unauth();
  }

  getAuthentication() {
    return this.firebase.getAuth();
  }
}

export default new FirebaseConnector();
