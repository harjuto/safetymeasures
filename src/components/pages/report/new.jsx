import React from 'react';
import ReportCategory from './category';
import moment from 'moment';
import { submitReport, reportDataChanged } from '../../../actions/report';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';
import Percentage from '../../uiwidgets/percentage';
import {parseNameFromEmailString} from '../../../utilities/helpers';

const style = {
  marginLeft: 20
};

function dateFormatter(date) {
  return moment(date).format('DD.MM.YYYY');
}
class Report extends React.Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if(!this.props.report.date) {
      this.props.dispatch(reportDataChanged({
        'date': moment().format('YYYY-MM-DD'),
        'projectId': this.props.project._id,
        'measurer': parseNameFromEmailString(this.props.loggedInUser)
      }))
    }
  }

  render() {
    let project = this.props.project || {};
    let report = this.props.report || {};
    return (
      <div>
        <div className="info">
            <div>Työmaa: {project.sitename}</div>
            <div>Urakoitsija: {project.contractor}</div>
            <div>Työnjohtaja: {project.foreman}</div>
            <div>Mittaaja: {parseNameFromEmailString(this.props.loggedInUser)}</div>
            <div>Päiväys: {report.date}</div>
        </div>
        {this.renderSections(this.props.report)}
      </div>
    )
  }

  renderSections(report) {
    let totalCorrect = this.calculateCorrect(report);
    let totalWrong = this.calculateWrong(report);
    let totalPercentage = _.toInteger(( totalCorrect / (totalCorrect + totalWrong) ) * 100);
    return (
      <div>
        <div className="categories">
          {report.categories.map( (category, index) => {
            return (
                <ReportCategory key={index} category={category} dispatch={this.props.dispatch} />
            )
          })}
          <hr/>
        </div>
        <div className="footer">
          <RaisedButton label="Tallenna" secondary={true} onClick={ this.submit } />
          <RaisedButton label="Peruuta" primary={true} onClick={ (e) => {history.push('report/list/' + this.props.project._id);; return false;}} />
            <div className="categories-total">
              <span>Oikein: {totalCorrect}</span>
              <span>Väärin: {totalWrong}</span>
              <Percentage percentage={totalPercentage} />
            </div>
        </div>
    </div>
    )
  }

  handleChange(e) {
    this.props.dispatch(reportDataChanged({
      [e.target.id]: e.target.value
    }))
  }

  calculateCorrect(report) {
    let correct = 0;
    report.categories.forEach( (category) => {
      correct += category.correct;
    });
    return correct;
  }

  calculateWrong(report) {
    let wrong = 0;
    report.categories.forEach( (category) => {
      wrong += category.defects ? category.defects.length : 0;
    });
    return wrong;
  }

  submit(e) {
    var data = this.props.report;
    this.props.dispatch(submitReport(data, this.props.project._id));
    return false;
  }
}



function mapStateToProps(state){
  return {
    report: state.reportReducer,
    project: state.projectReducer.selectedProject,
    loggedInUser: state.rootReducer.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Report);
