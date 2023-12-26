import { createSlice } from '@reduxjs/toolkit';
import { type ArtistGetAllItemResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { getAllArtists, getArtistById } from './actions.js';

type State = {
  artist: ArtistGetAllItemResponseDto | null;
  artistDataStatus: ValueOf<typeof DataStatus>;
  artists: ArtistGetAllItemResponseDto[];
  artistsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  artist: null,
  artistDataStatus: DataStatus.IDLE,
  artists: [],
  artistsDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'artists',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllArtists.pending, (state) => {
      state.artistsDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllArtists.fulfilled, (state, action) => {
      state.artists = action.payload.items;
      state.artistsDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllArtists.rejected, (state) => {
      state.artistsDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getArtistById.pending, (state) => {
      state.artistDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getArtistById.fulfilled, (state, action) => {
      state.artist = action.payload;
      state.artistDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getArtistById.rejected, (state) => {
      state.artistDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
