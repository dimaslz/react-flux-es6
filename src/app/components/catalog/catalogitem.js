'use strict';

import React from 'react';
import AddToCart from "./addtocart";
import { Link } from 'react-router-component';

class CatalogItem extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.item.title}</h4>
        <img src={this.props.item.img} alt="" />
        <p>{this.props.item.summary}</p>
        <p>${this.props.item.cost} <span className="text-success">{this.props.item.inCart && '(' + this.props.item.qty + ' in cart)'}</span></p>
        <div className="btn-group btn-group-xs">
          <Link href={'/item/' + this.props.item.id} className="btn btn-default">Learn More</Link>
          <AddToCart item={this.props.item} />
        </div>
      </div>
    );
  }
};

export default CatalogItem;
