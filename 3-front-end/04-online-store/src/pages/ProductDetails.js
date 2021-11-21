import React from 'react';
import PropTypes from 'prop-types';

import CartLink from '../components/CartLink';
import HomeIcon from '../components/HomeIcon';
import EvaluatingForm from '../components/EvaluatingForm';
import EvaluationsZone from '../components/EvaluationsZone';

import {
  getItemsFromLocalStorage,
  getItemFromLocalStorage,
  saveItemToLocalStorage,
} from '../utils/localStorageHelpers';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      product: {},
      itemCount: 0,
      evaluations: [],
    };
  }

  componentDidMount() {
    this.getProductFromLocalStorage();
    this.updateItemCount();
  }

  addEvaluation = (evaluation) => {
    const items = getItemsFromLocalStorage('evaluations');

    const newItems = [...items, evaluation];

    saveItemToLocalStorage('evaluations', newItems);

    this.setState((prevState) => ({
      evaluations: [...prevState.evaluations, evaluation],
    }));
  };

  getEvaluationsById = (id) => {
    const evaluations = getItemsFromLocalStorage('evaluations');

    const filteredEvaluations = evaluations.filter(
      (element) => element.id === id,
    );

    this.setState({
      evaluations: filteredEvaluations,
    });
  };

  updateItemCount = () => {
    const items = getItemsFromLocalStorage('cartItems');

    const itemCount = items.reduce((acc, { amount }) => acc + amount, 0);

    this.setState({ itemCount });
  };

  getProductFromLocalStorage = () => {
    const savedProduct = getItemFromLocalStorage('productDetails');

    this.getEvaluationsById(savedProduct.id);

    this.setState({ loading: false, product: savedProduct });
  };

  handleClick = () => {
    const { product } = this.state;

    const items = getItemsFromLocalStorage('cartItems');

    if (!items.some((item) => item.id === product.id)) {
      const newItems = [...items, { ...product, amount: 1 }];

      saveItemToLocalStorage('cartItems', newItems);
      this.updateItemCount();
    }
  };

  render() {
    const { loading, product, itemCount, evaluations } = this.state;

    if (loading) {
      return <p>Loading</p>;
    }

    return (
      <>
        <HomeIcon />
        <CartLink itemCount={ itemCount } />
        <div className="product-details">
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <p className="product-price">
            R$
            {' '}
            {product.price}
          </p>
          <div className="product-main-info">
            <img src={ product.thumbnail } alt={ product.title } />
            <div className="product-attributes">
              <h1>Especificações técnicas</h1>
              {product.attributes.map((attribute) => (
                <p key={ attribute.name }>
                  {`${attribute.name}: `}
                  <span>{attribute.value_name}</span>
                </p>
              ))}
            </div>
          </div>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.handleClick }
          >
            ADICIONAR AO CARRINHO
          </button>
          <EvaluatingForm id={ product.id } addEvaluation={ this.addEvaluation } />
          <EvaluationsZone evaluations={ evaluations } />
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetails;
