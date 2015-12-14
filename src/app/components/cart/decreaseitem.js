"use strict";

import React from "react";
import AppActions from "../../actions/actions";

class DecreaseItem extends React.Component {
  handler() {
    AppActions.decreaseItem(this.props.index)
  }
  render() {
    return <button onClick={this.handler.bind(this)}>-</button>;
  }
}

export default DecreaseItem;
