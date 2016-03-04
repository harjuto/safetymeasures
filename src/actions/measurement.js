import firebase from '../utilities/firebase';
export const RECEIVE_MEASUREMENTS = "RECEIVE_MEASUREMENTS";

export function listMeasurements() {
  return dispatch => {
      firebase.listMeasurements()
        .then((data) => {
          dispatch(receiveMeasurements(data.val()));
        },(error) => {
          console.info('failas promise');
        })
  }
}

export function receiveMeasurements(measurements) {
  return {
    type: RECEIVE_MEASUREMENTS,
    measurements
  }
}
