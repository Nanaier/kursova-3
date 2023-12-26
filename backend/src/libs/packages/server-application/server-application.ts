import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { artistController } from '~/packages/artists/artists.js';
import { authController } from '~/packages/auth/auth.js';
import { fileController } from '~/packages/files/files.js';
import { genreController } from '~/packages/genres/genres.js';
import { trackController } from '~/packages/tracks/tracks.js';

import { BaseServerApplication } from './base-server-application.js';
import { BaseServerApplicationApi } from './base-server-application-api.js';

const apiV1 = new BaseServerApplicationApi(
  'v1',
  config,
  ...authController.routes,
  ...fileController.routes,
  ...trackController.routes,
  ...genreController.routes,
  ...artistController.routes,
);
const serverApplication = new BaseServerApplication({
  title: 'SoundVault',
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApplication };
export { WHITE_ROUTES } from './libs/constants/constants.js';
export { checkIsWhiteRoute } from './libs/helpers/helpers.js';
export { type ServerApplicationRouteParameters } from './libs/types/types.js';
