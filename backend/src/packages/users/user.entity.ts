import { type Entity } from '~/libs/types/types.js';

class UserEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private email: string;

  private username: string;

  private avatarId: number | null;

  private deletedAt: Date | null;

  public constructor({
    id,
    email,
    username,
    createdAt,
    updatedAt,
    avatarId,
    deletedAt,
  }: {
    id: number | null;
    email: string;
    username: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    avatarId: number | null;
    deletedAt: Date | null;
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatarId = avatarId;
    this.deletedAt = deletedAt;
  }

  public static initialize({
    id,
    email,
    username,
    createdAt,
    updatedAt,
    avatarId,
    deletedAt,
  }: {
    id: number | null;
    email: string;
    username: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    avatarId: number | null;
    deletedAt: Date | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      username,
      createdAt,
      updatedAt,
      avatarId,
      deletedAt,
    });
  }

  public static initializeNew({
    email,
    username,
  }: {
    email: string;
    username: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      username,
      createdAt: null,
      updatedAt: null,
      avatarId: null,
      deletedAt: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    avatarId: number | null;
    deletedAt: Date | null;
  } {
    return {
      id: this.id as number,
      email: this.email,
      username: this.username,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      avatarId: this.avatarId,
      deletedAt: this.deletedAt as Date,
    };
  }

  public toNewObject(): {
    email: string;
    username: string;
  } {
    return {
      email: this.email,
      username: this.username,
    };
  }
}

export { UserEntity };
