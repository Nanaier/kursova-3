import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { ImagesTableColumn } from '~/libs/packages/database/libs/enums/enums.js';

import { ImageModel } from '../images/image.model.js';
import {
  UserDetailsTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class UserDetailsModel extends AbstractModel {
  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
          to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
        },
      },
      avatar: {
        relation: Model.BelongsToOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DatabaseTableName.IMAGES}.${ImagesTableColumn.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.AVATAR_ID}`,
        },
      },
    };
  }
}

export { UserDetailsModel };
