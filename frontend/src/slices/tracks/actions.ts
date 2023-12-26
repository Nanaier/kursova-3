import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  TrackGetAllItemResponseDto,
  type TrackCreateRequestDto,
  type TrackCreateResponseDto,
  type TrackGetAllResponseDto,
} from '~/packages/tracks/tracks.js';
import { appActions } from '~/slices/app/app-notification.js';

import { name as sliceName } from './track.slice.js';

const createTrack = createAsyncThunk<
  TrackCreateResponseDto,
  TrackCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-track`, async (payload, { extra, dispatch }) => {
  const { trackApi } = extra;
  if (!payload.title) {
    throw new Error(`Add title to the track.`);
  }

  if (payload.genreId === -1) {
    throw new Error(`Add genre to the track.`);
  }

  if (!payload.file) {
    throw new Error(`Add file to the track.`);
  }

  const item = await trackApi.createTrack(payload);

  void dispatch(
    appActions.notify({
      type: 'success',
      message: `Track '${payload.title}' was added.`,
    }),
  );

  void dispatch(
    getAllTracks({
      query: '',
      page: 1,
      pageSize: 9,
    }),
  );

  return item;
});

const getLatestUploaded = createAsyncThunk<
  { items: TrackGetAllItemResponseDto[] },
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-latest-uploaded`, async (_, { extra }) => {
  const { trackApi } = extra;

  return await trackApi.getPersonalTracks();
});

const getLatestLiked = createAsyncThunk<
  { items: TrackGetAllItemResponseDto[] },
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-latest-liked`, async (_, { extra }) => {
  const { trackApi } = extra;

  return await trackApi.getPersonalLikedTracks();
});

const getAllTracks = createAsyncThunk<
  TrackGetAllResponseDto,
  {
    query: string;
    page?: number;
    pageSize?: number;
    genreIds?: string;
    artistIds?: string;
    sort?: string;
  },
  AsyncThunkConfig
>(`${sliceName}/get-all-tracks`, async (query, { extra }) => {
  const { trackApi } = extra;

  return await trackApi.getAllTracks(
    query.query,
    query.page,
    query.pageSize,
    query.genreIds,
    query.artistIds,
    query.sort,
  );
});

const isLikedTrack = createAsyncThunk<
  boolean,
  {
    trackId: number;
  },
  AsyncThunkConfig
>(`${sliceName}/is-liked-track`, async (id, { extra }) => {
  const { trackApi } = extra;

  return await trackApi.isLikedTrack(id.trackId);
});

const toggleTrack = createAsyncThunk<
  void,
  {
    trackId: number;
  },
  AsyncThunkConfig
>(`${sliceName}/toggle-track`, async (id, { extra, dispatch }) => {
  const { trackApi } = extra;
  await trackApi.toggleTrack(id.trackId);

  void dispatch(
    isLikedTrack({
      trackId: id.trackId,
    }),
  );
});

const deleteTrack = createAsyncThunk<
  number,
  {
    track: TrackGetAllItemResponseDto;
  },
  AsyncThunkConfig
>(`${sliceName}/delete-track`, async (track, { extra, dispatch }) => {
  const { trackApi } = extra;
  const deletedTrackId = await trackApi.deleteTrack(track.track.id);

  void dispatch(
    appActions.notify({
      type: 'success',
      message: `Track '${track.track.title}' was deleted.`,
    }),
  );

  return deletedTrackId;
});

export {
  createTrack,
  getAllTracks,
  isLikedTrack,
  toggleTrack,
  getLatestLiked,
  getLatestUploaded,
  deleteTrack,
};
