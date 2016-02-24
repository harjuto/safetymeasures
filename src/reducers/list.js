import { INITIALIZE_APP } from '../actions/socket';


import {SUBMIT_REPORT} from '../actions/report';


const initialState = {
  items: []
};


export default (state = initialState, action) => {
  switch(action.type){

    case INITIALIZE_APP: {
      console.info('INITIALIZED APP');
      return Object.assign({}, state, {
        items: [].concat(action.data)
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
