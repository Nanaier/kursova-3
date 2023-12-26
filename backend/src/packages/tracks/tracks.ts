import { logger } from '~/libs/packages/logger/logger.js';
import { fileService } from '~/packages/files/files.js';

import { artistService } from '../artists/artists.js';
import { genreService } from '../genres/genres.js';
import { imageService } from '../images/images.js';
import { TrackController } from './track.controller.js';
import { TrackModel } from './track.model.js';
import { TrackRepository } from './track.repository.js';
import { TrackService } from './track.service.js';
import LikedTrack from './liked-tracks.model.js';
import { userService } from '../users/users.js';

const trackRepository = new TrackRepository(TrackModel, LikedTrack);
const trackService = new TrackService(
  trackRepository,
  imageService,
  genreService,
  artistService,
  fileService,
  userService,
);
const trackController = new TrackController(logger, trackService);

export { trackController, trackService };
export {
  type TrackCreateRequestDto as TrackCreateFormDataDto,
  type TrackGetAllItemResponseDto,
} from './libs/types/types.js';
