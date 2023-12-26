import { SortType } from '~/libs/enums/enums.js';
import { type Repository } from '~/libs/types/types.js';

import { GenreEntity } from './genre.entity.js';
import { type GenreModel } from './genre.model.js';
import { GenresRelation } from './libs/enums/enums.js';
import {
  type GenreCommonQueryResponse,
  type GenreCreateQueryPayload,
} from './libs/types/types.js';

class GenreRepository implements Repository {
  private genreModel: typeof GenreModel;

  public constructor(genreModel: typeof GenreModel) {
    this.genreModel = genreModel;
  }

  public async findById(id: number): Promise<GenreEntity | null> {
    const genre = await this.genreModel
      .query()
      .withGraphJoined(`${GenresRelation.IMAGES}.[${GenresRelation.FILES}]`)
      .findById(id)
      .castTo<GenreCommonQueryResponse | undefined>();

    if (!genre) {
      return null;
    }

    return GenreEntity.initialize({
      id: genre.id,
      genreName: genre.genreName,
      genreDescription: genre.genreDescription,
      createdAt: new Date(genre.createdAt),
      updatedAt: new Date(genre.updatedAt),
      imageId: genre.images.id,
      imageUrl: genre.images.files.url,
    });
  }

  public async findByGenreName(genreName: string): Promise<GenreEntity | null> {
    const genre = await this.genreModel
      .query()
      .withGraphJoined(`${GenresRelation.IMAGES}.[${GenresRelation.FILES}]`)
      .findOne({ genreName })
      .castTo<GenreCommonQueryResponse | undefined>();

    if (!genre) {
      return null;
    }

    return GenreEntity.initialize({
      id: genre.id,
      genreName: genre.genreName,
      genreDescription: genre.genreDescription,
      createdAt: new Date(genre.createdAt),
      updatedAt: new Date(genre.updatedAt),
      imageId: genre.images.id,
      imageUrl: genre.images.files.url,
    });
  }

  public async findAll(): Promise<GenreEntity[]> {
    const genreEntries = await this.genreModel
      .query()
      .withGraphJoined(`${GenresRelation.IMAGES}.[${GenresRelation.FILES}]`)
      .orderBy('createdAt', SortType.DESC)
      .castTo<GenreCommonQueryResponse[]>();

    return genreEntries.map((genreEntry) => {
      return GenreEntity.initialize({
        id: genreEntry.id,
        genreName: genreEntry.genreName,
        genreDescription: genreEntry.genreDescription,
        createdAt: new Date(genreEntry.createdAt),
        updatedAt: new Date(genreEntry.updatedAt),
        imageId: genreEntry.images.id,
        imageUrl: genreEntry.images.files.url,
      });
    });
  }

  public async create(entity: GenreEntity): Promise<GenreEntity> {
    const { genreName, genreDescription, imageId } = entity.toNewObject();
    const genreInserted = await this.genreModel
      .query()
      .insertGraph({
        genreName,
        genreDescription,
        imageId,
      } as GenreCreateQueryPayload)
      .castTo<GenreCommonQueryResponse>();

    const genre = await this.genreModel
      .query()
      .withGraphJoined(`${GenresRelation.IMAGES}.[${GenresRelation.FILES}]`)
      .findById(genreInserted.id)
      .castTo<GenreCommonQueryResponse>();

    return GenreEntity.initialize({
      id: genre.id,
      genreName: genre.genreName,
      genreDescription: genre.genreDescription,
      createdAt: new Date(genre.createdAt),
      updatedAt: new Date(genre.updatedAt),
      imageId: genre.images.id,
      imageUrl: genre.images.files.url,
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

export { GenreRepository };
