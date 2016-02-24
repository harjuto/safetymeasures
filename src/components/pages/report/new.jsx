import React from 'react';
import {Link} from 'react-router';
import ReportCategory from './category';
import moment from 'moment';
import { submitReport } from '../../../actions/report';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';

class Report extends React.Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <h2> date </h2>
        {this.renderSections(this.props.report)}
        <button onClick={this.submit}>Tallenna</button>
        <Link to="/"> Back </Link>
      </div>
    )
  }

  renderSections(report) {
    return (
      <div>
        <ReportCategory category={report.category1} dispatch={this.props.dispatch} />
        <ReportCategory category={report.category2} dispatch={this.props.dispatch} />
        <ReportCategory category={report.category3} dispatch={this.props.dispatch} />
      </div>
    )
  }

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
