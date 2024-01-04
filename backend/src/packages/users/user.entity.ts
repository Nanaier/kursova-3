import { type Entity } from '~/libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private username: string;

  private avatarId: number | null;

  private deletedAt: Date | null;

  public constructor({
    id,
    username,
    createdAt,
    updatedAt,
    avatarId,
    deletedAt,
  }: {
    id: number | null;
    username: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    avatarId: number | null;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatarId = avatarId;
    this.deletedAt = deletedAt;
  }

  public static initialize({
    id,
    username,
    createdAt,
    updatedAt,
    avatarId,
    deletedAt,
  }: {
    id: number | null;
    username: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    avatarId: number | null;
    deletedAt: Date | null;
  }): UserEntity {
    return new UserEntity({
      id,
      username,
      createdAt,
      updatedAt,
      avatarId,
      deletedAt,
    });
  }

  public static initializeNew({ username }: { username: string }): UserEntity {
    return new UserEntity({
      id: null,
      username,
      createdAt: null,
      updatedAt: null,
      avatarId: null,
      deletedAt: null,
    });
  }

  public toObject(): {
    id: number;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    avatarId: number | null;
    deletedAt: Date | null;
  } {
    return {
      id: this.id as number,
      username: this.username,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      avatarId: this.avatarId,
      deletedAt: this.deletedAt as Date,
    };
  }

  public toNewObject(): {
    username: string;
  } {
    return {
      username: this.username,
    };
  }
}

export { UserEntity };
