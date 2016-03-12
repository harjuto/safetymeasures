import firebase from 'firebase';
import {loggedOut} from '../actions/login';
import moment from 'moment';

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
    var startDate = moment().startOf('month');
    var endDate = moment().endOf('month');
    console.info(startDate.format('YYYY-DD-MM'));
    console.info(endDate.format('YYYY-DD-MM'));

    return this.firebase.child("measurements")
      .orderByChild("date")
      .startAt(startDate.format('YYYY-DD-MM'))
      .endAt(endDate.format('YYYY-DD-MM'))
      .once("value")
  }

  saveReport(report) {
    var ref = this.firebase.child("measurements");
    var newReportRef = ref.push(report);
  }
}

export default new FirebaseConnector();
