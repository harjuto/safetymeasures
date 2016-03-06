import React from 'react';

const THRESHOLD = 85;

export default class Percentage extends React.Component {

  render() {
    const { percentage } = this.props;
    var style = {}
    if(percentage >= 85) {
      style.color = "green"
    } else if(percentage < 85) {
      style.color = "red";
    }
    return <span style={style}>{percentage}%</span>

  }
}
