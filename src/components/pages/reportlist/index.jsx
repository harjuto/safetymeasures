import React from 'react';
import Fixtures from '../../../fixtures';
import moment from 'moment';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';
import {listReports} from '../../../actions/project';
import Percentage from '../../uiwidgets/percentage';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';

class ReportList extends React.Component {

  componentDidMount() {
    this.props.dispatch(listReports(this.props.state.selectedProject._id))
  }

  constructor() {
    super();
    this.showSummary = this.showSummary.bind(this);
  }

  render() {
    let Spinner = null;
    if(this.props.state.loading) {
      Spinner = <CircularProgress />

    }
    return (
      <div>
        <h3>{this.props.state.selectedProject.sitename}</h3>
        <div className="report-list-container">
          {Spinner}
          {this.renderRows()}
       </div>
        <div className="footer">
          <RaisedButton label="Uusi raportti" secondary={true} onClick={ (e) => {history.push('report/new'); return false;} } />
          <RaisedButton label="Takaisin" primary={true} onClick={ (e) => {history.push('/'); return false;}} />
        </div>
      </div>
    )
  }


  renderRows() {

    return this.props.state.selectedProject.reports.map( (entry, index) => {
      let totalCorrect = this.calculateCorrect(entry);
      let totalWrong = this.calculateWrong(entry);
      let totalPercentage = _.toInteger(( totalCorrect / (totalCorrect + totalWrong) ) * 100);
      return (
        <div className="report-details" key={index} onClick={this.showSummary.bind(this,entry._id)}>
          <div className="header">
            <div className="detail top left">{moment(entry.date).format('DD.MM.YYYY')}</div>
            <div className="detail top right">{entry.measurer || 'Mittaaja' }</div>
          </div>
          <div className="body">
            <Percentage percentage={totalPercentage}/>
          </div>
        </div>
      )
    });
  }
  calculateWrong(entry) {
    let wrong = 0;
    entry.categories.forEach( (category) => {
      wrong += category.defects ? category.defects.length : 0;
    });
    return wrong;
  }

  calculateCorrect(entry) {
    let correct = 0;
    entry.categories.forEach( (category) => {
      correct += category.correct;
    });
    return correct;
  }

  showSummary(id) {
    history.push('report/summary/' + id);
  }

}

function mapStateToProps(state){
  return {
    state: state.projectReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
