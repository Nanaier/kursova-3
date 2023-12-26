import { SortType } from '~/libs/enums/enums.js';
import { type Repository } from '~/libs/types/types.js';

import { ArtistEntity } from './artist.entity.js';
import { type ArtistModel } from './artist.model.js';
import { ArtistRelation } from './libs/enums/enums.js';
import {
  type ArtistCommonQueryResponse,
  type ArtistCreateQueryPayload,
} from './libs/types/types.js';

class ArtistRepository implements Repository {
  private artistModel: typeof ArtistModel;

  public constructor(artistModel: typeof ArtistModel) {
    this.artistModel = artistModel;
  }

  public async findById(id: number): Promise<ArtistEntity | null> {
    const artist = await this.artistModel
      .query()
      .withGraphJoined(`${ArtistRelation.IMAGES}.[${ArtistRelation.FILES}]`)
      .findById(id)
      .castTo<ArtistCommonQueryResponse | undefined>();

    if (!artist) {
      return null;
    }

    return ArtistEntity.initialize({
      id: artist.id,
      artistName: artist.artistName,
      artistUsername: artist.artistUsername,
      description: artist.description,
      createdAt: new Date(artist.createdAt),
      updatedAt: new Date(artist.updatedAt),
      imageId: artist.images.id,
      imageUrl: artist.images.files.url,
    });
  }

  public async findByArtistUsername(
    artistUsername: string,
  ): Promise<ArtistEntity | null> {
    const artist = await this.artistModel
      .query()
      .withGraphJoined(`${ArtistRelation.IMAGES}.[${ArtistRelation.FILES}]`)
      .findOne({ artistUsername })
      .castTo<ArtistCommonQueryResponse | undefined>();

    if (!artist) {
      return null;
    }

    return ArtistEntity.initialize({
      id: artist.id,
      artistName: artist.artistName,
      artistUsername: artist.artistUsername,
      description: artist.description,
      createdAt: new Date(artist.createdAt),
      updatedAt: new Date(artist.updatedAt),
      imageId: artist.images.id,
      imageUrl: artist.images.files.url,
    });
  }

  public async findAll(): Promise<ArtistEntity[]> {
    const artistEntries = await this.artistModel
      .query()
      .withGraphJoined(`${ArtistRelation.IMAGES}.[${ArtistRelation.FILES}]`)
      .orderBy('createdAt', SortType.DESC)
      .castTo<ArtistCommonQueryResponse[]>();

    return artistEntries.map((artistEntry) => {
      return ArtistEntity.initialize({
        id: artistEntry.id,
        artistName: artistEntry.artistName,
        artistUsername: artistEntry.artistUsername,
        description: artistEntry.description,
        createdAt: new Date(artistEntry.createdAt),
        updatedAt: new Date(artistEntry.updatedAt),
        imageId: artistEntry.images.id,
        imageUrl: artistEntry.images.files.url,
      });
    });
  }

  public async create(entity: ArtistEntity): Promise<ArtistEntity> {
    const { artistName, artistUsername, description, imageId } =
      entity.toNewObject();
    const artistInserted = await this.artistModel
      .query()
      .insertGraph({
        artistName,
        artistUsername,
        description,
        imageId,
      } as ArtistCreateQueryPayload)
      .castTo<ArtistCommonQueryResponse>();

    const artist = await this.artistModel
      .query()
      .findById(artistInserted.id)
      .withGraphJoined(`${ArtistRelation.IMAGES}.[${ArtistRelation.FILES}]`)
      .castTo<ArtistCommonQueryResponse>();

    return ArtistEntity.initialize({
      id: artist.id,
      artistName: artist.artistName,
      artistUsername: artist.artistUsername,
      description: artist.description,
      createdAt: new Date(artist.createdAt),
      updatedAt: new Date(artist.updatedAt),
      imageId: artist.images.id,
      imageUrl: artist.images.files.url,
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public async updateDescription({
    id,
    description,
  }: {
    id: number;
    description: string;
  }): Promise<ArtistEntity> {
    await this.artistModel.query().for(id).patch({ description });

    const artist = await this.artistModel
      .query()
      .withGraphJoined(`${ArtistRelation.IMAGES}.[${ArtistRelation.FILES}]`)
      .findById(id)
      .castTo<ArtistCommonQueryResponse>();

    return ArtistEntity.initialize({
      id: artist.id,
      artistName: artist.artistName,
      artistUsername: artist.artistUsername,
      createdAt: new Date(artist.createdAt),
      updatedAt: new Date(artist.updatedAt),
      description: artist.description,
      imageId: artist.images.id,
      imageUrl: artist.images.files.url,
    });
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { ArtistRepository };
