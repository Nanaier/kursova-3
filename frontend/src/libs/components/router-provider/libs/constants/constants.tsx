import { type RouteObject } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';

const ROUTER_ITEMS: Pick<RouteObject, 'path' | 'children'>[] = [
  { path: AppRoute.SIGN_IN },
  { path: AppRoute.SIGN_UP },
  { path: AppRoute.ROOT },
  { path: AppRoute.TRACKS },
  { path: AppRoute.TRACKS_$ID },
  { path: AppRoute.ARTISTS_$ID },
  { path: AppRoute.GENRES_$ID },
  { path: AppRoute.USER },
];

export { ROUTER_ITEMS };
