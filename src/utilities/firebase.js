import FirebaseApp from '../firebase/app';
import moment from 'moment';

class FirebaseConnector {

  login(credentials, callback) {
    // this.firebase.authWithPassword({
    //   email    : credentials.username,
    //   password : credentials.password
    // }, callback);
  }

  logout() {
    this.firebase.unauth();
  }


  saveProject(project) {
  //   var ref = this.firebase.child('projects');
  //   var projectRef = ref.push(project);
  }

  listReports(projectId) {
    // var startDate = moment().startOf('month');
    // var endDate = moment().endOf('month');
    // return this.firebase.child('measurements/' + projectId)
    //   .orderByChild('date')
    //   .startAt(startDate.format('YYYY-DD-MM'))
    //   .endAt(endDate.format('YYYY-DD-MM'))
    //   .once('value')
  }

  getProjectData(projectId) {
    // return this.firebase.child('projects/' + projectId).once('value')
  }

  saveReport(report) {
    // var ref = this.firebase.child('measurements/' + report.projectId);
    // var newReportRef = ref.push(report);
  }
}

export default new FirebaseConnector();
