"use strict";

import React from "react";
import Catalog from "../components/catalog/catalog";
import Cart from "../components/cart/cart";
import Router from "react-router-component";
import CatalogDetail from "./product/catalogdetail";
import Template from "./template";

const Locations = Router.Locations;
const Location = Router.Location;

class App extends React.Component {
  render() {
    return (
      <Template>
        <Locations>
          <Location path="/" handler={Catalog} />
          <Location path="/cart" handler={Cart} />
          <Location path="/item/:item" handler={CatalogDetail} />
        </Locations>
      </Template>
    );
  }
}

export default App;
