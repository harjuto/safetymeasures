import React from 'react';
import {Link} from 'react-router';
import { correctPressed } from '../../../actions/report';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import IconDone from 'material-ui/lib/svg-icons/action/done';
import IconError from 'material-ui/lib/svg-icons/alert/error';
import history from '../../../utilities/history';
import Badge from 'material-ui/lib/badge';

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
            <Badge badgeContent={category.correct} secondary={true}>
            <FloatingActionButton secondary={true} onMouseDown={ () => this.correctClicked(category) } onTouchEnd={() => this.correctClicked(category)}>
              <IconDone />
            </FloatingActionButton>
          </Badge>
          <Badge badgeContent={category.defects.length} primary={true}>
            <FloatingActionButton onMouseDown={ () => history.push("/report/new/defect/" + category.id ) } onTouchEnd={() => history.push("/report/new/defect/" + category.id )}>
              <IconError />
            </FloatingActionButton>
          </Badge>
      </div>
    )
  }
  // <button className='button' onClick={() => this.correctClicked(category)}>{category.correct} Oikein</button>
  // <button className='button'>
  //   {category.defects.length}
  //   <Link to={"/report/new/defect/" + category.id }> Väärin </Link>
  // </button>
  correctClicked(category) {
    this.props.dispatch(correctPressed(category))
  }
}
