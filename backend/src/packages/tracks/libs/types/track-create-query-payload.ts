type TrackCreateQueryPayload = {
  id: number;
  title: string;
  yearOfPublication?: number;
  fileId: number;
  artistId: number;
  genreId: number;
  imageId: number;
};

export { type TrackCreateQueryPayload };