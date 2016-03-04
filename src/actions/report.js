import socketmanager from '../utilities/socketmanager';
import actions from '../../shared/actions';
import firebase from '../utilities/firebase';

export const CORRECT_PRESSED = 'CORRECT_PRESSED';
export const SUBMIT_DEFECT = 'SUBMIT_DEFECT';
export const DEFECT_DATA_CHANGED = 'DEFECT_DATA_CHANGED';
export const REPORT_DATA_CHANGED = 'REPORT_DATA_CHANGED';

export function submitReport(report) {
  return dispatch => {
    firebase.saveReport(report)
  }
}

export function reportDataChanged(data) {
  return {
    type: REPORT_DATA_CHANGED,
    data
  }
}

export function correctPressed(category) {
  return {
    type: CORRECT_PRESSED,
    category
  }
}

export function defectDataChanged(data) {
  return {
    type: DEFECT_DATA_CHANGED,
    data
  }
}
export function submitDefect(data) {
  return {
    type: SUBMIT_DEFECT,
    data
  }
}
