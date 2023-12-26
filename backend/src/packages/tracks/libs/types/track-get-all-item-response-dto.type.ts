type TrackGetAllItemResponseDto = {
  id: number;
  title: string;
  yearOfPublication: number;
  fileId: number;
  fileUrl: string;
  artistId: number;
  artistName: string;
  genreId: number;
  genreName: string;
  imageId: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export { type TrackGetAllItemResponseDto };
