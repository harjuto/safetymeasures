import React from 'react';



export default class ListItem extends React.Component {

  render() {
    var data = this.props.data;
    return (
      <div className="list-item" style={style}>{data}</div>
    )
  }

}

const style = {
  flex: 1
};