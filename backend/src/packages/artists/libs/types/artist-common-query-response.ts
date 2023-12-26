import { ContentType, ValueOf } from 'shared/build/index.js';

type ArtistCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  artistName: string;
  artistUsername: string;
  description: string;
  images: {
    id: number;
    files: {
      id: number;
      url: string;
      contentType: ValueOf<typeof ContentType>;
    };
  };
};

export { type ArtistCommonQueryResponse };
