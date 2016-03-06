import React from 'react';
import {Link} from 'react-router';
import ReportCategory from './category';
import moment from 'moment';
import { submitReport, reportDataChanged } from '../../../actions/report';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Percentage from '../../uiwidgets/percentage';

const style = {
  marginLeft: 20,
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
    this.props.dispatch(reportDataChanged({
      'date': moment().format('YYYY-DD-MM')
    }))  }

  render() {
    return (
      <div>
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
        <div className="info">
          <Paper zDepth={2}>
            <TextField id="contractor" value={report.info.contractor}  hintText="Urakoitsija" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="foreman" value={report.info.foreman} hintText="Työnjohtaja" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="sitename" value={report.info.sitename}  hintText="Työmaan nimi" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField id="measurer" value={report.info.measurer} hintText="Mittaaja" style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <input id="date" type="date" value={report.info.date} placeholder="Päiväys" onChange={this.handleChange} />
            <Divider />
          </Paper>
        </div>
        <div className="categories-total">
          <span>Oikein: {totalCorrect}</span>
          <span>Väärin: {totalWrong}</span>
          <Percentage percentage={totalPercentage} />
        </div>
        <div className="categories">
          {report.categories.map( (category, index) => {
            return (
                <ReportCategory key={index} category={category} dispatch={this.props.dispatch} />
            )
          })}
          <hr/>
        </div>
        <div className="footer">
          <RaisedButton label="Tallenna" secondary={true} onMouseUp={ this.submit } />
          <RaisedButton label="Peruuta" primary={true} onMouseUp={ (e) => {history.push('/'); return false;}} />
        </div>
    </div>
    )
  }

  handleChange(e) {
    this.props.dispatch(reportDataChanged({
      [event.target.id]: event.target.value
    }))
  }

  calculateCorrect(report) {
    let correct = 0;
    report.categories.forEach( (category) => {
      correct += category.correct;
    })
    return correct;
  }

  calculateWrong(report) {
    let wrong = 0;
    report.categories.forEach( (category) => {
      wrong += category.defects ? category.defects.length : 0;
    })
    return wrong;
  }

  submit(e) {
    var data = {
      info: this.props.report.info,
      categories: this.props.report.categories
    }
    this.props.dispatch(submitReport(data))
    history.push('/');
    return false;
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
