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

  //Database functionality

  listMeasurements() {
    var ref = this.firebase.child("measurements");
    return ref.orderByKey().once("value")
  }

  saveReport(report) {
    var ref = this.firebase.child("measurements");
    var newReportRef = ref.push(report);
    // var serializedReport = Object.assign({}, newReportRef, report);

  }
}

export default new FirebaseConnector();
