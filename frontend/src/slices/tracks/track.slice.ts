import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type TrackCreateResponseDto } from '~/packages/tracks/tracks.js';

import {
  createTrack,
  getAllTracks,
  isLikedTrack,
  toggleTrack,
  getLatestLiked,
  getLatestUploaded,
  deleteTrack,
} from './actions.js';

type State = {
  tracks: TrackCreateResponseDto[];
  latestUploaded: TrackCreateResponseDto[];
  latestUploadedDataStatus: ValueOf<typeof DataStatus>;
  latestLiked: TrackCreateResponseDto[];
  latestLikedDataStatus: ValueOf<typeof DataStatus>;
  isLiked: boolean;
  isLikedDataStatus: ValueOf<typeof DataStatus>;
  tracksDataStatus: ValueOf<typeof DataStatus>;
  previewTracks: TrackCreateResponseDto[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

const initialState: State = {
  tracks: [],
  latestUploaded: [],
  latestUploadedDataStatus: DataStatus.IDLE,
  latestLiked: [],
  latestLikedDataStatus: DataStatus.IDLE,
  isLiked: false,
  isLikedDataStatus: DataStatus.IDLE,
  tracksDataStatus: DataStatus.IDLE,
  previewTracks: [],
  currentPage: 1,
  itemsPerPage: 9,
  totalItems: 0,
  totalPages: 1,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'tracks',
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload as number;
    },
    setPreviewTracks: (state, action) => {
      state.previewTracks = action.payload as TrackCreateResponseDto[];
    },
  },
  extraReducers(builder) {
    builder.addCase(createTrack.pending, (state) => {
      state.tracksDataStatus = DataStatus.PENDING;
    });
    builder.addCase(createTrack.fulfilled, (state, action) => {
      state.tracks.push(action.payload);
      state.totalItems += 1;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      state.previewTracks = state.tracks.slice(0, state.itemsPerPage);
      state.tracksDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.tracksDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getAllTracks.pending, (state) => {
      state.tracksDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAllTracks.fulfilled, (state, action) => {
      state.tracks = action.payload.items.items;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.previewTracks = state.tracks;
      state.tracksDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllTracks.rejected, (state) => {
      state.tracksDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(isLikedTrack.pending, (state) => {
      state.isLikedDataStatus = DataStatus.PENDING;
    });
    builder.addCase(isLikedTrack.fulfilled, (state, action) => {
      state.isLiked = action.payload;
      state.isLikedDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(isLikedTrack.rejected, (state) => {
      state.isLikedDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(toggleTrack.pending, (state) => {
      state.isLikedDataStatus = DataStatus.PENDING;
    });
    builder.addCase(toggleTrack.fulfilled, (state, action) => {
      state.isLikedDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(toggleTrack.rejected, (state) => {
      state.isLikedDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getLatestLiked.pending, (state) => {
      state.latestLikedDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getLatestLiked.fulfilled, (state, action) => {
      state.latestLiked = action.payload.items;
      state.tracks = [];
      state.tracks.push(...state.latestLiked, ...state.latestUploaded);
      state.latestLikedDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getLatestLiked.rejected, (state) => {
      state.latestLikedDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getLatestUploaded.pending, (state) => {
      state.latestUploadedDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getLatestUploaded.fulfilled, (state, action) => {
      state.latestUploaded = action.payload.items;
      state.tracks = [];
      state.tracks.push(...state.latestUploaded, ...state.latestLiked);
      state.latestUploadedDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getLatestUploaded.rejected, (state) => {
      state.latestUploadedDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.tracksDataStatus = DataStatus.PENDING;
    });

    builder.addCase(deleteTrack.fulfilled, (state, action) => {
      const deletedTrackId = action.payload;
      state.tracks = state.tracks.filter(
        (track) => track.id !== deletedTrackId,
      );
      state.totalItems -= 1;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      state.previewTracks = state.tracks;
      state.tracksDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(deleteTrack.rejected, (state) => {
      state.tracksDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
