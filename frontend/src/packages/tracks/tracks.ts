import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { TrackApi } from './tracks-api.js';

const trackApi = new TrackApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { trackApi };
export { TracksApiPath } from './libs/enums/enums.js';
export {
  type TrackCreateRequestDto,
  type TrackCreateResponseDto,
  type TrackGetAllItemResponseDto,
  type TrackGetAllResponseDto,
} from './libs/types/types.js';
export { createTrackEntryFormValidationSchema } from './libs/validation-schemas/validation-schemas.js';
