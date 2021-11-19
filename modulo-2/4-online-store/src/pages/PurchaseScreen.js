import React from 'react';
import { Redirect } from 'react-router-dom';

import PurchaseForm from '../components/PurchaseForm';
import PurchaseScreenItem from '../components/PurchaseScreenItem';
import HomeIcon from '../components/HomeIcon';

import {
  getItemFromLocalStorage,
  getItemsFromLocalStorage,
} from '../utils/localStorageHelpers';

class PurchaseScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      totalPrice: 0,
      name: '',
      email: '',
      cpf: '',
      phone: '',
      postalCode: '',
      adress: '',
      purchaseFinished: false,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    const items = getItemsFromLocalStorage('cartItems');
    const totalPrice = getItemFromLocalStorage('totalPrice');

    this.setState({
      items,
      totalPrice,
    });
  };

  handleClick = () => {
    this.setState({
      items: [],
      name: '',
      email: '',
      cpf: '',
      phone: '',
      postalCode: '',
      adress: '',
      purchaseFinished: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { items, totalPrice } = this.state;
    const { name, email, cpf, phone, postalCode, adress, purchaseFinished } = this.state;
    return (
      <>
        <HomeIcon />
        <div>
          {purchaseFinished ? <Redirect to="/" /> : null}
          {items.map((element) => (
            <PurchaseScreenItem
              key={ element.title }
              title={ element.title }
              price={ element.price }
              amount={ element.amount }
              thumbnail={ element.thumbnail }
            />
          ))}
          <p>{`Total a pagar: ${totalPrice}`}</p>
          <PurchaseForm
            name={ name }
            email={ email }
            cpf={ cpf }
            phone={ phone }
            postalCode={ postalCode }
            adress={ adress }
            onClick={ this.handleClick }
            onChange={ this.handleChange }
          />
        </div>
      </>
    );
  }
}

export default PurchaseScreen;
