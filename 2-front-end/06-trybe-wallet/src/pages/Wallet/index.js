import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import CurrencyForm from '../../components/CurrencyForm';
import EditCurrencyForm from '../../components/EditCurrencyForm';
import ExpensesTable from '../../components/ExpensesTable';

import './style.css';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;

    return (
      <div className="wallet">
        <Header />
        {editor ? <EditCurrencyForm /> : <CurrencyForm />}
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool,
};

Wallet.defaultProps = {
  editor: false,
};

const mapStateToProps = ({ wallet }) => ({
  editor: wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
