import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { GenreApi } from './genres-api.js';

const genreApi = new GenreApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { genreApi };
export { GenresApiPath } from './libs/enums/enums.js';
export { type GenreGetAllItemResponseDto } from './libs/types/types.js';
