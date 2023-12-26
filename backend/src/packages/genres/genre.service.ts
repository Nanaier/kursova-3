import { ExceptionMessage } from '~/libs/enums/enums.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Service } from '~/libs/types/types.js';

import { type ImageService } from '../images/image.service.js';
import { GenreEntity } from './genre.entity.js';
import { type GenreRepository } from './genre.repository.js';
import { GenreError } from './libs/exceptions/exceptions.js';
import {
  type GenreCreateQueryPayload,
  type GenreGetAllItemResponseDto,
  type GenresCommonQueryResponse,
} from './libs/types/types.js';
import { UserService } from '../users/user.service.js';

type GenreServiceDependencies = {
  genreRepository: GenreRepository;
  imageService: ImageService;
  userService: UserService;
};

class GenreService implements Service {
  private genreRepository: GenreRepository;

  private imageService: ImageService;

  private userService: UserService;

  public constructor({
    genreRepository,
    imageService,
    userService,
  }: GenreServiceDependencies) {
    this.genreRepository = genreRepository;
    this.imageService = imageService;
    this.userService = userService;
  }

  public async findById(
    id: number,
  ): Promise<ReturnType<GenreEntity['toObject']> | null> {
    const genre = await this.genreRepository.findById(id);

    return genre?.toObject() ?? null;
  }

  public async findAll(): Promise<GenresCommonQueryResponse> {
    const genres = await this.genreRepository.findAll();

    return { items: genres };
  }

  public async create(payload: {
    userId: number;
    genreName: string;
    genreDescription: string;
  }): Promise<GenreGetAllItemResponseDto> {
    const isAdmin = await this.userService.isAdminById(payload.userId);
    if (!isAdmin) {
      throw new GenreError({
        message: ExceptionMessage.NO_USER_PERMISSION,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    const { genreName, genreDescription } = payload;

    const genre = await this.genreRepository.findByGenreName(genreName);

    const image = await this.imageService.getBasicImage();

    if (!image) {
      throw new GenreError({
        message: ExceptionMessage.FILE_UPLOAD_FAILED,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    if (!genre) {
      const createdGenre = await this.genreRepository.create(
        GenreEntity.initializeNew({
          genreName,
          genreDescription,
          imageId: image.id,
          imageUrl: image.url,
        }),
      );

      return createdGenre.toObject();
    }

    throw new GenreError({
      message: ExceptionMessage.GENRE_ALREADY_EXISTS,
      status: HTTPCode.BAD_REQUEST,
    });
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { GenreService };
