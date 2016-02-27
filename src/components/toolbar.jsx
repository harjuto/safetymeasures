import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';
import {logout} from '../actions/login';

export default class ToolBar extends React.Component {

  constructor() {
    super()
    this.logout = this.logout.bind(this);
  }

  render() {
    const auth = this.props.auth;
    if(!auth) {
      return null
    }
    return (
      <Toolbar>
        <ToolbarGroup float="right">
          <ToolbarTitle text={auth.password.email} />
          <ToolbarSeparator />
          <FlatButton label="Logout" onTouchEnd={this.logout} onMouseDown={this.logout}/>
        </ToolbarGroup>
      </Toolbar>
    )
  }

  logout() {
    this.props.dispatch(logout());
  }
}
