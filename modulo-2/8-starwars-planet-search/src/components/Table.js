import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

import PlanetRow from './PlanetRow';

function Table() {
  const { filteredPlanets, headers } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets
          && filteredPlanets.map((planet) => (
            <PlanetRow key={ planet.name } planet={ planet } />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
