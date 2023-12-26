import { logger } from '~/libs/packages/logger/logger.js';

import { imageService } from '../images/images.js';
import { GenreController } from './genre.controller.js';
import { GenreModel } from './genre.model.js';
import { GenreRepository } from './genre.repository.js';
import { GenreService } from './genre.service.js';
import { userService } from '../users/users.js';

const genreRepository = new GenreRepository(GenreModel);
const genreService = new GenreService({
  genreRepository,
  imageService,
  userService,
});
const genreController = new GenreController(logger, genreService);

export { genreController, genreService };
export { GenreModel } from './genre.model.js';
export { type GenreService } from './genre.service.js';
export { GenreError } from './libs/exceptions/exceptions.js';
