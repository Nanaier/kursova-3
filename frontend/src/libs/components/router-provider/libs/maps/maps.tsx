import { type ReactNode } from 'react';

import { AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { Auth } from '~/pages/auth/auth.js';
import { MainPage } from '~/pages/main-page/main-page.js';
import { PersonalArtistPage } from '~/pages/personal-artist-page/personal-artist-page.js';
import { PersonalGenrePage } from '~/pages/personal-genre-page/personal-genre-page.js';
import { PersonalUserPage } from '~/pages/personal-user-page/personal-user-page.js';
import { TrackPlayer } from '~/pages/tracks-page/components/track-player/track-player.js';
import { TracksPage } from '~/pages/tracks-page/tracks-page.js';

const routerPathToElement: Record<
  ValueOf<typeof AppRoute>,
  {
    type?: 'private' | undefined;
    element: ReactNode;
  }
> = {
  [AppRoute.TRACKS_$ID]: {
    type: 'private',
    element: <TrackPlayer />,
  },
  [AppRoute.TRACKS]: {
    type: 'private',
    element: <TracksPage />,
  },
  [AppRoute.ARTISTS_$ID]: {
    type: 'private',
    element: <PersonalArtistPage />,
  },
  [AppRoute.USER]: {
    type: 'private',
    element: <PersonalUserPage />,
  },
  [AppRoute.GENRES_$ID]: {
    type: 'private',
    element: <PersonalGenrePage />,
  },
  [AppRoute.SIGN_IN]: {
    element: <Auth />,
  },
  [AppRoute.SIGN_UP]: {
    element: <Auth />,
  },
  [AppRoute.ROOT]: {
    type: 'private',
    element: <MainPage />,
  },
};

export { routerPathToElement };
