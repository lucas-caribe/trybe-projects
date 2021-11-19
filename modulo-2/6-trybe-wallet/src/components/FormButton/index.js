import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FormButton extends Component {
  render() {
    const { onClick, className, children } = this.props;

    return (
      <button className={ `form-button ${className}` } type="submit" onClick={ onClick }>
        {children}
      </button>
    );
  }
}

FormButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormButton;
