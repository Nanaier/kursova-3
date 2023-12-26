import { type Entity } from '~/libs/types/types.js';

class ArtistEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private artistName: string;

  private artistUsername: string;

  private description: string;

  private imageId: number;

  private imageUrl: string;

  private constructor({
    id,
    artistName,
    artistUsername,
    description,
    createdAt,
    updatedAt,
    imageId,
    imageUrl,
  }: {
    id: number | null;
    artistName: string;
    artistUsername: string;
    description: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    imageId: number;
    imageUrl: string;
  }) {
    this.id = id;
    this.artistName = artistName;
    this.artistUsername = artistUsername;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
  }

  public static initialize({
    id,
    artistName,
    artistUsername,
    description,
    createdAt,
    updatedAt,
    imageId,
    imageUrl,
  }: {
    id: number;
    artistName: string;
    artistUsername: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    imageId: number;
    imageUrl: string;
  }): ArtistEntity {
    return new ArtistEntity({
      id,
      artistName,
      artistUsername,
      description,
      createdAt,
      updatedAt,
      imageId,
      imageUrl,
    });
  }

  public static initializeNew({
    artistName,
    artistUsername,
    description,
    imageId,
    imageUrl,
  }: {
    artistName: string;
    artistUsername: string;
    description: string;
    imageId: number;
    imageUrl: string;
  }): ArtistEntity {
    return new ArtistEntity({
      id: null,
      artistName,
      artistUsername,
      description,
      createdAt: null,
      updatedAt: null,
      imageId,
      imageUrl,
    });
  }

  public toObject(): {
    id: number;
    artistName: string;
    artistUsername: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    imageId: number;
    imageUrl: string;
  } {
    return {
      id: this.id as number,
      artistName: this.artistName,
      artistUsername: this.artistUsername,
      description: this.description,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
    };
  }

  public toNewObject(): {
    artistName: string;
    artistUsername: string;
    description: string;
    imageId: number;
    imageUrl: string;
  } {
    return {
      artistName: this.artistName,
      artistUsername: this.artistUsername,
      description: this.description,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
    };
  }
}

export { ArtistEntity };
