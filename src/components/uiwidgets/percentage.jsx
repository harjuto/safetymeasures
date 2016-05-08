import React from 'react';

const THRESHOLD = 85;

export default class Percentage extends React.Component {

  render() {
    const { percentage } = this.props;
    let hue = this.getColorHue(percentage / 100);
    var barstyle = {};
    barstyle.width = percentage + "%";
    barstyle.backgroundColor = ["hsl(",hue,",70%,50%)"].join("");
    var basestyle = {};
    basestyle.backgroundColor = ["hsl(",hue,",70%,40%)"].join("");
    return (
      <div className="score">
        <div className="graph-container">
          <div className="bar-base"  style={basestyle}>
          </div>
          <div className="bar-meter" style={barstyle}>
          </div>
        </div>
        <div className="numeric" style={ {color: barstyle.backgroundColor}}>
          {percentage}%
        </div>
      </div>
    );


  }

  getColorHue(value){
    return ((value)*120).toString(10);

  }
}
