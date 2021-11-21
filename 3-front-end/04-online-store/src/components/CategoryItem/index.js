import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class CategoryItem extends React.Component {
  render() {
    const { categoryName, categoryId, selectedCategory, onChange } = this.props;
    const isSelected = selectedCategory === categoryId;

    return (
      <li>
        <label
          className={ isSelected ? 'filter-item selected' : 'filter-item' }
          htmlFor={ categoryId }
          data-testid="category"
        >
          <input
            className="item-selector"
            id={ categoryId }
            type="radio"
            name="category"
            value={ categoryId }
            checked={ isSelected }
            onChange={ onChange }
          />
          {categoryName}
        </label>
      </li>
    );
  }
}

CategoryItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryItem;
