import moment from 'moment';
import { CORRECT_PRESSED, SUBMIT_DEFECT, SUBMIT_REPORT } from '../actions/report';
import _ from 'lodash';

const initialState = {
  category1: {
    id: 1,
    title: "Työskentely",
    correct: 0,
    defects: []
  },
  category2: {
    id: 2,
    title: "Telineet",
    correct: 0,
    defects: []
  },
  category3: {
    id: 3,
    title: "Koneet",
    correct: 0,
    defects: []
  }
};

function clone(state) {
  return _.mapValues(state, (category) => {
    return Object.assign({}, category, {
      defects: [
        ...category.defects
      ]
    })
  })
}

export default (state = initialState, action) => {

  switch(action.type) {
    case CORRECT_PRESSED:
      var clonedState = clone(state);
      var category = clonedState['category' + action.category.id]
      category.correct++;
      return clonedState;

    case SUBMIT_DEFECT:
      var clonedState = clone(state);
      var category = clonedState['category' + action.data.category.id]
      category.defects.push(action.data.defect);
      return clonedState;

    default:
      return state;
  }
}
