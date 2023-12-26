import { type Entity } from '~/libs/types/types.js';

class GenreEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private genreName: string;

  private genreDescription: string;

  private imageId: number;

  private imageUrl: string;

  private constructor({
    id,
    genreName,
    genreDescription,
    createdAt,
    updatedAt,
    imageId,
    imageUrl,
  }: {
    id: number | null;
    genreName: string;
    genreDescription: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    imageId: number;
    imageUrl: string;
  }) {
    this.id = id;
    this.genreName = genreName;
    this.genreDescription = genreDescription;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
  }

  public static initialize({
    id,
    genreName,
    genreDescription,
    createdAt,
    updatedAt,
    imageId,
    imageUrl,
  }: {
    id: number;
    genreName: string;
    genreDescription: string;
    createdAt: Date;
    updatedAt: Date;
    imageId: number;
    imageUrl: string;
  }): GenreEntity {
    return new GenreEntity({
      id,
      genreName,
      genreDescription,
      createdAt,
      updatedAt,
      imageId,
      imageUrl,
    });
  }

  public static initializeNew({
    genreName,
    genreDescription,
    imageId,
    imageUrl,
  }: {
    genreName: string;
    genreDescription: string;
    imageId: number;
    imageUrl: string;
  }): GenreEntity {
    return new GenreEntity({
      id: null,
      genreName,
      genreDescription,
      createdAt: null,
      updatedAt: null,
      imageId,
      imageUrl,
    });
  }

  public toObject(): {
    id: number;
    genreName: string;
    genreDescription: string;
    createdAt: Date;
    updatedAt: Date;
    imageId: number;
    imageUrl: string;
  } {
    return {
      id: this.id as number,
      genreName: this.genreName,
      genreDescription: this.genreDescription,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
    };
  }

  public toNewObject(): {
    genreName: string;
    genreDescription: string;
    imageId: number;
    imageUrl: string;
  } {
    return {
      genreName: this.genreName,
      genreDescription: this.genreDescription,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
    };
  }
}

export { GenreEntity };
