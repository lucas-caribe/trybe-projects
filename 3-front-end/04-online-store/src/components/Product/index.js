import React from 'react';
import PropTypes from 'prop-types';

import { FaShippingFast } from 'react-icons/fa';

import {
  getItemsFromLocalStorage,
  saveItemToLocalStorage,
} from '../../utils/localStorageHelpers';

import './style.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAtCart: false,
    };
  }

  componentDidMount() {
    this.checkCart();
  }

  checkCart = () => {
    const items = getItemsFromLocalStorage('cartItems');
    const { product } = this.props;

    this.setState({
      isAtCart: items.some((item) => item.id === product.id),
    });
  };

  handleClick = () => {
    const { isAtCart } = this.state;
    const { product, updateItemCount } = this.props;

    const items = getItemsFromLocalStorage('cartItems');

    if (!isAtCart) {
      const newItems = [...items, { ...product, amount: 1 }];

      this.setState({ isAtCart: true });
      saveItemToLocalStorage('cartItems', newItems);
      updateItemCount();
    } else {
      const newItems = items.map((item) => {
        if (item.id === product.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      saveItemToLocalStorage('cartItems', newItems);
      updateItemCount();
    }
  };

  handleProductClick = () => {
    const { product, history } = this.props;

    saveItemToLocalStorage('productDetails', product);

    history.push(`/product/${product.id}`);
  };

  handleProductKeyDown = (event) => {
    const ENTER_CODE = 13;

    if (event.keyCode === ENTER_CODE) {
      this.handleProductClick();
    }
  };

  render() {
    const { isAtCart } = this.state;
    const { product } = this.props;

    const productClass = isAtCart ? 'product-card at-cart' : 'product-card';

    return (
      <div className={ productClass } data-testid="product" key={ product.id }>
        <div
          className="product-info"
          data-testid="product-detail-link"
          onClick={ this.handleProductClick }
          onKeyDown={ this.handleProductKeyDown }
          role="link"
          tabIndex={ 0 }
        >
          <div className="image-container">
            <img
              className="product-image"
              src={ product.thumbnail }
              alt={ `imagem de ${product.title}` }
            />
          </div>
          <p>{product.title}</p>
          <p>
            R$
            {' '}
            {product.price}
          </p>
        </div>
        <button
          className="cart-button"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          ADICIONAR AO CARRINHO
        </button>
        {product.freeShipping && (
          <div className="free-shipping">
            <FaShippingFast className="shipping-icon" />
            <p data-testid="free-shipping">FRETE GRÁTIS</p>
          </div>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    freeShipping: PropTypes.bool.isRequired,
  }).isRequired,
  updateItemCount: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Product;
