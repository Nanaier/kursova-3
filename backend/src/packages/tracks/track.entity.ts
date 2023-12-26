import { type Entity } from '~/libs/types/types.js';

class TrackEntity implements Entity {
  private id: number | null;

  private title: string;

  private yearOfPublication: number;

  private fileId: number;

  private fileUrl: string;

  private artistId: number;

  private artistName: string;

  private genreId: number;

  private genreName: string;

  private imageId: number;

  private imageUrl: string;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  public constructor({
    id,
    title,
    yearOfPublication,
    fileId,
    fileUrl,
    artistId,
    artistName,
    genreId,
    genreName,
    imageId,
    imageUrl,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    title: string;
    yearOfPublication: number;
    fileId: number;
    fileUrl: string;
    artistId: number;
    artistName: string;
    genreId: number;
    genreName: string;
    imageId: number;
    imageUrl: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.title = title;
    this.yearOfPublication = yearOfPublication;
    this.fileId = fileId;
    this.fileUrl = fileUrl;
    this.artistId = artistId;
    this.artistName = artistName;
    this.genreId = genreId;
    this.genreName = genreName;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    title,
    yearOfPublication,
    fileId,
    fileUrl,
    artistId,
    artistName,
    genreId,
    genreName,
    imageId,
    imageUrl,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    title: string;
    yearOfPublication: number;
    fileId: number;
    fileUrl: string;
    artistId: number;
    artistName: string;
    genreId: number;
    genreName: string;
    imageId: number;
    imageUrl: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): TrackEntity {
    return new TrackEntity({
      id,
      title,
      yearOfPublication,
      fileId,
      fileUrl,
      artistId,
      artistName,
      genreId,
      genreName,
      imageId,
      imageUrl,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    title,
    yearOfPublication,
    fileId,
    fileUrl,
    artistId,
    artistName,
    genreId,
    genreName,
    imageId,
    imageUrl,
  }: {
    title: string;
    yearOfPublication: number;
    fileId: number;
    fileUrl: string;
    artistId: number;
    artistName: string;
    genreId: number;
    genreName: string;
    imageId: number;
    imageUrl: string;
  }): TrackEntity {
    return new TrackEntity({
      id: null,
      title,
      yearOfPublication,
      fileId,
      fileUrl,
      artistId,
      artistName,
      genreId,
      genreName,
      imageId,
      imageUrl,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    title: string;
    yearOfPublication: number;
    fileId: number;
    fileUrl: string;
    artistId: number;
    artistName: string;
    genreId: number;
    genreName: string;
    imageId: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      title: this.title,
      yearOfPublication: this.yearOfPublication,
      fileId: this.fileId,
      fileUrl: this.fileUrl,
      artistId: this.artistId,
      artistName: this.artistName,
      genreId: this.genreId,
      genreName: this.genreName,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    title: string;
    yearOfPublication: number;
    fileId: number;
    fileUrl: string;
    artistId: number;
    artistName: string;
    genreId: number;
    genreName: string;
    imageId: number;
    imageUrl: string;
  } {
    return {
      title: this.title,
      yearOfPublication: this.yearOfPublication,
      fileId: this.fileId,
      fileUrl: this.fileUrl,
      artistId: this.artistId,
      artistName: this.artistName,
      genreId: this.genreId,
      genreName: this.genreName,
      imageId: this.imageId,
      imageUrl: this.imageUrl,
    };
  }
}

export { TrackEntity };
