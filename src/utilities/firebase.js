import firebase from 'firebase';
import {loggedOut} from '../actions/login';
import moment from 'moment';

class FirebaseConnector {

  connect() {
    this.firebase = new Firebase("https://peltiassat.firebaseio.com/");
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
  listProjects() {
    return this.firebase.child('projects').once("value")
  }

  saveProject(project) {
    var ref = this.firebase.child('projects');
    var projectRef = ref.push(project);
  }

  listReports(projectId) {
    var startDate = moment().startOf('month');
    var endDate = moment().endOf('month');
    return this.firebase.child("measurements/" + projectId)
      .orderByChild("date")
      .startAt(startDate.format('YYYY-DD-MM'))
      .endAt(endDate.format('YYYY-DD-MM'))
      .once("value")
  }

  getProjectData(projectId) {
    console.info(" Fetching for " + projectId)
    return this.firebase.child('projects/' + projectId).once("value")
  }

  saveReport(report) {
    var ref = this.firebase.child("measurements/" + report.projectId);
    var newReportRef = ref.push(report);
  }
}

export default new FirebaseConnector();
