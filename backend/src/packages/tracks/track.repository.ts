import { SortType } from '~/libs/enums/enums.js';
import { type Repository } from '~/libs/types/types.js';

import { TracksRelation } from './libs/enums/enums.js';
import {
  type TrackCommonQueryResponse,
  type TrackCreateQueryPayload,
} from './libs/types/types.js';
import { TrackEntity } from './track.entity.js';
import { type TrackModel } from './track.model.js';
import { LikedTracksTableColumn } from '~/libs/packages/database/libs/enums/liked-tracks-table-column.js';
import LikedTrack from './liked-tracks.model.js';

class TrackRepository implements Repository {
  private trackModel: typeof TrackModel;

  private likedTrackModel: typeof LikedTrack;

  public constructor(
    trackModel: typeof TrackModel,
    likedTrackModel: typeof LikedTrack,
  ) {
    this.trackModel = trackModel;
    this.likedTrackModel = likedTrackModel;
  }

  public findById(): ReturnType<Repository['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async isTrackLiked(userId: number, trackId: number): Promise<boolean> {
    const likedTrack = await this.likedTrackModel
      .query()
      .where({
        user_id: userId,
        track_id: trackId,
      })
      .first();

    return likedTrack !== undefined;
  }

  public async toggleTrackLike(userId: number, trackId: number): Promise<void> {
    const likedTrack = await this.likedTrackModel
      .query()
      .where({
        userId,
        trackId,
      })
      .first();

    if (likedTrack) {
      await this.likedTrackModel.query().deleteById(likedTrack.id);
    } else {
      await this.likedTrackModel.query().insertGraph({
        userId,
        trackId,
      });
    }
  }

  public async findAllWithPagination(
    query: string,
    page = 1,
    pageSize = 9,
    genreIds: number[] = [],
    artistIds: number[] = [],
    sort = 'desc',
  ): Promise<{
    data: TrackEntity[];
    totalItems: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * pageSize;

    const totalItems = await this.trackModel
      .query()
      .modify((builder) => {
        if (query) {
          void builder.where('title', 'iLike', `%${query}%`);
        }
        if (genreIds.length > 0) {
          void builder.whereIn('genreId', genreIds);
        }
        if (artistIds.length > 0) {
          void builder.whereIn('artistId', artistIds);
        }
      })
      .resultSize();

    const tracks = await this.trackModel
      .query()
      .withGraphJoined(TracksRelation.ARTISTS)
      .withGraphJoined(TracksRelation.GENRES)
      .withGraphJoined(`${TracksRelation.IMAGES}.[${TracksRelation.FILES}]`)
      .withGraphJoined(TracksRelation.FILES)
      .orderBy([
        {
          column: 'createdAt',
          order: sort === 'desc' ? SortType.DESC : SortType.ASC,
        },
        {
          column: 'title',
          order: sort === 'desc' ? SortType.DESC : SortType.ASC,
        },
      ])
      .modify((builder) => {
        if (query) {
          void builder.where('title', 'iLike', `%${query}%`);
        }
        if (genreIds.length > 0) {
          void builder.whereIn('genreId', genreIds);
        }
        if (artistIds.length > 0) {
          void builder.whereIn('artistId', artistIds);
        }
      })
      .offset(pageSize === -1 ? 0 : offset)
      .limit(pageSize !== -1 ? pageSize : totalItems)
      .castTo<TrackCommonQueryResponse[]>();

    const totalPages = pageSize !== -1 ? Math.ceil(totalItems / pageSize) : 1;

    const formattedTracks = tracks.map((track) => {
      return TrackEntity.initialize({
        id: track.id,
        title: track.title,
        yearOfPublication: track.yearOfPublication,
        artistId: track.artists.id,
        artistName: track.artists.artistName,
        imageId: track.images.id,
        imageUrl: track.images.files.url,
        fileId: track.files.id,
        fileUrl: track.files.url,
        genreId: track.genres.id,
        genreName: track.genres.genreName,
        createdAt: new Date(track.createdAt),
        updatedAt: new Date(track.updatedAt),
      });
    });

    return {
      data: formattedTracks,
      totalItems,
      totalPages,
    };
  }

