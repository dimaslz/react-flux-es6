'use strict';

import React from 'react';
import CartSummary from './cartsummary';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div><h1>Lest SHop</h1></div>
        <br/>
        <CartSummary/>
      </div>
    );
  }
};

export default Header;
