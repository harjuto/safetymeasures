import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

const style = {
  marginBottom: '30px'
}

class Summary extends React.Component {
  render() {
    var report = _.find(this.props.list.items, report => {
      return report._id == this.props.params.id
    });
    console.info(report);
    return (
      <div>
        <h1>Yhteenveto</h1>
          <div>
            <h3>{report.category1.id}. {report.category1.title}</h3>
            <div>Oikein: {report.category1.correct}</div>
            <div>Väärin: {report.category1.defects.length}</div>
          </div>
          <div>
            <h3>{report.category2.id}. {report.category2.title}</h3>
            <div>Oikein: {report.category2.correct}</div>
            <div>Väärin: {report.category2.defects.length}</div>
          </div>
          <div>
            <h3>{report.category3.id}. {report.category3.title}</h3>
            <div>Oikein: {report.category3.correct}</div>
            <div>Väärin: {report.category3.defects.length}</div>
          </div>

        <hr />
        <h1>Virheet</h1>

        <div>
          {this.renderCategoryDefects(report.category1)}
        </div>
        <div>
          {this.renderCategoryDefects(report.category2)}
        </div>
        <div>
          {this.renderCategoryDefects(report.category3)}
        </div>
        <RaisedButton label="Takaisin" onMouseDown={ () => history.push('/') } onTouchEnd={ () => history.push('/') } />
      </div>
    )
  }

  renderCategoryDefects(category) {
    return category.defects.map( (defect, index) => {
      return (
        <Card key={index} style={style}>
          <CardHeader title={category.id + ' ' + category.title} />
          <CardMedia>
            <img id="image" ref="preview" src={defect.image} alt="Kuva"/>
          </CardMedia>
          <CardTitle title={'Vastuu: ' + defect.responsible} subtitle={defect.dateCreated} />
          <CardText>
            {defect.defect}
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
      </Card>
      )
    })
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
export default connect(mapStateToProps, mapDispatchToProps)(Summary)
