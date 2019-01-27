import app from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import moment from 'moment';

class Firebase {
  constructor() {
    app.initializeApp({
      apiKey: "AIzaSyD58VU5Y2aBzcTGaOitfCjawqmtf1alc7Q",
      authDomain: "peltiassat.firebaseapp.com",
      databaseURL: "https://peltiassat.firebaseio.com",
      projectId: "project-6653468882681486140",
      storageBucket: "project-6653468882681486140.appspot.com",
      messagingSenderId: "1061988811696"
    });

    this.auth = app.auth();
    this.database = app.database();
  }

  login(credentials, callback) {
    this.auth.signInWithEmailAndPassword(credentials.username, credentials.password)
      .then(callback)
      .catch((error) => callback(null, error));
  }

  logout() {
    this.auth.signOut();
  }

  attachAuthChangeListener(callback) {
    this.auth.onAuthStateChanged(callback);
  }

  getAuthentication() {
    return this.auth.currentUser;
  }

  listProjects() {
    return this.database.ref('projects').once('value')
  }

  listReports(projectId) {
    return this.database.ref('measurements/' + projectId)
      .orderByChild('date')
      .once('value')
  }

  saveProject(project) {
    var ref = this.database.ref('projects');
    return ref.push(project);
  }

  getProjectData(projectId) {
    return this.database.ref('projects/' + projectId).once('value')
  }
}

export default new Firebase();
