import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem } from "reactstrap";
import CartSummary from "../cart/CartSummary";

export default class Navi extends Component {
  render() {
    return (
      <div className="mb-2">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Northwind Shopping App</NavbarBrand>
          <NavbarToggler />
          <Nav className="ml-auto" navbar>
            <NavItem className="mt-2">
              <NavLink to="saveproduct">New Product</NavLink>
            </NavItem>

            <CartSummary></CartSummary>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
