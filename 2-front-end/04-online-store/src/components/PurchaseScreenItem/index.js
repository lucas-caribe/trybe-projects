import React from 'react';
import PropTypes from 'prop-types';

class PurchaseScreenItem extends React.Component {
  render() {
    const { amount, price, thumbnail, title } = this.props;
    return (
      <div>
        <img src={ thumbnail } alt={ title } width="50px" />
        <div>
          Nome do Produto:
          {title}
          Quantidade:
          {amount}
          Preço:
          {price}
          ============
        </div>
      </div>
    );
  }
}

PurchaseScreenItem.propTypes = {
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PurchaseScreenItem;
