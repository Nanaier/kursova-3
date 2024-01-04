import {
  Model,
  type Modifiers,
  type QueryBuilder,
  type RelationMappings,
} from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import {
  UserDetailsTableColumn,
  UserRolesTableColumn,
  UsersTableColumn,
} from './libs/enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserRolesModel } from './user-roles.model.js';

class UserModel extends AbstractModel {
  public username!: string;

  public passwordHash!: string;

  public passwordSalt!: string;

  public deletedAt!: string | null;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
    return {
      withoutPassword(builder): QueryBuilder<UserModel> {
        return builder.select(
          'users.id',
          'users.username',
          'users.created_at',
          'users.updated_at',
          'users.deleted_at',
        );
      },
    };
  }

  public static relationMappings(): RelationMappings {
    return {
      details: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
          to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
        },
      },

      roles: {
        relation: Model.HasOneRelation,
        modelClass: UserRolesModel,
        join: {
          from: `${DatabaseTableName.USERS}.${UsersTableColumn.ROLE_ID}`,
          to: `${DatabaseTableName.USER_ROLES}.${UserRolesTableColumn.ID}`,
        },
      },
    };
  }
}

export { UserModel };
