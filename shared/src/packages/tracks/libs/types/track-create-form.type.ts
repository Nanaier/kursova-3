type TrackCreateForm = {
  title: string;
  file: {
    data: File;
    type: string;
    size: number;
  } | null;
  genreId: number;
  yearOfPublication: number;
};

export { type TrackCreateForm };
