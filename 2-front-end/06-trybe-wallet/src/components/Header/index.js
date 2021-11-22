import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class Header extends Component {
  getTotalExpenses() {
    const { expenses } = this.props;

    return expenses.reduce((acc, { currency, value, exchangeRates }) => {
      const convertedValue = value * exchangeRates[currency].ask;

      return acc + convertedValue;
    }, 0);
  }

  render() {
    const { email } = this.props;

    const totalExpenses = this.getTotalExpenses();

    return (
      <header>
        <p>logo</p>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">
          {`Despesas totais: R$ ${totalExpenses.toFixed(2)}`}
        </p>
        {/* <p data-testid="header-currency-field">BRL</p> */}
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
