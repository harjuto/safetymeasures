import React from 'react';
import {Link} from 'react-router';
import { incrementCorrect, decrementCorrect, removeDefect } from '../../../actions/report';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import history from '../../../utilities/history';
import Badge from 'material-ui/lib/badge';
import RaisedButton from 'material-ui/lib/raised-button';
import ButtonGroup from '../../uiwidgets/buttongroup';


export default class ReportSection extends React.Component {

  constructor(props) {
    super(props);
    this.incrementCorrect = this.incrementCorrect.bind(this);
    this.decrementCorrect = this.decrementCorrect.bind(this);
    this.removeDefect = this.removeDefect.bind(this, props.category.id)
  }

  render() {
    var category = this.props.category;
    return (
      <div className="category-section">
        <div className="category-title">
          {category.title}
        </div>
        <div className="category-functions">
          <div className="function decrement">
            <ButtonGroup label="Väärin" typeClass="defect" action={(e) => {history.push("/report/new/defect/" + category.id ); return false; }} undoAction={this.removeDefect} value={this.props.category.defects.length}/>
          </div>
          <div className="function increment">
            <ButtonGroup label="Oikein" typeClass="correct" action={this.incrementCorrect} undoAction={this.decrementCorrect} value={this.props.category.correct} />
          </div>
        </div>
      </div>
    )
  }

  incrementCorrect(e) {
    this.props.dispatch(incrementCorrect(this.props.category));
    return false;
  }

  decrementCorrect(e) {
    this.props.dispatch(decrementCorrect(this.props.category));
    return false;
  }

  removeDefect(id) {
    this.props.dispatch(removeDefect(id))
    return false;
  }
}
