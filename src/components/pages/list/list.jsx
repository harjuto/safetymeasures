import React from 'react';
import Fixtures from '../../../fixtures';
import moment from 'moment';
import ListItem from './listitem';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import {listMeasurements} from '../../../actions/measurement';

class List extends React.Component {

  componentDidMount() {
    this.props.dispatch(listMeasurements())
  }

  constructor() {
    super();
    this.showSummary = this.showSummary.bind(this);
  }

  render() {
    return (
      <div id="list">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Päiväys</TableHeaderColumn>
              <TableHeaderColumn>Oikein</TableHeaderColumn>
              <TableHeaderColumn>Väärin</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderRows()}
          </TableBody>
        </Table>

        <hr/>
        <RaisedButton label="Uusi raportti" secondary={true} onMouseDown={ () => history.push('report/new') } onTouchEnd={ () => history.push('report/new') } />
      </div>
    )
  }


  renderRows() {
    return this.props.list.items.map( (entry, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{moment(entry.createdAt).format('DD.MM.YYYY')}</TableRowColumn>
          <TableRowColumn>{this.calculateCorrect(entry)}</TableRowColumn>
          <TableRowColumn>{this.calculateWrong(entry)}</TableRowColumn>
          <TableRowColumn><span className="button-icon chart-button" onClick={this.showSummary.bind(this,entry._id)}></span></TableRowColumn>
        </TableRow>
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
console.info(state)
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
