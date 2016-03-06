import moment from 'moment';
import {
  INCREMENT_CORRECT,
  DECREMENT_CORRECT,
  SUBMIT_DEFECT,
  REMOVE_DEFECT,
  DEFECT_DATA_CHANGED,
  SUBMIT_REPORT,
  REPORT_DATA_CHANGED } from '../actions/report';

import _ from 'lodash';
import reportMetadata from '../metadata';

const initialState = reportMetadata;

function clone(state) {
  var clonedState = Object.assign({}, state)
  clonedState.categories = state.categories.map( category => {
    return Object.assign({}, category, {
      defects: [].concat(category.defects)
    })
  })
  return clonedState;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_CORRECT:
      var clonedState = clone(state);
      var category = _.find(clonedState.categories, {'id': action.category.id})
      category.correct++;
      return clonedState;

    case DECREMENT_CORRECT:
      var clonedState = clone(state);
      var category = _.find(clonedState.categories, {'id': action.category.id})
      if(category.correct > 0) {
        category.correct--;
      }
      return clonedState;

    case SUBMIT_DEFECT:
      var clonedState = clone(state);
      var category = _.find(clonedState.categories, {'id': action.data.category.id})
      category.defects.push(action.data.defect);
      return clonedState;

    case REMOVE_DEFECT:
      var clonedState = clone(state);
      var category = _.find(clonedState.categories, {'id': action.id})
      category.defects.pop();
      return clonedState;

    case DEFECT_DATA_CHANGED: {
      var clonedState = clone(state);
      clonedState.defectTemplate = Object.assign({}, clonedState.defectTemplate, action.data);
      return clonedState;
    }
    case REPORT_DATA_CHANGED: {
      var clonedState = clone(state);
      clonedState.info = Object.assign({}, clonedState.info, action.data)
      return clonedState;
    }
    default:
      return state;
  }
}
