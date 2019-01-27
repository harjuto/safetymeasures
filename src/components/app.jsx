import React from 'react';
import '../style/index.less';
import { connect } from 'react-redux';
import ToolBar from './toolbar';
import Login from './login/loginform';

class App extends React.Component {

  render() {
    if (this.props.root.auth) {
      return (
        <div className="container">
          <ToolBar auth={this.props.root.auth} dispatch={this.props.dispatch}/>
          <div className="page-content">
            {this.props.children}
          </div>
        </div>
      )
    } else {
      return <Login />;
    }
  }
}

function mapStateToProps(state){
  return {
    root: state.rootReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
