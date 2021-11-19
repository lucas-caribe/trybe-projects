import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../Input';
import Select from '../Select';
import FormButton from '../FormButton';

import { editExpense as editExpenseAction } from '../../actions';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class EditCurrencyForm extends Component {
  constructor(props) {
    super(props);

    const expense = props.expenses.find(({ id }) => id === props.idToEdit);

    this.state = {
      ...expense,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { editExpense } = this.props;

    editExpense({
      ...this.state,
    });
  }

  renderInputs() {
    const { value, description } = this.state;

    return (
      <>
        <Input
          labelText="Valor"
          placeholder="0"
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />

        <Input
          labelText="Descrição"
          placeholder="descrição"
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </>
    );
  }

  renderSelects() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <>
        <Select
          labelText="Moeda"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
          options={ currencies }
        />

        <Select
          labelText="Método de pagamento"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
          options={ paymentMethods }
        />

        <Select
          labelText="Tag"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
          options={ tags }
        />
      </>
    );
  }

  render() {
    return (
      <form className="currency-form">
        {this.renderInputs()}
        {this.renderSelects()}

        <FormButton className="edit-expense" onClick={ this.handleClick }>
          Editar despesa
        </FormButton>
      </form>
    );
  }
}

EditCurrencyForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  idToEdit: wallet.idToEdit,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCurrencyForm);
