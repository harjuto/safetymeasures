import FirebaseApp from '../firebase/app';
import moment from 'moment';

class FirebaseConnector {


  getProjectData(projectId) {
    // return this.firebase.child('projects/' + projectId).once('value')
  }

  saveReport(report) {
    // var ref = this.firebase.child('measurements/' + report.projectId);
    // var newReportRef = ref.push(report);
  }
}

export default new FirebaseConnector();
