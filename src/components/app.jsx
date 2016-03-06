import React from 'react';
import '../style/index.less';
import firebase from '../utilities/firebase';
import history from '../utilities/history';
import { connect } from 'react-redux';
import ToolBar from './toolbar';

class App extends React.Component {

  componentDidMount() {
    if(!this.props.root.auth){
      history.push('/login');
    }else {
      history.push('/');
    }
  }

  render() {
    return (
      <div className="container">
          <ToolBar auth={this.props.root.auth} dispatch={this.props.dispatch}/>
          <div className="page-content">
            {this.props.children}
          </div>
      </div>
    )
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
