import { Model, type RelationMappings } from 'objection';

import { type ContentType } from '~/libs/enums/enums.js';
import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  FilesTableColumn,
  ImagesTableColumn,
} from '~/libs/packages/database/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { ImageModel } from '../images/image.model.js';

class FileModel extends AbstractModel {
  public url!: string;

  public contentType!: ValueOf<typeof ContentType>;

  public static override get tableName(): string {
    return DatabaseTableName.FILES;
  }

  public static relationMappings(): RelationMappings {
    return {
      files: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DatabaseTableName.FILES}.${FilesTableColumn.ID}`,
          to: `${DatabaseTableName.IMAGES}.${ImagesTableColumn.FILE_ID}`,
        },
      },
    };
  }
}

export { FileModel };
