import { ExceptionMessage } from '~/libs/enums/enums.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Service } from '~/libs/types/types.js';

import { type ImageService } from '../images/image.service.js';
import { ArtistEntity } from './artist.entity.js';
import { type ArtistRepository } from './artist.repository.js';
import { ArtistError } from './libs/exceptions/artist-error.exception.js';
import {
  type ArtistCreateQueryPayload,
  type ArtistGetAllItemResponseDto,
  type ArtistsCommonQueryResponse,
} from './libs/types/types.js';

type ArtistServiceDependencies = {
  artistRepository: ArtistRepository;
  imageService: ImageService;
};

class ArtistService implements Service {
  private artistRepository: ArtistRepository;

  private imageService: ImageService;

  public constructor({
    artistRepository,
    imageService,
  }: ArtistServiceDependencies) {
    this.artistRepository = artistRepository;
    this.imageService = imageService;
  }

  public async findById(
    id: number,
  ): Promise<ReturnType<ArtistEntity['toObject']> | null> {
    const artist = await this.artistRepository.findById(id);

    return artist?.toObject() ?? null;
  }

  public async findByArtistUsername(
    artistUsername: string,
  ): Promise<ReturnType<ArtistEntity['toObject']> | null> {
    const artist = await this.artistRepository.findByArtistUsername(
      artistUsername,
    );

    return artist?.toObject() ?? null;
  }

  public async findAll(): Promise<ArtistsCommonQueryResponse> {
    const artists = await this.artistRepository.findAll();

    return { items: artists };
  }

  public async create(
    payload: ArtistCreateQueryPayload,
  ): Promise<ArtistGetAllItemResponseDto> {
    const { artistName, artistUsername, description } = payload;

    const artist = await this.artistRepository.findByArtistUsername(
      artistUsername,
    );

    const image = await this.imageService.getBasicImage();

    if (!image) {
      throw new ArtistError({
        message: ExceptionMessage.FILE_UPLOAD_FAILED,
        status: HTTPCode.BAD_REQUEST,
      });
    }

    if (!artist) {
      const createdArtist = await this.artistRepository.create(
        ArtistEntity.initializeNew({
          artistName,
          artistUsername,
          description,
          imageId: image.id,
          imageUrl: image.url,
        }),
      );

      return createdArtist.toObject();
    }

    throw new ArtistError({
      message: ExceptionMessage.ARTIST_ALREADY_EXISTS,
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

export { ArtistService };
