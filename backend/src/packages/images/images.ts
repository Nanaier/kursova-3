import { fileService } from '../files/files.js';
import { ImageModel } from './image.model.js';
import { ImageRepository } from './image.repository.js';
import { ImageService } from './image.service.js';

const imageRepository = new ImageRepository(ImageModel);
const imageService = new ImageService({
  imageRepository,
  fileService,
});

export { imageService };
export { ImageModel } from './image.model.js';
export { type ImageService } from './image.service.js';
export {
  type ImageCommonQueryResponse,
  type ImageCreateQueryPayload,
  type ImageGetAllItemResponseDto,
  type ImageUploadRequestDto,
} from './libs/types/types.js';
