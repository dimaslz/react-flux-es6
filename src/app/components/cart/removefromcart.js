"use strict";

import React from "react";
import AppActions from "../../actions/actions";

class RemoveFromCart extends React.Component {
  handler() {
    AppActions.removeItem(this.props.index)
  }
  render() {
    return <button onClick={this.handler}>+</button>;
  }
}

export default RemoveFromCart;
