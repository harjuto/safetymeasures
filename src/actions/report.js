import actions from '../../shared/actions';
import firebase from '../utilities/firebase';

export const INCREMENT_CORRECT = 'INCREMENT_CORRECT';
export const DECREMENT_CORRECT = 'DECREMENT_CORRECT';
export const SUBMIT_DEFECT = 'SUBMIT_DEFECT';
export const REMOVE_DEFECT = 'REMOVE_DEFECT';
export const DEFECT_DATA_CHANGED = 'DEFECT_DATA_CHANGED';
export const REPORT_DATA_CHANGED = 'REPORT_DATA_CHANGED';
export const CLEAR_REPORT = 'CLEAR_REPORT';

export function submitReport(report) {
  return dispatch => {
    dispatch(clearReport());
    firebase.saveReport(report)
  }
}
export function clearReport() {
  return {
    type: CLEAR_REPORT
  }
}
export function reportDataChanged(data) {
  return {
    type: REPORT_DATA_CHANGED,
    data
  }
}

export function incrementCorrect(category) {
  return {
    type: INCREMENT_CORRECT,
    category
  }
}

export function decrementCorrect(category) {
  return {
    type: DECREMENT_CORRECT,
    category
  }
}

export function defectDataChanged(data) {
  return {
    type: DEFECT_DATA_CHANGED,
    data
  }
}

export function removeDefect(id) {
  return {
    type: REMOVE_DEFECT,
    id
  }
}
export function submitDefect(data) {
  return {
    type: SUBMIT_DEFECT,
    data
  }
}
