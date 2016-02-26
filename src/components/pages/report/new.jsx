import React from 'react';
import {Link} from 'react-router';
import ReportCategory from './category';
import moment from 'moment';
import { submitReport } from '../../../actions/report';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';

class Report extends React.Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <h2> {moment().format('DD.MM.YYYY')} </h2>
        {this.renderSections(this.props.report)}

      </div>
    )
  }

  renderSections(report) {
    return (
      <div>
        <ReportCategory category={report.category1} dispatch={this.props.dispatch} />
        <hr/>
        <ReportCategory category={report.category2} dispatch={this.props.dispatch} />
        <hr/>
        <ReportCategory category={report.category3} dispatch={this.props.dispatch} />
        <hr/>
        <RaisedButton label="Tallenna" secondary={true} onMouseDown={ this.submit } onTouchEnd={ this.submit } />
        <RaisedButton label="Peruuta" primary={true} onMouseDown={ () => history.push('/') } onTouchEnd={ () => history.push('/') } />

    </div>
    )
  }
  // <button className='button' onClick={this.submit}>Tallenna</button>
  // <button className='button' onClick={this.submit}>Keskeytä</button>
  // <button className='button'>
  //   <Link className='button' to="/"> Peruuta </Link>
  // </button>
  submit() {
    this.props.dispatch(submitReport(this.props.report))
    history.push('/');
  }
}



function mapStateToProps(state){
  return {
    report: state.reportReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Report);
