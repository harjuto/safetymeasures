import app from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

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
  }

  login(credentials, callback) {
    this.auth.signInWithEmailAndPassword(credentials.username, credentials.password)
      .then(callback)
      .catch((error) => callback(null, error));
  }


  attachAuthChangeListener(callback) {
    this.auth.onAuthStateChanged(callback);
  }

  getAuthentication() {
    return this.auth.currentUser;
  }
}

export default new Firebase();