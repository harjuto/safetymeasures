import {
  RECEIVE_PROJECTS,
  FETCHING_PROJECTS,
  PROJECT_DATA_CHANGED,
  CLEAR_PROJECT,
  SELECT_PROJECT,
  RECEIVE_REPORTS,
  FETCHING_REPORTS
} from '../actions/project';

const initialState = {
  loading: false,
  projects: [],
  selectedProject: {
    contractor:'',
    sitename:'',
    foreman: '',
    reports: []
  }
};


export default (state = initialState, action) => {

  switch(action.type) {

    case PROJECT_DATA_CHANGED :{
      return Object.assign({}, state, {
        project: Object.assign({}, state.project, action.data)
      });
    }

    case CLEAR_PROJECT: {
      return initialState;
    }

    case FETCHING_PROJECTS: {
      return Object.assign({}, state, {loading: true});
    }

    case RECEIVE_PROJECTS: {
      var items = [];
      _.mapValues(action.data, (object, key) => {
        object._id = key;
        items.push(object)
      });
      return Object.assign({}, state, {
        loading: false,
        projects: [].concat(items)
      });
    }

    case FETCHING_REPORTS: {
      return Object.assign({}, state, {
        loading:true
      })
    }

    case RECEIVE_REPORTS: {
      var items = [];
      _.mapValues(action.reports, (object, key) => {
        object._id = key;
        items.push(object)
      });
      return Object.assign({}, state, {
        loading: false,
        selectedProject: Object.assign({}, state.selectedProject, {
          reports: [].concat(items)
        })
      })
    }

    case SELECT_PROJECT: {
      return Object.assign({}, state, {
        selectedProject: {
          _id: action.project._id,
          contractor: action.project.contractor,
          sitename: action.project.sitename,
          foreman: action.project.foreman,
          reports: [].concat(state.selectedProject.reports)
        }
      })
    }

    default: {
      return state
    }
  }
}
