import {
  getAuthenticatedUser,
  signIn,
  signOut,
  signUp,
  isUserAdmin,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signOut,
  signIn,
  getAuthenticatedUser,
  isUserAdmin,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
