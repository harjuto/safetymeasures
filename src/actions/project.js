import history from '../utilities/history';
import FirebaseApp from '../firebase/app';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const PROJECT_DATA_CHANGED = 'PROJECT_DATA_CHANGED';
export const CLEAR_PROJECT = 'CLEAR_PROJECT';
export const SELECT_PROJECT = 'SELECT_PROJECT';

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const FETCHING_REPORTS = "FETCHING_REPORTS";

export function listProjects() {
  return dispatch => {
    dispatch(fetchingProjects());
    FirebaseApp.listProjects()
      .then((data) => {
        dispatch(receiveProjects(data.val()));
      },(error) => {
        console.info('failas promise');
      })
  }
}

export function fetchingProjects() {
  return {
    type: FETCHING_PROJECTS
  }
}

export function receiveProjects(data) {
  return {
    type: RECEIVE_PROJECTS,
    data
  }
}

export function projectDataChanged(data) {
  return {
    type: PROJECT_DATA_CHANGED,
    data
  }
}

export function submitProject(project) {
  return dispatch => {
    dispatch(clearProject());
    FirebaseApp.saveProject(project)
      .then(() => {
        history.push('/');
      })
  }
}

export function clearProject() {
  return {
    type: CLEAR_PROJECT
  }
}

export function selectProject(project) {
  history.push('report/list/' + project._id);
  return {
    type: SELECT_PROJECT,
    project
  }
}

export function listReports(projectId) {
  return dispatch => {
    dispatch(fetchingReports(projectId));
    FirebaseApp.listReports(projectId)
      .then((data) => {
        dispatch(receiveReports(data.val()));
      })
      .catch((error) => {
        console.info('Failed to query reports');
      })
  }
}

export function fetchingReports(projectId) {
  return {
    type: FETCHING_REPORTS,
    projectId
  }
}

export function receiveReports(reports) {
  return {
    type: RECEIVE_REPORTS,
    reports
  }
}