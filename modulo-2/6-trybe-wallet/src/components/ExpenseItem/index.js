import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/md';

import {
  removeExpense as removeExpenseAction,
  setEditor as setEditorAction,
  setIdToEdit as setIdToEditAction,
} from '../../actions';

class ExpenseItem extends Component {
  render() {
    const { expense, removeExpense, setEditor, setIdToEdit } = this.props;
    const { description, method, tag, value, currency, exchangeRates } = expense;

    const [currencyName] = exchangeRates[currency].name.split('/');
    const { ask } = exchangeRates[currency];
    const fixedAsk = Number(ask).toFixed(2);
    const convertedValue = (value * ask).toFixed(2);

    return (
      <tr>
        <td>{description}</td>
        <td>{method}</td>
        <td>{tag}</td>
        <td>{value}</td>
        <td>{currencyName}</td>
        <td>{fixedAsk}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>
          <button
            className="edit-button"
            type="button"
            data-testid="edit-btn"
            onClick={ () => {
              setEditor();
              setIdToEdit(expense.id);
            } }
          >
            <MdEdit />
          </button>
          <button
            className="delete-button"
            type="button"
            data-testid="delete-btn"
            onClick={ () => {
              window.confirm('are you sure?');
              removeExpense(expense);
            } }
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseItem.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
  removeExpense: PropTypes.func.isRequired,
  setEditor: PropTypes.func.isRequired,
  setIdToEdit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenseAction(expense)),
  setEditor: () => dispatch(setEditorAction()),
  setIdToEdit: (id) => dispatch(setIdToEditAction(id)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);
