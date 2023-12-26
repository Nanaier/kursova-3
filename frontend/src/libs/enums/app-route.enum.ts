const AppRoute = {
  ROOT: '/',
  TRACKS: '/tracks',
  USER: '/user',
  TRACKS_$ID: '/tracks/:id',
  ARTISTS_$ID: '/artists/:id',
  GENRES_$ID: '/genres/:id',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

export { AppRoute };
