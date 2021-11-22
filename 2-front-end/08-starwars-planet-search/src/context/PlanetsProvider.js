import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/planetsAPI';

import {
  applyNameFilter,
  applyNumericFilter,
  applyOrderFilter,
} from '../utils/filterHelpers';

const initialFilters = {
  filterByName: { name: '' },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

// eu não faço ideia do que tô fazendo
function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(columnOptions);
  const [filters, setFilter] = useState(initialFilters);
  const [headers, setHeaders] = useState([]);

  const fetchPlanets = async () => {
    const response = await getPlanets();

    setData(response);
    setHeaders(
      Object.keys(response.results[0]).filter((key) => key !== 'residents'),
    );
  };

  const setNameFilter = (search) => {
    setFilter({
      ...filters,
      filterByName: { ...filters.filterByName, name: search },
    });
  };

  const setNumericFilter = (numericFilter) => {
    const { filterByNumericValues } = filters;

    setFilter({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numericFilter],
    });
    setFilteredColumns(
      filteredColumns.filter(
        (columnName) => columnName !== numericFilter.column,
      ),
    );
  };

  const removeNumericFilter = (filterColumn) => {
    const { filterByNumericValues } = filters;

    setFilter({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter(
        ({ column }) => column !== filterColumn,
      ),
    });
    setFilteredColumns([...filteredColumns, filterColumn]);
  };

  const setSortFilter = (order) => {
    setFilter({
      ...filters,
      order,
    });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (data && data.results) {
      const { results } = data;
      const { filterByName, filterByNumericValues, order } = filters;

      let tempFilteredArray = [...results];
      tempFilteredArray = applyNameFilter(tempFilteredArray, filterByName.name);
      tempFilteredArray = applyNumericFilter(
        tempFilteredArray,
        filterByNumericValues,
      );
      tempFilteredArray = applyOrderFilter(tempFilteredArray, order);

      setFilteredPlanets(tempFilteredArray);
    }
  }, [data, filters]);

  return (
    <PlanetsContext.Provider
      value={ {
        comparisonOptions,
        filteredPlanets,
        filteredColumns,
        headers,
        filters,
        setNameFilter,
        setNumericFilter,
        removeNumericFilter,
        setSortFilter,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
