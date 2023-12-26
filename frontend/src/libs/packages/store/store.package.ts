import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Config } from '~/libs/packages/config/config.js';
import { notification } from '~/libs/packages/notification/notification.js';
import {
  handleError,
  handleUnauthorized,
} from '~/libs/packages/store/middlewares/middlewares.js';
import { authApi } from '~/packages/auth/auth.js';
import { artistsApi } from '~/packages/artists/artists.js';
import { genreApi } from '~/packages/genres/genres.js';
import { trackApi } from '~/packages/tracks/tracks.js';
import { reducer as appReducer } from '~/slices/app/app.js';
import { reducer as artistsReducer } from '~/slices/artists/artists.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as genresReducer } from '~/slices/genres/genre.js';
import { reducer as tracksReducer } from '~/slices/tracks/track.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
  artists: ReturnType<typeof artistsReducer>;
  tracks: ReturnType<typeof tracksReducer>;
  genres: ReturnType<typeof genresReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  artistsApi: typeof artistsApi;
  trackApi: typeof trackApi;
  genreApi: typeof genreApi;
  storage: typeof storage;
  notification: typeof notification;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: Config) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        app: appReducer,
        artists: artistsReducer,
        tracks: tracksReducer,
        genres: genresReducer,
        users: usersReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return [
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
          handleUnauthorized,
          handleError,
        ];
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      artistsApi,
      trackApi,
      genreApi,
      storage,
      notification,
    };
  }
}

export { Store };
