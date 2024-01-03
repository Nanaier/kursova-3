import { ContentType } from '~/libs/enums/enums.js';

const FileUploadValidationRule = {
  MAXIMUM_FILE_SIZE: 10_000_000,
  UPLOAD_FILE_CONTENT_TYPES: [ContentType.MP3],
  UPLOAD_FILE_EXTENSIONS: ['mp3'],
} as const;

export { FileUploadValidationRule };
