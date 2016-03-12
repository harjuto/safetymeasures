import firebase from '../utilities/firebase';
export const RECEIVE_MEASUREMENTS = "RECEIVE_MEASUREMENTS";
export const FETCHING_MEASUREMENTS = "FETCHING_MEASUREMENTS";

export function listMeasurements(pagination) {
  return dispatch => {
      dispatch(fetchingMeasurements());
      firebase.listMeasurements(pagination)
        .then((data) => {
          dispatch(receiveMeasurements(data.val()));
        },(error) => {
          console.info('failas promise');
        })
  }
}

export function fetchingMeasurements() {
  return {
    type: FETCHING_MEASUREMENTS
  }
}
export function receiveMeasurements(measurements) {
  return {
    type: RECEIVE_MEASUREMENTS,
    measurements
  }
}
