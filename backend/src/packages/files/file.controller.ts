import { APIPath } from '~/libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '~/libs/packages/controller/controller.js';
import { HTTPCode } from '~/libs/packages/http/http.js';
import { type Logger } from '~/libs/packages/logger/logger.js';

import { type FileService } from './file.service.js';
import { FilesApiPath } from './libs/enums/enums.js';
import { type FileUploadRequestDto } from './libs/types/types.js';

class FileController extends BaseController {
  private fileService: FileService;

  public constructor(logger: Logger, fileService: FileService) {
    super(logger, APIPath.FILES);

    this.fileService = fileService;

    this.addRoute({
      path: FilesApiPath.UPLOAD,
      method: 'POST',
      handler: (options) => {
        return this.upload(
          options as APIHandlerOptions<{
            fileBuffer: FileUploadRequestDto;
          }>,
        );
      },
    });
  }

  private async upload(
    options: APIHandlerOptions<{
      fileBuffer: FileUploadRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.fileService.create(options.fileBuffer),
    };
  }
}

export { FileController };
