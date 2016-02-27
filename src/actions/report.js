import socketmanager from '../utilities/socketmanager';
import actions from '../../shared/actions';
import firebase from '../utilities/firebase';

export const CORRECT_PRESSED = 'CORRECT_PRESSED';
export const SUBMIT_DEFECT = 'SUBMIT_DEFECT';

export function submitReport(report) {
  return dispatch => {
    console.info(report)
      firebase.saveReport(report)

  }
}

export function correctPressed(category) {
  return {
    type: CORRECT_PRESSED,
    category
  }
}

export function submitDefect(data) {
  return {
    type: SUBMIT_DEFECT,
    data
  }
}
