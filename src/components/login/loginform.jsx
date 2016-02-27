import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';

import {updateCredentials, login} from '../../actions/login';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

  constructor() {
    super();
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.login = this.login.bind(this);
  }


  render() {
    const { username, password, loginInProgress, message } = this.props.login;
    console.info('HELLO FROM LOGIN FORM')
    var buttonElement;
    if(loginInProgress) {
      buttonElement =  <CircularProgress />
    } else {
      buttonElement = <RaisedButton label="Kirjaudu" secondary={true} onMouseDown={ this.login } onTouchEnd={ this.login } />
    }
    return (
      <div className="login-page">
        <Paper zDepth={2}>
          <h3>Kirjaudu sisään</h3>
          <div className="error-message">{message.toString()}</div>
          <form className="login-form">
            <label>
              Sähköposti
              <div>
                <TextField onChange={this.updateUsername} value={username} />
              </div>
            </label>
            <br/>
            <label>
              Salasana
              <div>
                <TextField type="password" onChange={this.updatePassword} value={password} />
              </div>
            </label>
            <br/>
            {buttonElement}
          </form>
        </Paper>
      </div>
    )
  }

  updateUsername(event) {
    this.props.dispatch(updateCredentials(
      {
        username: event.target.value
      }
    ));
  }
  updatePassword(event) {
    this.props.dispatch(updateCredentials(
      {
        password: event.target.value
      }
    ));
  }

  login() {
    this.props.dispatch(login({
      username: this.props.login.username,
      password: this.props.login.password
    }));
  }


}

function mapStateToProps(state){
  return {
    login: state.loginReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
