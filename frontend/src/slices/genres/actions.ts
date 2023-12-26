import { createAsyncThunk } from '@reduxjs/toolkit';
import { type GenreGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/types.js';

import { name as sliceName } from './genre.slice.js';
import { appActions } from '../app/app-notification.js';

const getAllGenres = createAsyncThunk<
  { items: GenreGetAllItemResponseDto[] },
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-genres`, async (_, { extra }) => {
  const { genreApi } = extra;

  return await genreApi.getAllGenres();
});

const getGenreById = createAsyncThunk<
  GenreGetAllItemResponseDto,
  { id: string },
  AsyncThunkConfig
>(`${sliceName}/get-genre-by-id`, async (id, { extra }) => {
  const { genreApi } = extra;

  return await genreApi.getGenreById(id.id);
});

const createGenre = createAsyncThunk<
  GenreGetAllItemResponseDto,
  {
    genreName: string;
    genreDescription: string;
  },
  AsyncThunkConfig
>(`${sliceName}/create-genre`, async (payload, { extra, dispatch }) => {
  const { genreApi } = extra;
  const genre = await genreApi.createGenre(payload);
  void dispatch(
    appActions.notify({
      type: 'success',
      message: `Genre '${genre.genreName}' was added.`,
    }),
  );
  return genre;
});

export { getAllGenres, getGenreById, createGenre };
