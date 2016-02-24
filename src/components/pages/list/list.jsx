import React from 'react';
import Fixtures from '../../../fixtures';
import moment from 'moment';
import ListItem from './listitem';
import {Link} from 'react-router';
import '../../../style/list.less';
import { connect } from 'react-redux';
import history from '../../../utilities/history';


class List extends React.Component {

  constructor() {
    super();
    this.showSummary = this.showSummary.bind(this);
  }

  render() {
    console.info(this.props)
    return (
      <div id="list">
        <div className="header">
            <div>Date</div>
            <div>Correct</div>
            <div>Wrong</div>
        </div>
        {this.renderRows()}
        <Link to='report/new'>Luo uusi raportti</Link>
      </div>
    )
  }


  renderRows() {
    return this.props.list.items.map( (entry, index) => {
      return (
        <div className="row" key={index} onClick={ this.showSummary.bind(this, entry._id) }>
          <ListItem data={moment(entry.createdAt).format('DD.MM.YYYY')} />
          <ListItem data={this.calculateCorrect(entry)} />
          <ListItem data={this.calculateWrong(entry)} />
        </div>
      )
    })
  }
  showSummary(id) {
    history.push('report/summary/' + id);
  }

  calculateWrong(entry) {
    let wrong = 0;
    wrong += entry.category1.defects.length
    wrong += entry.category2.defects.length
    wrong += entry.category3.defects.length
    return wrong;
  }

  calculateCorrect(entry) {
    let correct = 0;
    correct += entry.category1.correct
    correct += entry.category2.correct
    correct += entry.category3.correct
    return correct;
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
