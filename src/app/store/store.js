import AppDispatcher from "../dispatchers/dispatchers"
import AppConstants from "../constants/constants"
import assign from "react/lib/Object.assign"
import { EventEmitter } from "events"

const CHANGE_EVENT = 'change';

let _catalog = [];

for(let i=1; i<9; i++) {
  _catalog.push({
    'id': 'Widget' + i,
    'title': 'Widget #' + i,
    'summary': 'This is an awesome widget!',
    'description': 'Lorem ipsum dolor sit emet consectetur adipisicing elit. Ducimus, commodi.',
    'cost': i,
    'img': 'http://lorempixel.com/100/100/'
  });
}

let _cartItems = [];

let _removeItem = (index) => {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
};

let _increaseItem = (index) => {
  _cartItems[index].qty++
};

let _decreaseItem = (index) => {
  if(_cartItems[index].qty > 1){
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
};

let _addItem = (item) => {
  if(!item.inCart) {
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach((cartItem, i) => {
      if(cartItem.id === item.id) {
      _increaseItem(i);
    }
    })
  }
};

var _cartTotals = () => {
  let qty = 0, total = 0;
  _cartItems.forEach((cartItem) => {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });

  return { 'qty': qty, 'total': total };
};

let AppStore = assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  getCart() {
    return _cartItems
  },
  getCatalog() {
    return _catalog
  },
  getCartTotals() {
    return _cartTotals()
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    "use strict";

    let action = payload.action;
    switch(action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
