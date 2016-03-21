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
import PrintIcon from 'material-ui/lib/svg-icons/action/print';
import moment from 'moment';

const style = {
  marginLeft: 20,
};

class Summary extends React.Component {
  render() {
    var report = _.find(this.props.list.items, report => {
      return report._id == this.props.params.id
    });
    let totalCorrect = this.calculateCorrect(report);
    let totalWrong = this.calculateWrong(report);
    let totalPercentage = _.toInteger(( totalCorrect / (totalCorrect + totalWrong) ) * 100);
      return (
        <div id="pdf-container">
        <h3>Yhteenveto</h3>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Urakoitsija</td>
                <td>{report.contractor}</td>
              </tr>
              <tr>
                <td>Työnjohtaja</td>
                <td>{report.foreman}</td>
              </tr>
              <tr>
                <td>Työmaan nimi</td>
                <td>{report.sitename}</td>
              </tr>
              <tr>
                <td>Mittaaja</td>
                <td>{report.measurer}</td>
              </tr>
              <tr>
                <td>Päiväys</td>
                <td>{moment(report.date).format('DD.MM.YYYY')}</td>
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
        <div className="page-break"></div>
        <h3>Virheet</h3>
        <div>
          {this.renderReportDefects(report)}
        </div>
        <div className="footer">
          <RaisedButton label="Takaisin" onClick={ (e) => {history.push('/'); return false;} } />
          <RaisedButton label="Tulosta PDF" onClick={ window.print } icon={<PrintIcon/>} />
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
            <div className="left">
              <div className="title">
                {category.id}.{category.title}
              </div>
              <div className="image" style={style}>
                <img id="image" ref="preview" src={defect.image} alt="Kuva"/>
              </div>
            </div>
            <div className="right">
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
