import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import history from '../../../utilities/history';
import Percentage from '../../uiwidgets/percentage';
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
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Urakoitsija</td>
                <td>{report.info.contractor}</td>
              </tr>
              <tr>
                <td>Työnjohtaja</td>
                <td>{report.info.foreman}</td>
              </tr>
              <tr>
                <td>Työmaan nimi</td>
                <td>{report.info.sitename}</td>
              </tr>
              <tr>
                <td>Mittaaja</td>
                <td>{report.info.measurer}</td>
              </tr>
              <tr>
                <td>Päiväys</td>
                <td>{report.info.date}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Kategoria</th>
                <th>Oikein</th>
                <th>Väärin</th>
                <th>Oikein %</th>
              </tr>
            </thead>
            <tbody>
              {report.categories.map( (category, index) => {
                let wrong = category.defects ? category.defects.length : 0;
                let correct = category.correct;
                let categoryPercentage = _.toInteger(( correct / (correct + wrong) ) * 100);
                return (
                  <tr key={index}>
                    <td>
                      {category.title}
                    </td>
                    <td>{correct}</td>
                    <td>{wrong}</td>
                    <td><Percentage percentage={categoryPercentage}/></td>
                  </tr>
                )
              })}
              <tr className="total">
                <td>Yhteensä: </td>
                <td>{totalCorrect}</td>
                <td>{totalWrong}</td>
                <td>
                  <Percentage percentage={totalPercentage} />
                </td>
              </tr>
            </tbody>
          </table>
        <hr />
        <h3>Virheet</h3>
        <div>
          {this.renderReportDefects(report)}
        </div>
        <div className="footer">
          <RaisedButton label="Takaisin" onMouseDown={ () => history.push('/') } onTouchEnd={ () => history.push('/') } />
        </div>
      </div>
    )
  }

  renderReportDefects(report) {
    return report.categories.map( (category) => {
      var defects = category.defects || [];
      return defects.map( (defect, index) => {
        return (
          <div className="defect-preview">
            <div className="image">
              <img id="image" ref="preview" src={defect.image} alt="Kuva"/>
            </div>
            <div className="details">
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Vastuu</td>
                    <td>{defect.responsible}</td>
                  </tr>
                  <tr>
                    <td>Kuvaus</td>
                    <td>{defect.description}</td>
                  </tr>
                  <tr>
                    <td>Muuta</td>
                    <td>{defect.misc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

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
