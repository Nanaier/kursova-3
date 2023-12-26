import { logger } from '~/libs/packages/logger/logger.js';

import { imageService } from '../images/images.js';
import { ArtistController } from './artist.controller.js';
import { ArtistModel } from './artist.model.js';
import { ArtistRepository } from './artist.repository.js';
import { ArtistService } from './artist.service.js';

const artistRepository = new ArtistRepository(ArtistModel);
const artistService = new ArtistService({
  artistRepository,
  imageService,
});
const artistController = new ArtistController(logger, artistService);

export { artistController, artistService };
export { ArtistModel } from './artist.model.js';
export { type ArtistService } from './artist.service.js';
export { ArtistError } from './libs/exceptions/exceptions.js';
