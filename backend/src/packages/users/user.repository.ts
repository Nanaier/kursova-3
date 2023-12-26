import { type Repository, type ValueOf } from '~/libs/types/types.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/users.js';

import { UsersRelation } from './libs/enums/enums.js';
import {
  type UserCommonQueryResponse,
  type UserCreateQueryPayload,
  type UserWithPasswordQueryResponse,
} from './libs/types/types.js';
import { UserWithPasswordEntity } from './user-with-password.entity.js';
import { UserRoleKey } from './libs/enums/user-role-key.enum.js';

class UserRepository implements Repository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .whereNull('deletedAt')
      .findById(id)
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async findByRoleKey(
    key: ValueOf<typeof UserRoleKey>,
  ): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .whereNull('deletedAt')
      .withGraphJoined(UsersRelation.ROLES)
      .findOne({ key })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async isAdminById(userId: number): Promise<boolean> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .whereNull('deletedAt')
      .withGraphJoined(UsersRelation.ROLES)
      .where({ 'users.id': userId, 'users.roleId': 1 })
      .first()
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return false;
    }

    return true;
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: UserWithPasswordEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, username } =
      entity.toNewObject();

    const user = await this.userModel
      .query()
      .insertGraph({
        email,
        passwordSalt,
        passwordHash,
        username,
      } as UserCreateQueryPayload)
      .withGraphJoined(UsersRelation.DETAILS)
      .castTo<UserWithPasswordQueryResponse>();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public async delete(id: number): Promise<number> {
    return await this.userModel
      .query()
      .patch({ deletedAt: new Date().toISOString() })
      .where({ id, deletedAt: null });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .findOne({ email })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .modify('withoutPassword')
      .withGraphJoined(UsersRelation.DETAILS)
      .findOne({ username })
      .castTo<UserCommonQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPasswordEntity | null> {
    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS)
      .whereNull('deletedAt')
      .findOne({ email })
      .castTo<UserWithPasswordQueryResponse | undefined>();

    if (!user) {
      return null;
    }

    return UserWithPasswordEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }

  public async updateAvatar({
    id,
    avatarId,
  }: {
    id: number;
    avatarId: number;
  }): Promise<UserEntity> {
    await this.userModel
      .relatedQuery(UsersRelation.DETAILS)
      .for(id)
      .patch({ avatarId });

    const user = await this.userModel
      .query()
      .withGraphJoined(UsersRelation.DETAILS)
      .findById(id)
      .castTo<UserCommonQueryResponse>();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      username: user.username,
      avatarId: user.details?.avatarId ?? null,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
    });
  }
}

export { UserRepository };
