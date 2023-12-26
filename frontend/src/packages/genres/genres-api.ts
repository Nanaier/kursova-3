import { APIPath, ContentType } from '~/libs/enums/enums.js';
import { BaseHttpApi } from '~/libs/packages/api/api.js';
import { type HTTP } from '~/libs/packages/http/http.js';
import { type Storage } from '~/libs/packages/storage/storage.js';

import { GenresApiPath } from './libs/enums/enums.js';
import { type GenreGetAllItemResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class GenreApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.GENRES, baseUrl, http, storage });
  }

  public async getAllGenres(): Promise<{
    items: GenreGetAllItemResponseDto[];
  }> {
    const response = await this.load(
      this.getFullEndpoint(GenresApiPath.ROOT, {}),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<{ items: GenreGetAllItemResponseDto[] }>();
  }

  public async getGenreById(id: string): Promise<GenreGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(GenresApiPath.$ID, { id }),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<GenreGetAllItemResponseDto>();
  }

  public async createGenre(payload: {
    genreName: string;
    genreDescription: string;
  }): Promise<GenreGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(GenresApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<GenreGetAllItemResponseDto>();
  }
}

export { GenreApi };
