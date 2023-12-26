import { type Service } from '~/libs/types/types.js';

import { type FileService } from '../files/file.service.js';
import { ImageEntity } from './image.entity.js';
import { type ImageRepository } from './image.repository.js';
import {
  type ImageGetAllItemResponseDto,
  type ImageUploadRequestDto,
} from './libs/types/types.js';

type ImageServiceDependencies = {
  imageRepository: ImageRepository;
  fileService: FileService;
};

class ImageService implements Service {
  private imageRepository: ImageRepository;

  private fileService: FileService;

  public constructor({
    imageRepository,
    fileService,
  }: ImageServiceDependencies) {
    this.imageRepository = imageRepository;
    this.fileService = fileService;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: ImageUploadRequestDto,
  ): Promise<ImageGetAllItemResponseDto> {
    const file = await this.fileService.create(payload.file);

    const image = await this.imageRepository.create(
      ImageEntity.initializeNew({
        fileId: file.id,
        url: file.url,
        isBasicImage: payload.isBasicImage,
      }),
    );

    return image.toObject();
  }

  public async getBasicImage(): Promise<ImageGetAllItemResponseDto | null> {
    const image = await this.imageRepository.findBasicPicture();

    if (!image) {
      return null;
    }

    return image.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ImageService };
