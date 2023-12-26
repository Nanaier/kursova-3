import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type TrackCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  yearOfPublication: number;
  fileId: number;
  artistId: number;
  genreId: number;
  imageId: number;
  artists: {
    id: number;
    artistName: string;
  };
  genres: {
    id: number;
    genreName: string;
  };
  files: {
    id: number;
    url: string;
    contentType: ValueOf<typeof ContentType>;
  };
  images: {
    id: number;
    files: {
      id: number;
      url: string;
      contentType: ValueOf<typeof ContentType>;
    };
  };
};

export { type TrackCommonQueryResponse };
