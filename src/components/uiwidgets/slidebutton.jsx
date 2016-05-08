import React from 'react';
import moment from 'moment';

const HOLD_THRESHOLD = 300;
const SLIDE_DISTANCE = 50;

export default class SlideButton extends React.Component {

  constructor() {
    super();
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchUp = this.onTouchUp.bind(this);

    this.initialState = {
      touchDown: false,
      sliding: false,
      originX: 0,
      deltaX: 0,
      indicatorEffectClass: ''
    }
    this.state = this.initialState;
  }

  render() {
    const { slideElement } = this.props;
    let style = {
      right: this.state.deltaX,
    }
    var slidingClass = this.state.sliding ? ' user-slide' : ' return-slide';
    return (
      <span style={style} className={"slide-container " + this.state.indicatorEffectClass + slidingClass}
        onMouseDown={this.onTouchDown}
        onTouchDown={this.onTouchDown}
        onMouseUp={this.onTouchUp}
        onTouchUp={this.onTouchUp}
        onMouseLeave={this.onTouchUp}>
        { this.props.children }
      </span>
    )
  }

  onTouchDown(event) {
    this.setState({
      touchDown: true,
    });
    setTimeout( () => {
      if(this.state.touchDown) {
        this.props.onSlideAction();
      }
    }, HOLD_THRESHOLD)

  }

  onTouchUp(event) {
    this.setState(this.initialState);
  }

}
