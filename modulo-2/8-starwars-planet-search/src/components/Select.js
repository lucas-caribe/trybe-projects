import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, value, onChange, options }) => (
  <label htmlFor={ id }>
    <select id={ id } value={ value } onChange={ onChange } data-testid={ id }>
      {options.map((option, index) => (
        <option key={ index } value={ option }>
          {option}
        </option>
      ))}
    </select>
  </label>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
