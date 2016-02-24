import socketmanager from '../utilities/socketmanager';
import actions from '../../shared/actions';
export const CORRECT_PRESSED = 'CORRECT_PRESSED';
export const SUBMIT_DEFECT = 'SUBMIT_DEFECT';

export function submitReport(report) {
  console.info(report)
  return dispatch => {
    socketmanager.emit(actions.SUBMIT_REPORT, report);
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
