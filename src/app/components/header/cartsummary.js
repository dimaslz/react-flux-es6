'use strict';

import React from 'react';
import { Link } from 'react-router-component';
import AppStore from '../../store/store';
import StoreWatchMixin from '../../mixins/storewatchmixin';

let cartTotals = () => {
  return AppStore.getCartTotals();
};

class CartSummary extends React.Component {
  render() {
    return (
      <div>
        <Link href="/cart">
          Cart Items: {this.props.qty} / ${this.props.total}
        </Link>
      </div>
    );
  }
};

export default StoreWatchMixin(CartSummary, cartTotals);
