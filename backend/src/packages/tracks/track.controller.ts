import { type EntitiesFilteringDto } from 'shared/build/index.js';

import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';
import { type FileUploadRequestDto } from '~/packages/files/files.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { TracksApiPath } from './libs/enums/enums.js';
import { type TrackCreateRequestDto } from './libs/types/types.js';
import { type TrackService } from './track.service.js';
import { createTrackEntryFormValidationSchema } from './libs/validation-schemas/validation-schemas.js';

class TrackController extends BaseController {
  private trackService: TrackService;

  public constructor(logger: Logger, trackService: TrackService) {
    super(logger, APIPath.TRACKS);

    this.trackService = trackService;

    this.addRoute({
      path: TracksApiPath.ROOT,
      method: 'POST',
      validation: {
        body: createTrackEntryFormValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: TrackCreateRequestDto;
            fileBuffer: FileUploadRequestDto;
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.ROOT,
      method: 'GET',
      handler: (options) => {
        return this.getAll(
          options as APIHandlerOptions<{ query: EntitiesFilteringDto }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.UPLOADED,
      method: 'GET',
      handler: (options) => {
        return this.getTracksForUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.LIKED,
      method: 'GET',
      handler: (options) => {
        return this.getLikedTracksForUser(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.IS_LIKED,
      method: 'GET',
      handler: (options) => {
        return this.isTrackLiked(
          options as APIHandlerOptions<{
            query: { trackId: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.LIKED,
      method: 'POST',
      handler: (options) => {
        return this.toggleLiked(
          options as APIHandlerOptions<{
            query: { trackId: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: TracksApiPath.ROOT,
      method: 'DELETE',
      handler: (options) => {
        return this.deleteById(
          options as APIHandlerOptions<{
            query: { trackId: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  private async create(
    options: APIHandlerOptions<{
      body: TrackCreateRequestDto;
      fileBuffer: FileUploadRequestDto;
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.trackService.create({
        title: options.body.title.value,
        file: options.fileBuffer,
        username: options.user.username,
        genreId: options.body.genreId.value,
        yearOfPublication: options.body.yearOfPublication.value,
      }),
    };
  }

  private async getAll(
    options: APIHandlerOptions<{
      query: EntitiesFilteringDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.findAllWithPagination(
        options.query.query,
        Number(options.query.page),
        Number(options.query.pageSize),
        options.query.genreIds
          ? options.query.genreIds.split(',').map(Number)
          : [],
        options.query.artistIds
          ? options.query.artistIds.split(',').map(Number)
          : [],
        options.query.sort,
      ),
    };
  }

  private async getTracksForUser(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.findByUsername(options.user.username),
    };
  }

  private async getLikedTracksForUser(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.findLikedById(options.user.id),
    };
  }

  private async isTrackLiked(
    options: APIHandlerOptions<{
      query: { trackId: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.isTrackLiked(
        options.user.id,
        Number(options.query.trackId),
      ),
    };
  }

  private async toggleLiked(
    options: APIHandlerOptions<{
      query: { trackId: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.toggleTrackLike(
        options.user.id,
        Number(options.query.trackId),
      ),
    };
  }

  private async deleteById(
    options: APIHandlerOptions<{
      query: { trackId: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.trackService.deleteById(
        options.user.id,
        Number(options.query.trackId),
      ),
    };
  }
}

export { TrackController };
