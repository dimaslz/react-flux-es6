"use strict";

import React from "react";
import AppActions from "../../actions/actions";

class IncreaseItem extends React.Component {
  handler() {
    AppActions.increaseItem(this.props.index)
  }
  render() {
    return <button onClick={this.handler.bind(this)}>+</button>;
  }
}

export default IncreaseItem;
