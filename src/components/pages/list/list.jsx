import React from 'react';
import Fixtures from '../../../fixtures';
import moment from 'moment';
import ListItem from './listitem';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import _ from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';
import {listMeasurements} from '../../../actions/measurement';
import Percentage from '../../uiwidgets/percentage';
import CircularProgress from 'material-ui/lib/circular-progress';

class List extends React.Component {

  componentDidMount() {
    this.props.dispatch(listMeasurements())
  }

  constructor() {
    super();
    this.showSummary = this.showSummary.bind(this);
  }

  render() {
    let Spinner = null
    if(this.props.list.loading) {
      Spinner = <CircularProgress />

    }
    return (
      <div id="list">
        {Spinner}
        <table>
          <thead>
            <tr>
              <th>Päiväys</th>
              <th>Oikein</th>
              <th>Väärin</th>
              <th>Oikein %</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr/>
        <div className="footer">
          <RaisedButton label="Uusi raportti" secondary={true} onClick={ (e) => {history.push('report/new'); return false;} } />
        </div>
      </div>
    )
  }


  renderRows() {
    return this.props.list.items.map( (entry, index) => {
      let totalCorrect = this.calculateCorrect(entry)
      let totalWrong = this.calculateWrong(entry)
      let totalPercentage = _.toInteger(( totalCorrect / (totalCorrect + totalWrong) ) * 100);
      return (
        <tr key={index} onClick={this.showSummary.bind(this,entry._id)}>
          <td>{moment(entry.info.date).format('DD.MM.YYYY')}</td>
          <td>{totalCorrect}</td>
          <td>{totalWrong}</td>
          <td><Percentage percentage={totalPercentage}/></td>
        </tr>
      )

    })
  }
  calculateWrong(entry) {
    let wrong = 0;
    entry.categories.forEach( (category) => {
      wrong += category.defects ? category.defects.length : 0;
    })
    return wrong;
  }

  calculateCorrect(entry) {
    let correct = 0;
    entry.categories.forEach( (category) => {
      correct += category.correct;
    })
    return correct;
  }

  showSummary(id) {
    history.push('report/summary/' + id);
  }


}


function mapStateToProps(state){
  return {
    list: state.listReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
