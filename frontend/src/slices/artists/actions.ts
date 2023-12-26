import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ArtistGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/types.js';

import { name as sliceName } from './artists.slice.js';

const getAllArtists = createAsyncThunk<
  { items: ArtistGetAllItemResponseDto[] },
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-artists`, async (_, { extra }) => {
  const { artistsApi } = extra;

  return await artistsApi.getAllArtists();
});

const getArtistById = createAsyncThunk<
  ArtistGetAllItemResponseDto,
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/get-artist-by-id`, async (id, { extra }) => {
  const { artistsApi } = extra;

  return await artistsApi.getArtistById(id.id);
});

export { getAllArtists, getArtistById };
