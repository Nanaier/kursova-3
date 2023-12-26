import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { ArtistsApi } from './artists-api.js';

const artistsApi = new ArtistsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { artistsApi };
export { ArtistsApiPath } from './libs/enums/enums.js';
export { type ArtistGetAllItemResponseDto } from './libs/types/types.js';
