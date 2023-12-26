const DatabaseTableName = {
  MIGRATIONS: 'migrations',
  USERS: 'users',
  USER_DETAILS: 'user_details',
  USER_ROLES: 'user_roles',
  FILES: 'files',
  IMAGES: 'images',
  TRACKS: 'tracks',
  GENRES: 'genres',
  ARTISTS: 'artists',
  PLAYLISTS: 'playlists',
  LIKED_TRACKS: 'liked_tracks',
  PLAYLISTS_TO_TRACKS: 'playlists_to_tracks',
} as const;
export { DatabaseTableName };
