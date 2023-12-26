import { APIPath, AppRoute } from '~/libs/enums/enums.js';
import { getUrlWithQueryString } from '~/libs/helpers/helpers.js';
import { BaseHttpApi } from '~/libs/packages/api/api.js';
import { type HTTP } from '~/libs/packages/http/http.js';
import { type Storage } from '~/libs/packages/storage/storage.js';

import { TracksApiPath } from './libs/enums/enums.js';
import {
  type TrackCreateRequestDto,
  type TrackCreateResponseDto,
  type TrackGetAllResponseDto,
} from './libs/types/types.js';
import { TrackGetAllItemResponseDto, ValueOf } from 'shared/build/index.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class TrackApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.TRACKS, baseUrl, http, storage });
  }

  public async createTrack({
    title,
    file,
    genreId,
    yearOfPublication,
  }: TrackCreateRequestDto): Promise<TrackCreateResponseDto> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('genreId', genreId.toString());
    formData.append('file', file);
    formData.append(
      'yearOfPublication',
      yearOfPublication
        ? yearOfPublication.toString()
        : new Date().getFullYear().toString(),
    );

    const response = await this.load(
      this.getFullEndpoint(TracksApiPath.ROOT, {}),
      {
        method: 'POST',
        payload: formData,
        hasAuth: true,
      },
    );

    return await response.json<TrackCreateResponseDto>();
  }

  public async getAllTracks(
    query: string,
    page = 1,
    pageSize = 9,
    genreIds = '',
    artistIds = '',
    sort = 'desc',
  ): Promise<TrackGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(TracksApiPath.ROOT, {
          query,
          page: page.toString(),
          pageSize: pageSize.toString(),
          genreIds,
          artistIds,
          sort,
        }),
        {},
      ),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<TrackGetAllResponseDto>();
  }

  public async getPersonalTracks(): Promise<{
    items: TrackGetAllItemResponseDto[];
  }> {
    const response = await this.load(
      this.getFullEndpoint(TracksApiPath.UPLOADED, {}),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<{ items: TrackGetAllItemResponseDto[] }>();
  }

  public async getPersonalLikedTracks(): Promise<{
    items: TrackGetAllItemResponseDto[];
  }> {
    const response = await this.load(
      this.getFullEndpoint(TracksApiPath.LIKED, {}),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<{ items: TrackGetAllItemResponseDto[] }>();
  }

  public async isLikedTrack(trackId: number): Promise<boolean> {
    const response = await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(
          TracksApiPath.IS_LIKED as ValueOf<typeof AppRoute>,
          {
            trackId: trackId.toString(),
          },
        ),
        {},
      ),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<boolean>();
  }

  public async toggleTrack(trackId: number): Promise<void> {
    await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(TracksApiPath.LIKED as ValueOf<typeof AppRoute>, {
          trackId: trackId.toString(),
        }),
        {},
      ),
      {
        method: 'POST',
        hasAuth: true,
      },
    );
  }

  public async deleteTrack(trackId: number): Promise<number> {
    const response = await this.load(
      this.getFullEndpoint(
        getUrlWithQueryString(TracksApiPath.ROOT as ValueOf<typeof AppRoute>, {
          trackId: trackId.toString(),
        }),
        {},
      ),
      {
        method: 'DELETE',
        hasAuth: true,
      },
    );

    return await response.json<number>();
  }
}

export { TrackApi };
