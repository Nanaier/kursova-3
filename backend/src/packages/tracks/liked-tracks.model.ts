import { Model } from 'objection';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { TrackModel } from './track.model.js';
import { UserModel } from '../users/user.model.js';
import { LikedTracksTableColumn } from '~/libs/packages/database/libs/enums/liked-tracks-table-column.js';
import { TracksTableColumn } from './libs/enums/enums.js';
import { UsersTableColumn } from '../users/users.js';

class LikedTrack extends Model {
  public id!: number;

  public userId!: number;

  public trackId!: number;

  static get tableName() {
    return DatabaseTableName.LIKED_TRACKS;
  }

  static get relationMappings() {
    return {
      track: {
        relation: Model.BelongsToOneRelation,
        modelClass: TrackModel,
        join: {
          from: `${DatabaseTableName.LIKED_TRACKS}.${LikedTracksTableColumn.TRACK_ID}`,
          to: `${DatabaseTableName.TRACKS}.${TracksTableColumn.ID}`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.LIKED_TRACKS}.${LikedTracksTableColumn.USER_ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },
    };
  }
}

export default LikedTrack;
