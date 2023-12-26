import { getAllGenres, getGenreById, createGenre } from './actions.js';
import { actions } from './genre.slice.js';

const allActions = {
  ...actions,
  getAllGenres,
  getGenreById,
  createGenre,
};

export { allActions as actions };
export { reducer } from './genre.slice.js';
