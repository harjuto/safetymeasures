import React from 'react';
import {Link} from 'react-router';
import { correctPressed } from '../../../actions/report';


export default class ReportSection extends React.Component {

  constructor() {
    super();
    this.correctClicked = this.correctClicked.bind(this);
  }

  render() {
    var category = this.props.category;
    return (
      <div>
        <h3>{category.title}</h3>
        <button onClick={() => this.correctClicked(category)}>{category.correct} Oikein</button>
        <button>
          {category.defects.length}
          <Link to={"/report/new/defect/" + category.id }> Väärin </Link>
        </button>
      </div>
    )
  }

  correctClicked(category) {
    this.props.dispatch(correctPressed(category))
  }
}
