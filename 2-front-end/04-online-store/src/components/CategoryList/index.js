import React from 'react';
import PropTypes from 'prop-types';

import CategoryItem from '../CategoryItem';

import * as api from '../../services/api';

import './style.css';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const data = await api.getCategories();

    if (data) this.setState({ categories: data });
  };

  render() {
    const { categories } = this.state;
    const { selectedCategory, onChange } = this.props;

    return (
      <div className="sidebar">
        <ul className="filter">
          {categories.map(({ id, name }) => (
            <CategoryItem
              key={ id }
              categoryName={ name }
              categoryId={ id }
              selectedCategory={ selectedCategory }
              onChange={ onChange }
            />
          ))}
        </ul>
      </div>
    );
  }
}

CategoryList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryList;
