import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerResponse,
  BaseController,
  APIHandlerOptions,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';

import { type GenreService } from './genre.service.js';
import { GenresApiPath } from './libs/enums/enums.js';
import { UserAuthResponseDto } from '../users/users.js';

class GenreController extends BaseController {
  private genreService: GenreService;

  public constructor(logger: Logger, genreService: GenreService) {
    super(logger, APIPath.GENRES);

    this.genreService = genreService;

    this.addRoute({
      path: GenresApiPath.ROOT,
      method: 'GET',
      handler: () => {
        return this.getAll();
      },
    });

    this.addRoute({
      path: GenresApiPath.$ID,
      method: 'GET',
      handler: (options) => {
        return this.getGenreById(
          options as APIHandlerOptions<{
            params: { id: string };
          }>,
        );
      },
    });

    this.addRoute({
      path: GenresApiPath.ROOT,
      method: 'POST',
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: { genreName: string; genreDescription: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /meditation:
   *    get:
   *      description: Get all meditation entries
   *      security:
   *       - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/MeditationEntry'
   */

  private async getAll(): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.genreService.findAll(),
    };
  }

  private async getGenreById(
    options: APIHandlerOptions<{
      params: { id: string };
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.genreService.findById(Number(options.params.id)),
    };
  }

  private async create(
    options: APIHandlerOptions<{
      body: { genreName: string; genreDescription: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.genreService.create({
        userId: options.user.id,
        genreName: options.body.genreName,
        genreDescription: options.body.genreDescription,
      }),
    };
  }
}

export { GenreController };
