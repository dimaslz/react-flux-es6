"use strict";

import React from "react";
import AppStore from "../../store/store";
import CatalogItem from "./catalogitem";

let getCatalog = () => {
  return { items: AppStore.getCatalog() }
};

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = getCatalog();
  }
  render() {
    let items = this.state.items.map(item => {
      return <CatalogItem key={item.id} item={item} />
    });

    return (
      <div className>
          { items }
      </div>
    )
  }
}

export default Catalog;
