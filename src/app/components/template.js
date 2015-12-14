'use strict';

import React from 'react';
import Header from './header/header';

class Template extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
};

export default Template;
