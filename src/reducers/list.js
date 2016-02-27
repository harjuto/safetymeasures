import {RECEIVE_MEASUREMENTS} from '../actions/measurement'
import _ from 'lodash';
import {SUBMIT_REPORT} from '../actions/report';


const initialState = {
  items: []
};


export default (state = initialState, action) => {
  switch(action.type){

    case RECEIVE_MEASUREMENTS: {
      var items = [];
      console.info(action.measurements)
       _.mapValues(action.measurements, (object, key) => {
         object._id = key;
         items.push(object)
      })
      console.info(items);
      return Object.assign({}, state, {
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
