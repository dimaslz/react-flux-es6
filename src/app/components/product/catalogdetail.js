'use strict';
import React from 'react';
import AppStore from '../../store/store';
import AddToCart from '../catalog/addtocart';
import StoreWatchMixin from '../../mixins/storewatchmixin';
//import CatalogItem from '../catalog/catalogitem';
import { Link } from 'react-router-component';

let getCatalogItem = (component) => {
  let thisItem;
  AppStore.getCatalog().forEach(item => {
    if(item.id.toString() === component.props.item) {
      thisItem = item;
    }
  });

  return { item: thisItem };
};


class CatalogDetail extends React.Component {
  render() {
    return (
      <div>
        <h2>{ this.props.item.title }</h2>
        <img src={this.props.item.img} alt=""/>
        <p>{ this.props.item.description }</p>
        <p>${ this.props.item.cost} <span>{ this.props.item.inCart && '(' + this.props.item.qty + ' in cart)'}</span></p>
        <div>
          <AddToCart item={this.props.item} />
          <Link href="/">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  };
};

export default StoreWatchMixin(CatalogDetail, getCatalogItem);
