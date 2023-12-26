import { type MultipartFile, type MultipartValue } from '@fastify/multipart';

type TrackCreateRequestDto = {
  title: MultipartValue<string>;
  file: MultipartFile;
  genreId: MultipartValue<string>;
  yearOfPublication: MultipartValue<string>;
};

export { type TrackCreateRequestDto };
