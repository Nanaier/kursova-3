import { APIPath } from '~/libs/enums/enums.js';
import { BaseHttpApi } from '~/libs/packages/api/api.js';
import { type HTTP } from '~/libs/packages/http/http.js';
import { type Storage } from '~/libs/packages/storage/storage.js';

import { ArtistsApiPath } from './libs/enums/enums.js';
import { type ArtistGetAllItemResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ArtistsApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.ARTISTS, baseUrl, http, storage });
  }

  public async getAllArtists(): Promise<{
    items: ArtistGetAllItemResponseDto[];
  }> {
    const response = await this.load(
      this.getFullEndpoint(ArtistsApiPath.ROOT, {}),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<{ items: ArtistGetAllItemResponseDto[] }>();
  }

  public async getArtistById(id: string): Promise<ArtistGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArtistsApiPath.$ID, { id }),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ArtistGetAllItemResponseDto>();
  }
}

export { ArtistsApi };
