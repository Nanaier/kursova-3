import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerResponse,
  BaseController,
  APIHandlerOptions,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';

import { type ArtistService } from './artist.service.js';
import { ArtistsApiPath } from './libs/enums/enums.js';

class ArtistController extends BaseController {
  private artistService: ArtistService;

  public constructor(logger: Logger, artistService: ArtistService) {
    super(logger, APIPath.ARTISTS);

    this.artistService = artistService;

    this.addRoute({
      path: ArtistsApiPath.ROOT,
      method: 'GET',
      handler: () => {
        return this.getAll();
      },
    });

    this.addRoute({
      path: ArtistsApiPath.$ID,
      method: 'GET',
      handler: (options) => {
        return this.getArtistById(
          options as APIHandlerOptions<{
            params: { id: string };
          }>,
        );
      },
    });
  }

  private async getAll(): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.artistService.findAll(),
    };
  }

  private async getArtistById(
    options: APIHandlerOptions<{
      params: { id: string };
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.artistService.findById(Number(options.params.id)),
    };
  }
}

export { ArtistController };
