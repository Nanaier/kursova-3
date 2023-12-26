import { type Entity } from '~/libs/types/types.js';

class ImageEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private fileId: number;

  private isBasicImage: boolean;

  private url: string;

  private constructor({
    id,
    fileId,
    url,
    isBasicImage,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    fileId: number;
    url: string;
    isBasicImage: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.fileId = fileId;
    this.url = url;
    this.isBasicImage = isBasicImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    fileId,
    url,
    isBasicImage,
    createdAt,
    updatedAt,
  }: {
    id: number;
    fileId: number;
    url: string;
    isBasicImage: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): ImageEntity {
    return new ImageEntity({
      id,
      fileId,
      url,
      isBasicImage,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    fileId,
    url,
    isBasicImage,
  }: {
    fileId: number;
    url: string;
    isBasicImage: boolean;
  }): ImageEntity {
    return new ImageEntity({
      id: null,
      fileId,
      url,
      isBasicImage,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    fileId: number;
    url: string;
    isBasicImage: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      fileId: this.fileId,
      url: this.url,
      isBasicImage: this.isBasicImage,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    fileId: number;
    url: string;
    isBasicImage: boolean;
  } {
    return {
      fileId: this.fileId,
      url: this.url,
      isBasicImage: this.isBasicImage,
    };
  }
}

export { ImageEntity };
