import { getAllArtists, getArtistById } from './actions.js';
import { actions } from './artists.slice.js';

const allActions = {
  ...actions,
  getAllArtists,
  getArtistById,
};

export { allActions as actions };
export { reducer } from './artists.slice.js';
