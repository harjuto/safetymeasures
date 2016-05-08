import React from 'react';
import {listProjects, selectProject} from '../../../actions/project';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import history from '../../../utilities/history';
import Paper from 'material-ui/lib/paper';

class ProjectList extends React.Component {

  componentDidMount() {
    this.props.dispatch(listProjects())
  }

  render() {
    return (
      <div>
        <h3>Projektit</h3>
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
        <Paper key={index} zDepth={1} onClick={ () => this.props.dispatch(selectProject(project))}>
          <div className="details">
            <div className="detail">
              <div>Projekti:</div>
              {project.sitename}
            </div>
            <div className="detail">
              <div>Urakoitsija:</div>
              {project.contractor}
            </div>
            <div className="detail">
              <div>Työnjohtaja:</div>
              {project.foreman}
            </div>
          </div>

        </Paper>
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
