import {
  createTrack,
  getAllTracks,
  isLikedTrack,
  toggleTrack,
  getLatestLiked,
  getLatestUploaded,
  deleteTrack,
} from './actions.js';
import { actions } from './track.slice.js';

const allActions = {
  ...actions,
  createTrack,
  getAllTracks,
  isLikedTrack,
  toggleTrack,
  getLatestLiked,
  getLatestUploaded,
  deleteTrack,
};

export { allActions as actions };
export { reducer } from './track.slice.js';
