import { filter } from 'lodash';

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (err) {
    return [];
  }
};

export const createFavorite = (wreckToAdd) => {
  const nextFavorites = getFavorites();
  nextFavorites.unshift(wreckToAdd);
  localStorage.setItem('favorites', JSON.stringify(nextFavorites));
};

export const deleteFavorite = (wreckToRemove) => {
  const nextFavorites = filter(getFavorites(), favorite => favorite._id !== wreckToRemove._id);
  localStorage.setItem('favorites', JSON.stringify(nextFavorites));
};

export default {
  getFavorites,
  createFavorite,
  deleteFavorite
};
