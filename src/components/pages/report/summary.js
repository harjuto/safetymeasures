import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import history from '../../../utilities/history';

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
          <h3>{report.category1.id}. {report.category1.title}</h3>
          {this.renderCategoryDefects(report.category1)}
        </div>
        <div>
          <h3>{report.category2.id}. {report.category2.title}</h3>
          {this.renderCategoryDefects(report.category2)}
        </div>
        <div>
          <h3>{report.category3.id}. {report.category3.title}</h3>
          {this.renderCategoryDefects(report.category3)}
        </div>

        <button onClick={() => history.push('/')}>Takaisin</button>
      </div>
    )
  }

  renderCategoryDefects(category) {
    return category.defects.map( (defect, index) => {
      return (
        <div key={index}>
          <img id="image" ref="preview" src={defect.image} alt="Kuva"/>
          <div>Virhe: {defect.defect}</div>
          <div>Vastuullinen: {defect.responsible}</div>
          <div>Muuta: {defect.misc}</div>
        </div>
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
