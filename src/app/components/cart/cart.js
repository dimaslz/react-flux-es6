import React from "react";
import AppStore from "../../store/store";
import RemoveFromCart from "./removefromcart";
import Increase from "./increaseitem";
import Decrease from "./decreaseitem";
import { Link } from 'react-router-component';
import StoreWatchMixin from "../../mixins/storewatchmixin";

let cartItems = () => {
  return { items: AppStore.getCart() };
};

class Cart extends React.Component {
  constructor(state) {
    super(state);
    this.state = state;
  }
  render() {
    let total = 0;
    let items = this.props.items.map((item, i) => {
      let subtotal = item.cost * item.qty;
      total += subtotal;

      return (
        <tr key={i}>
          <td><RemoveFromCart index={i}/></td>
          <td>{ item.title }</td>
          <td>{ item.qty }</td>
          <td>
            <Increase index={i}/>
            <Decrease index={i}/>
          </td>
          <td>${subtotal}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className>
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th></th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
          { items }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td>${total}</td>
            </tr>
          </tfoot>
        </table>
        <Link href="/">Continue Shopping</Link>
      </div>
    )
  }
}

export default StoreWatchMixin(Cart, cartItems);
