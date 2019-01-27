import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import { connect } from 'react-redux';

import {projectDataChanged, submitProject} from '../../../actions/project';

const style = {
  marginLeft: 20
};

class CreateProject extends React.Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let project = this.props.state || {};
    return (
      <div>
        <div className="info">
          <Paper zDepth={2}>
            <TextField id="sitename" value={project.sitename}  hintText="Työmaan nimi" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="contractor" value={project.contractor}  hintText="Urakoitsija" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="foreman" value={project.foreman} hintText="Työnjohtaja" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
          </Paper>
        </div>

        <div className="footer">
          <RaisedButton label="Tallenna" secondary={true} onClick={ this.submit } />
          <RaisedButton label="Peruuta" primary={true} onClick={ (e) => {history.push('/'); return false;}} />
        </div>
      </div>
    )
  }

  handleChange(e) {
    this.props.dispatch(projectDataChanged({
      [e.target.id]: e.target.value
    }))
  }

  submit(e) {
    var data = this.props.state;
    this.props.dispatch(submitProject(data));
    return false;
  }
}


function mapStateToProps(state){
  return {
    state: state.projectReducer.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
