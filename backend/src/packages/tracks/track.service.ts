import { ExceptionMessage } from '~/libs/enums/enums.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Service } from '~/libs/types/types.js';
import { type FileService } from '~/packages/files/file.service.js';
import { type FileUploadRequestDto } from '~/packages/files/files.js';

import { type ArtistService } from '../artists/artist.service.js';
import { type GenreService } from '../genres/genre.service.js';
import { type ImageService } from '../images/image.service.js';
import { TrackError } from './libs/exceptions/track-error.exception.js';
import {
  type TrackGetAllItemResponseDto,
  type TrackGetAllResponseDto,
} from './libs/types/types.js';
import { TrackEntity } from './track.entity.js';
import { type TrackRepository } from './track.repository.js';
import { UserService } from '../users/user.service.js';

class TrackService implements Service {
  private trackRepository: TrackRepository;

  private fileService: FileService;

  private imageService: ImageService;

  private genreService: GenreService;

  private artistService: ArtistService;

  private userService: UserService;

  public constructor(
    trackRepository: TrackRepository,
    imageService: ImageService,
    genreService: GenreService,
    artistService: ArtistService,
    fileService: FileService,
    userService: UserService,
  ) {
    this.trackRepository = trackRepository;
    this.imageService = imageService;
    this.genreService = genreService;
    this.artistService = artistService;
    this.fileService = fileService;
    this.userService = userService;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async isTrackLiked(userId: number, trackId: number): Promise<boolean> {
    return await this.trackRepository.isTrackLiked(userId, trackId);
  }

  public async toggleTrackLike(userId: number, trackId: number): Promise<void> {
    return await this.trackRepository.toggleTrackLike(userId, trackId);
  }

  public async findAllWithPagination(
    query: string,
    page?: number,
    pageSize?: number,
    genreIds?: number[],
    artistIds?: number[],
    sort?: 'asc' | 'desc',
  ): Promise<{
    items: TrackGetAllResponseDto;
    totalItems: number;
    totalPages: number;
  }> {
    const items = await this.trackRepository.findAllWithPagination(
      query,
      page,
      pageSize,
      genreIds,
      artistIds,
      sort,
    );

    return {
      items: {
        items: items.data.map((item) => {
          return item.toObject();
        }),
      },
      totalItems: items.totalItems,
      totalPages: items.totalPages,
    };
  }

  public async findByUsername(
    username: string,
  ): Promise<TrackGetAllResponseDto> {
    const artist = await this.artistService.findByArtistUsername(username);

    if (!artist) {
      return { items: [] };
    }

    const items = await this.trackRepository.findByArtistId(artist.id);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async findLikedById(userId: number): Promise<TrackGetAllResponseDto> {
    const items = await this.trackRepository.findLikedByUserId(userId);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async deleteById(userId: number, trackId: number): Promise<number> {
    const isAdmin = await this.userService.isAdminById(userId);
    if (!isAdmin) {
      throw new TrackError({
        message: ExceptionMessage.NO_USER_PERMISSION,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    const deletedTrack = await this.trackRepository.deleteById(trackId);

    if (!deletedTrack) {
      throw new TrackError({
        message: ExceptionMessage.NO_TRACK_FOUND,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    const objTrack = deletedTrack.toObject();

    await this.fileService.deleteById(objTrack.fileId);

    return objTrack.id;
  }

  public async create({
    title,
    file,
    username,
    genreId,
    yearOfPublication,
  }: {
    title: string;
    file: FileUploadRequestDto;
    username: string;
    genreId: string;
    yearOfPublication: string;
  }): Promise<TrackGetAllItemResponseDto> {
    const { id, url } = await this.fileService.create(file);

    const image = await this.imageService.getBasicImage();

    if (!image) {
      throw new TrackError({
        message: ExceptionMessage.NO_IMAGE_FOUND,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    const genre = await this.genreService.findById(Number(genreId));

    if (!genre) {
      throw new TrackError({
        message: ExceptionMessage.NO_GENRE_FOUND,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    let artist = await this.artistService.findByArtistUsername(username);

    if (!artist) {
      artist = await this.artistService.create({
        artistName: username,
        artistUsername: username,
        description: 'An independent music creator.',
        imageId: image.id,
      });
      console.log(artist);
    }

    const item = await this.trackRepository.create(
      TrackEntity.initializeNew({
        title,
        yearOfPublication: Number(yearOfPublication),
        fileId: id,
        fileUrl: url,
        genreId: Number(genreId),
        genreName: genre.genreName,
        imageId: image.id,
        imageUrl: image.url,
        artistId: artist.id,
        artistName: artist.artistName,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { TrackService };
