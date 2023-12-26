type GenreCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  genreName: string;
  genreDescription: string;
  images: {
    imageId: number;
  };
};

export { type GenreCommonQueryResponse };
