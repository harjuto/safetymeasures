import React from 'react';
import {Link} from 'react-router';
import { correctPressed } from '../../../actions/report';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import IconDone from 'material-ui/lib/svg-icons/action/done';
import IconError from 'material-ui/lib/svg-icons/alert/error';
import history from '../../../utilities/history';
import Badge from 'material-ui/lib/badge';
import FlatButton from 'material-ui/lib/flat-button';

export default class ReportSection extends React.Component {

  constructor() {
    super();
    this.correctClicked = this.correctClicked.bind(this);
  }

  render() {
    var category = this.props.category;
    return (
      <div className="category-section">
        <span className="category-title">
          {category.title}
        </span>
        <span className="category-functions">
          <FlatButton
          label="Oikein"
          linkButton={false}
          secondary={true}
          icon={<span>{category.correct}</span>}
          onMouseDown={ () => this.correctClicked(category) }
          onTouchEnd={() => this.correctClicked(category) }
          />
          <FlatButton
          label="Väärin"
          linkButton={false}
          primary={true}
          icon={<span>{category.defects.length}</span>}
          onMouseDown={ () => history.push("/report/new/defect/" + category.id ) }
          onTouchEnd={() => history.push("/report/new/defect/" + category.id ) }
          />
        </span>
      </div>
    )
  }
  correctClicked(category) {
    this.props.dispatch(correctPressed(category))
  }
}
