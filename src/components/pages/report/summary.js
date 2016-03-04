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
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import moment from 'moment';

const style = {
  marginLeft: 20,
}
function dateFormatter(date) {
  return moment(date).format('DD.MM.YYYY');
}

class Summary extends React.Component {
  render() {
    var report = _.find(this.props.list.items, report => {
      return report._id == this.props.params.id
    });
    let totalCorrect = this.calculateCorrect(report);
    let totalWrong = this.calculateWrong(report);
    let totalPercentage = _.toInteger(( totalCorrect / (totalCorrect + totalWrong) ) * 100);    return (
      <div>
        <h3>Yhteenveto</h3>
          <Paper zDepth={2}>
            <TextField disabled={true} value={report.info.contractor} style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField disabled={true} value={report.info.foreman} style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField disabled={true} value={report.info.sitename} style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <TextField disabled={true} value={report.info.measurer} style={style} underlineShow={false} onChange={this.handleChange} />
            <Divider />
            <DatePicker disabled={true} value={report.info.date} style={style} autoOk={true} formatDate={dateFormatter} onChange={this.handleChange} />
            <Divider />
          </Paper>
          <div className="categories">
            {report.categories.map( (category, index) => {
              return (
                <div key={index}>
                  <div className="category-section">
                    <span className="category-title">
                      {category.title}
                    </span>
                    <span className="category-functions">
                      <span>Oikein: {category.correct} </span>
                      <span>Väärin: {category.defects ? category.defects.length : 0}</span>

                    </span>
                  </div>
                   <hr/>
                </div>
              )
            })}
            <div className="categories-total">
              <span>Oikein: {totalCorrect}</span>
              <span>Väärin: {totalWrong}</span>
              <span>Oikein %: {totalPercentage}</span>
            </div>

          </div>


        <hr />
        <h3>Virheet</h3>
        <div>
          {this.renderReportDefects(report)}
        </div>

        <RaisedButton label="Takaisin" onMouseDown={ () => history.push('/') } onTouchEnd={ () => history.push('/') } />
      </div>
    )
  }

  renderReportDefects(report) {
    return report.categories.map( (category) => {
      var defects = category.defects || [];
      return defects.map( (defect, index) => {
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
    })
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
