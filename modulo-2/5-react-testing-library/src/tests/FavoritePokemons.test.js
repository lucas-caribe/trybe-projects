import React from 'react';
import { screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

import renderWithRouter from '../utils/renderWithRouter';

import pokemons from '../data';

describe('Testando FavoritePokemons.js', () => {
  test('se é exibida uma mensagem caso a pessoa não tenha pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavorites = screen.getByText('No favorite pokemon found');

    expect(noFavorites).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémon favoritados', () => {
    const PIKACHU_ID = 25;
    const CATERPIE_ID = 10;
    const EKANS_ID = 23;

    const favoritePokemon = pokemons.filter(
      ({ id }) => id === PIKACHU_ID || id === CATERPIE_ID || id === EKANS_ID,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const pikachu = screen.getByText('Pikachu');
    const caterpie = screen.getByText('Caterpie');
    const ekans = screen.getByText('Ekans');

    expect(pikachu).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
  });
});
