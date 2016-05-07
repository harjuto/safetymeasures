import React from 'react';
import {listProjects, selectProject} from '../../../actions/project';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import history from '../../../utilities/history';

class ProjectList extends React.Component {

  componentDidMount() {
    this.props.dispatch(listProjects())
  }

  render() {
    return (
      <div>
        <div className="project-list-container">
          {this.renderProjects()}
        </div>
        <div className="footer">
          <RaisedButton label="Uusi projekti" secondary={true} onClick={ (e) => {history.push('project/new'); return false;} } />
        </div>
      </div>
    )
  }

  renderProjects() {
    return this.props.state.map( (project, index) => {
      return (
        <div key={index} onClick={ () => this.props.dispatch(selectProject(project))}>
          <span>
            Site:{project.sitename}
            Contractor: {project.contractor}
            Foreman: {project.foreman}
          </span>
        </div>
      )
    })
  }
}



function mapStateToProps(state){
  return {
    state: state.projectReducer.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
