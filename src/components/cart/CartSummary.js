import React, { Component } from "react";
import { Badge, DropdownItem, NavItem, NavLink} from "reactstrap";
import { DropdownButton} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs"

class CartSummary extends Component {
  removeFromCart(product){
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " Removed from cart.",3)
  }
  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <DropdownButton id="dropdown-item-button" title="Cart">
        {
          this.props.cart.map(cartItem=>(
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger" onClick={()=>this.removeFromCart(cartItem.product)}>X</Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))
        }
        <DropdownItem divider></DropdownItem>
        <DropdownItem><Link to="/cart">Go to Cart</Link></DropdownItem>
      </DropdownButton>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions:{
      removeFromCart:bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);
