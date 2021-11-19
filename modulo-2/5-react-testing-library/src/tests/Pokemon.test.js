import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import App from '../App';
import Pokemon from '../components/Pokemon';

import renderWithRouter from '../utils/renderWithRouter';

import pokemons from '../data';

describe('Testando Pokemon.js', () => {
  const moreDetailsText = 'More details';

  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const testPokemon = pokemons[0];
    const { averageWeight: testPokemonWeight } = testPokemon;

    renderWithRouter(<Pokemon pokemon={ testPokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${testPokemon.name} sprite`);

    expect(pokemonName.textContent).toBe(testPokemon.name);
    expect(pokemonType.textContent).toBe(testPokemon.type);
    expect(pokemonWeight.textContent).toBe(
      `Average weight: ${testPokemonWeight.value} ${testPokemonWeight.measurementUnit}`,
    );
    expect(pokemonImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('se é renderizado um link de mais detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsText });
    const linkRegex = new RegExp('.*/pokemons/25');

    expect(detailsLink.textContent).toBe(moreDetailsText);
    expect(detailsLink.href).toMatch(linkRegex);

    fireEvent.click(detailsLink);

    const {
      location: { pathname },
    } = history;
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(header.textContent).toBe('Pikachu Details');
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsText });

    fireEvent.click(detailsLink);

    const favoritePokemon = screen.getByRole('checkbox');

    fireEvent.click(favoritePokemon);

    history.push('/');

    const star = screen.getByAltText('Pikachu is marked as favorite');

    expect(star).toBeInTheDocument();
    expect(star.src).toMatch(/\/star-icon.svg/);
  });
});
