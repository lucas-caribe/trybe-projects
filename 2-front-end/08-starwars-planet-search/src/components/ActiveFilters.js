import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

const ActiveFilters = () => {
  const { filters, removeNumericFilter } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  return (
    <div className="active-filters">
      {filterByNumericValues.map(({ column }) => (
        <div key={ column } data-testid="filter">
          <p>{column}</p>
          <button type="button" onClick={ () => removeNumericFilter(column) }>
            remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
