import { type ContentType, type ValueOf } from 'shared/build/index.js';

type GenreCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  genreName: string;
  genreDescription: string;
  images: {
    id: number;
    files: {
      id: number;
      url: string;
      contentType: ValueOf<typeof ContentType>;
    };
  };
};

export { type GenreCommonQueryResponse };