  public async findLikedByUserId(userId: number): Promise<TrackEntity[]> {
    const likedTracks = await this.likedTrackModel
      .query()
      .where({
        userId,
      })
      .orderBy('createdAt', SortType.DESC);

    const trackIds = likedTracks.map((track) => track.trackId);

    const tracks = await this.trackModel
      .query()
      .withGraphJoined(TracksRelation.ARTISTS)
      .withGraphJoined(TracksRelation.LIKED_TRACKS)
      .withGraphJoined(TracksRelation.GENRES)
      .withGraphJoined(`${TracksRelation.IMAGES}.[${TracksRelation.FILES}]`)
      .withGraphJoined(TracksRelation.FILES)
      .whereIn('tracks.id', trackIds)
      .orderBy(`${TracksRelation.LIKED_TRACKS}.createdAt`, SortType.DESC)
      .limit(3)
      .castTo<TrackCommonQueryResponse[]>();

    return tracks.map((track) => {
      return TrackEntity.initialize({
        id: track.id,
        title: track.title,
        yearOfPublication: track.yearOfPublication,
        artistId: track.artists.id,
        artistName: track.artists.artistName,
        imageId: track.images.id,
        imageUrl: track.images.files.url,
        fileId: track.files.id,
        fileUrl: track.files.url,
        genreId: track.genres.id,
        genreName: track.genres.genreName,
        createdAt: new Date(track.createdAt),
        updatedAt: new Date(track.updatedAt),
      });
    });
  }

  public async findByArtistId(artistId: number): Promise<TrackEntity[]> {
    const tracks = await this.trackModel
      .query()
      .withGraphJoined(TracksRelation.ARTISTS)
      .withGraphJoined(TracksRelation.GENRES)
      .withGraphJoined(`${TracksRelation.IMAGES}.[${TracksRelation.FILES}]`)
      .withGraphJoined(TracksRelation.FILES)
      .where({ artistId })
      .orderBy('createdAt', SortType.DESC)
      .limit(3)
      .castTo<TrackCommonQueryResponse[]>();

    return tracks.map((track) => {
      return TrackEntity.initialize({
        id: track.id,
        title: track.title,
        yearOfPublication: track.yearOfPublication,
        artistId: track.artists.id,
        artistName: track.artists.artistName,
        imageId: track.images.id,
        imageUrl: track.images.files.url,
        fileId: track.files.id,
        fileUrl: track.files.url,
        genreId: track.genres.id,
        genreName: track.genres.genreName,
        createdAt: new Date(track.createdAt),
        updatedAt: new Date(track.updatedAt),
      });
    });
  }

  public async create(entity: TrackEntity): Promise<TrackEntity> {
    const {
      title,
      yearOfPublication,
      artistId,
      imageId,
      fileId,
      genreId,
      imageUrl,
    } = entity.toObject();

    const insertedTrack = await this.trackModel
      .query()
      .insertGraph({
        title,
        yearOfPublication,
        artistId,
        imageId,
        fileId,
        genreId,
      } as TrackCreateQueryPayload)
      .castTo<TrackCommonQueryResponse>();

    const track = await this.trackModel
      .query()
      .withGraphJoined(TracksRelation.ARTISTS)
      .withGraphJoined(TracksRelation.GENRES)
      .withGraphJoined(TracksRelation.IMAGES)
      .withGraphJoined(TracksRelation.FILES)
      .findById(insertedTrack.id)
      .orderBy('createdAt', SortType.DESC)
      .castTo<TrackCommonQueryResponse>();

    return TrackEntity.initialize({
      id: track.id,
      title: track.title,
      yearOfPublication: track.yearOfPublication,
      artistId: track.artists.id,
      artistName: track.artists.artistName,
      imageId: track.images.id,
      imageUrl: imageUrl,
      fileId: track.files.id,
      fileUrl: track.files.url,
      genreId: track.genres.id,
      genreName: track.genres.genreName,
      createdAt: new Date(track.createdAt),
      updatedAt: new Date(track.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public async deleteById(trackId: number): Promise<TrackEntity | null> {
    const trackToDelete = await this.trackModel
      .query()
      .withGraphJoined(TracksRelation.ARTISTS)
      .withGraphJoined(TracksRelation.GENRES)
      .withGraphJoined(`${TracksRelation.IMAGES}.[${TracksRelation.FILES}]`)
      .withGraphJoined(TracksRelation.FILES)
      .findById(trackId)
      .castTo<TrackCommonQueryResponse>();

    if (!trackToDelete) {
      return null;
    }

    const deletedTrackId = await this.trackModel.query().deleteById(trackId);

    return deletedTrackId > 0
      ? TrackEntity.initialize({
          id: trackToDelete.id,
          title: trackToDelete.title,
          yearOfPublication: trackToDelete.yearOfPublication,
          artistId: trackToDelete.artists.id,
          artistName: trackToDelete.artists.artistName,
          imageId: trackToDelete.images.id,
          imageUrl: trackToDelete.images.files.url,
          fileId: trackToDelete.files.id,
          fileUrl: trackToDelete.files.url,
          genreId: trackToDelete.genres.id,
          genreName: trackToDelete.genres.genreName,
          createdAt: new Date(trackToDelete.createdAt),
          updatedAt: new Date(trackToDelete.updatedAt),
        })
      : null;
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { TrackRepository };
