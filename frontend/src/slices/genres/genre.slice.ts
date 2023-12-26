import { createSlice } from '@reduxjs/toolkit';
import { type GenreGetAllItemResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { getAllGenres, getGenreById, createGenre } from './actions.js';

type State = {
  genre: GenreGetAllItemResponseDto | null;
  genreDataStatus: ValueOf<typeof DataStatus>;
  genres: GenreGetAllItemResponseDto[];
  genresDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  genre: null,
  genreDataStatus: DataStatus.IDLE,
  genres: [],
  genresDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'genres',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllGenres.pending, (state) => {
      state.genresDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
      state.genres = action.payload.items;
      state.genresDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllGenres.rejected, (state) => {
      state.genresDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getGenreById.pending, (state) => {
      state.genreDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getGenreById.fulfilled, (state, action) => {
      state.genre = action.payload;
      state.genreDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getGenreById.rejected, (state) => {
      state.genreDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(createGenre.pending, (state) => {
      state.genreDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createGenre.fulfilled, (state, action) => {
      state.genreDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createGenre.rejected, (state) => {
      state.genreDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
