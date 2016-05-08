import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import ExitAppButton from 'material-ui/lib/svg-icons/action/exit-to-app';

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
      <div className="toolbar">
        <div className="auth">
          {auth.password.email}
        </div>
        <div className="logout-button" onClick={this.logout}>
          <a>Kirjaudu ulos</a>
        </div>
      </div>
    )
  }

  logout() {
    this.props.dispatch(logout());
  }
}
