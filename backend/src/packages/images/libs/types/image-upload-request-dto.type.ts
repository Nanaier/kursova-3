import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type ImageUploadRequestDto = {
  file: {
    buffer: Buffer;
    fileName: string;
    contentType: ValueOf<typeof ContentType>;
  };
  isBasicImage: boolean;
};

export { type ImageUploadRequestDto };
