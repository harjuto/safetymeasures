import React from 'react';
import UndoIcon from 'material-ui/lib/svg-icons/content/undo';


export default class ButtonGroup extends React.Component {
  render() {
    const {label, typeClass, undoAction, action, value} = this.props

    return (
      <div className={"action-button-group"} >
        <div className="addon" onClick={undoAction}>
          <span><UndoIcon /></span>
        </div>
        <div className={"button " + typeClass} onClick={action}>
          <span className="value">{value}</span>
          <span>{label}</span>
        </div>
      </div>
    )
  }
}
