import React from 'react';
import PropTypes from 'prop-types';

class SelectInput extends React.Component {
  render() {
    const { label, name, id, value, onChange, options } = this.props;
    const dataTestId = `${id.replace('-input', '')}-option`;

    return (
      <label htmlFor={ id } data-testid={ `${id}-label` }>
        {label}
        <select
          name={ name }
          id={ id }
          data-testid={ id }
          value={ value }
          onChange={ onChange }
        >
          {options.map(({ value: genreValue, text }) => (
            <option key={ genreValue } value={ genreValue } data-testid={ dataTestId }>
              {text}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectInput;
