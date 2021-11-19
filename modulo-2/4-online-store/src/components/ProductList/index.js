import React from 'react';
import PropTypes from 'prop-types';

import CartLink from '../CartLink';
import Product from '../Product';

import { getItemsFromLocalStorage } from '../../utils/localStorageHelpers';

import './style.css';

class ProductList extends React.Component {
  constructor() {
    super();

    this.state = {
      itemCount: 0,
    };
  }

  componentDidMount() {
    this.updateItemCount();
  }

  updateItemCount = () => {
    const items = getItemsFromLocalStorage('cartItems');

    const itemCount = items.reduce((acc, { amount }) => acc + amount, 0);

    this.setState({ itemCount });
  };

  render() {
    const { itemCount } = this.state;
    const { productList, history } = this.props;

    if (!productList.length) {
      return (
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <CartLink itemCount={ itemCount } />
        </div>
      );
    }

    return (
      <div>
        <CartLink itemCount={ itemCount } />
        <div className="products">
          {productList.map((product) => (
            <Product
              key={ product.id }
              history={ history }
              product={ product }
              updateItemCount={ this.updateItemCount }
            />
          ))}
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductList;
