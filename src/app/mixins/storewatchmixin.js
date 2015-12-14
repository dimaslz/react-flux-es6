import React from 'react';
import AppStore from '../store/store';

let StoreWatchMixin = (ComposedComponent, callback) => class extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = callback(this);

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    this.setState(callback(this))
  }

  render() {
    return <ComposedComponent {...this.props} {...this.state} />;
  }
};

export default StoreWatchMixin;
