import { type Repository } from '~/libs/types/types.js';
import { ImageEntity } from '~/packages/images/image.entity.js';
import { type ImageModel } from '~/packages/images/image.model.js';

import { ImageRelation } from './libs/enums/enums.js';
import {
  type ImageCommonQueryResponse,
  type ImageCreateQueryPayload,
} from './libs/types/types.js';

class ImageRepository implements Repository {
  private imageModel: typeof ImageModel;

  public constructor(imageModel: typeof ImageModel) {
    this.imageModel = imageModel;
  }

  public async findById(id: number): Promise<ImageEntity | null> {
    const image = await this.imageModel
      .query()
      .withGraphJoined(ImageRelation.FILES)
      .findById(id)
      .castTo<ImageCommonQueryResponse | undefined>();

    if (!image) {
      return null;
    }

    return ImageEntity.initialize({
      id: image.id,
      fileId: image.files.id,
      isBasicImage: image.isBasicImage,
      createdAt: new Date(image.createdAt),
      updatedAt: new Date(image.updatedAt),
      url: image.files.url,
    });
  }

  public async findBasicPicture(): Promise<ImageEntity | null> {
    const image = await this.imageModel
      .query()
      .withGraphJoined(ImageRelation.FILES)
      .where({ isBasicImage: true })
      .orderByRaw('RANDOM()')
      .first()
      .castTo<ImageCommonQueryResponse | undefined>();

    if (!image) {
      return null;
    }

    return ImageEntity.initialize({
      id: image.id,
      fileId: image.files.id,
      isBasicImage: image.isBasicImage,
      createdAt: new Date(image.createdAt),
      updatedAt: new Date(image.updatedAt),
      url: image.files.url,
    });
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: ImageEntity): Promise<ImageEntity> {
    const { fileId, isBasicImage } = entity.toNewObject();
    const image = await this.imageModel
      .query()
      .insertGraph({
        fileId,
        isBasicImage,
      } as ImageCreateQueryPayload)
      .withGraphJoined(ImageRelation.FILES)
      .castTo<ImageCommonQueryResponse>();

    return ImageEntity.initialize({
      id: image.id,
      fileId: image.files.id,
      isBasicImage: image.isBasicImage,
      createdAt: new Date(image.createdAt),
      updatedAt: new Date(image.updatedAt),
      url: image.files.url,
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { ImageRepository };
