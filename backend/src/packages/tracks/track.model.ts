import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  ArtistsTableColumn,
  LikedTracksTableColumn,
} from '~/libs/packages/database/libs/enums/enums.js';

import { ArtistModel } from '../artists/artists.js';
import { FileModel } from '../files/files.js';
import { GenreModel } from '../genres/genres.js';
import { ImageModel } from '../images/images.js';
import { TracksRelation, TracksTableColumn } from './libs/enums/enums.js';
import { UserModel } from '../users/user.model.js';
import { UsersTableColumn } from '../users/users.js';
import LikedTrack from './liked-tracks.model.js';

class TrackModel extends AbstractModel {
  public title!: string;

  public yearOfPublication!: number;

  public static override get tableName(): string {
    return DatabaseTableName.TRACKS;
  }

  public static relationMappings(): RelationMappings {
    return {
      [TracksRelation.ARTISTS]: {
        relation: Model.BelongsToOneRelation,
        modelClass: ArtistModel,
        join: {
          from: `${DatabaseTableName.TRACKS}.${TracksTableColumn.ARTIST_ID}`,
          to: `${DatabaseTableName.ARTISTS}.${ArtistsTableColumn.ID}`,
        },
      },
      [TracksRelation.FILES]: {
        relation: Model.BelongsToOneRelation,
        modelClass: FileModel,
        join: {
          from: `${DatabaseTableName.TRACKS}.${TracksTableColumn.FILE_ID}`,
          to: `${DatabaseTableName.FILES}.${ArtistsTableColumn.ID}`,
        },
      },
      [TracksRelation.GENRES]: {
        relation: Model.BelongsToOneRelation,
        modelClass: GenreModel,
        join: {
          from: `${DatabaseTableName.TRACKS}.${TracksTableColumn.GENRE_ID}`,
          to: `${DatabaseTableName.GENRES}.${ArtistsTableColumn.ID}`,
        },
      },
      [TracksRelation.IMAGES]: {
        relation: Model.BelongsToOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DatabaseTableName.TRACKS}.${TracksTableColumn.IMAGE_ID}`,
          to: `${DatabaseTableName.IMAGES}.${ArtistsTableColumn.ID}`,
        },
      },
      [TracksRelation.LIKED_TRACKS]: {
        relation: Model.HasManyRelation,
        modelClass: LikedTrack,
        join: {
          from: `${DatabaseTableName.TRACKS}.${TracksTableColumn.ID}`,
          to: `${DatabaseTableName.LIKED_TRACKS}.${LikedTracksTableColumn.TRACK_ID}`,
        },
      },
    };
  }
}

export { TrackModel };
