import React from 'react';
import { Link } from 'react-router-dom';

import CartItem from '../components/CartItem';
import HomeIcon from '../components/HomeIcon';

import {
  getItemsFromLocalStorage,
  saveItemToLocalStorage,
} from '../utils/localStorageHelpers';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    const cartItems = getItemsFromLocalStorage('cartItems');

    this.setState({ cartItems });

    this.getTotalPrice(cartItems);
  };

  getTotalPrice = (items) => {
    const totalPrice = items.reduce(
      (acc, curr) => acc + curr.price * curr.amount,
      0,
    );

    const fixedTotalPrice = Number(totalPrice.toFixed(2));

    this.setState({ totalPrice: fixedTotalPrice });
    saveItemToLocalStorage('totalPrice', fixedTotalPrice);
  };

  removeItemFromCart = (id) => {
    const { cartItems } = this.state;

    const newItems = cartItems.filter((item) => item.id !== id);

    this.setState({ cartItems: [...newItems] });

    this.getTotalPrice(newItems);
    saveItemToLocalStorage('cartItems', newItems);
  };

  updateItemAmount = (quantity, itemId) => {
    const { cartItems } = this.state;

    const newItems = cartItems.map((item) => {
      if (item.id === itemId) return { ...item, amount: quantity };
      return item;
    });

    this.setState({ cartItems: [...newItems] });
    this.getTotalPrice(newItems);
    saveItemToLocalStorage('cartItems', newItems);
  };

  render() {
    const { cartItems, totalPrice } = this.state;

    return (
      <div className="cart-content">
        <HomeIcon />
        <div className="cart-items">
          {cartItems.length !== 0 ? (
            cartItems.map((element) => (
              <CartItem
                key={ element.id }
                id={ element.id }
                title={ element.title }
                price={ element.price }
                thumbnail={ element.thumbnail }
                amount={ element.amount }
                availableQuantity={ element.availableQuantity }
                removeItemFromCart={ this.removeItemFromCart }
                updateItemAmount={ this.updateItemAmount }
              />
            ))
          ) : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <p className="total-price">{`Total: R$ ${totalPrice}`}</p>
          <Link
            className="purchase"
            to="/purchase"
            data-testid="checkout-products"
          >
            FINALIZAR COMPRA
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
