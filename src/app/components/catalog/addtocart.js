"use strict";

import React from "react";
import AppActions from "../../actions/actions";

class AddToCart extends React.Component {
  handler() {
    AppActions.addItem(this.props.item);
  }
  render() {
    return <button onClick={this.handler.bind(this)}>Add to cart</button>
  }
}

export default AddToCart;
