import {
  RECEIVE_MEASUREMENTS,
  FETCHING_MEASUREMENTS
} from '../actions/measurement'
import _ from 'lodash';
import {SUBMIT_REPORT} from '../actions/report';


const initialState = {
  loading: false,
  pagination: {
    from: 0,
    to: 10
  },
  items: []
};


export default (state = initialState, action) => {
  switch(action.type){
    case FETCHING_MEASUREMENTS: {
      return Object.assign({}, state, {loading:true})
    }
    case RECEIVE_MEASUREMENTS: {
      var items = [];
       _.mapValues(action.measurements, (object, key) => {
         object._id = key;
         items.push(object)
      });
      return Object.assign({}, state, {
        loading: false,
        items: [].concat(items)
      })
    }

    case SUBMIT_REPORT:{
      return Object.assign({}, state, {
        items: state.items.concat(action.report)
      });
    }
    default:
      return state;
  }
}
