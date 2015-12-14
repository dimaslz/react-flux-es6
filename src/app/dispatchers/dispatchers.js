import { Dispatcher } from "flux"
// const Dispatcher = require("flux").Dispatcher;
import assign from "react/lib/Object.assign"

export default assign(new Dispatcher(), {
  handleViewAction: function(action) {
    console.log('action', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }
})
