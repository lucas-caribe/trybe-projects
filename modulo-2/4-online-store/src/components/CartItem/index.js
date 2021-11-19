import React from 'react';
import PropTypes from 'prop-types';

import { ImCross } from 'react-icons/im';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import './style.css';

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.amount,
    };
  }

  getNewQuantity = (state, action) => {
    switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
    }
  };

  handleClick = ({ target }) => {
    const { availableQuantity, updateItemAmount, id } = this.props;
    const { quantity } = this.state;
    const {
      dataset: { action },
    } = target;

    const newQuantity = this.getNewQuantity(quantity, action);

    if (newQuantity > 0 && newQuantity <= availableQuantity) {
      this.setState({ quantity: newQuantity });

      updateItemAmount(newQuantity, id);
    }
  };

  render() {
    const { id, title, price, thumbnail, removeItemFromCart } = this.props;
    const { quantity } = this.state;
    return (
      <div className="cart-item">
        <button
          className="remove-item"
          type="button"
          onClick={ () => removeItemFromCart(id, quantity) }
        >
          <ImCross />
        </button>
        <img className="item-image" src={ thumbnail } alt={ title } />
        <p className="item-title" data-testid="shopping-cart-product-name">{title}</p>
        <div className="quantity-container">
          <button
            type="button"
            data-action="decrement"
            onClick={ this.handleClick }
            data-testid="product-decrease-quantity"
          >
            <AiOutlineMinus />
          </button>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            type="button"
            data-action="increment"
            onClick={ this.handleClick }
            data-testid="product-increase-quantity"
          >
            <AiOutlinePlus />
          </button>
        </div>
        <p className="item-price">
          R$
          {' '}
          {price}
        </p>
      </div>
    );
  }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  updateItemAmount: PropTypes.func.isRequired,
};

export default CartItem;
