import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  FilesTableColumn,
  ImagesTableColumn,
} from '~/libs/packages/database/libs/enums/enums.js';

import { FileModel } from '../files/file.model.js';

class ImageModel extends AbstractModel {
  public isBasicImage!: boolean;

  public static override get tableName(): string {
    return DatabaseTableName.IMAGES;
  }

  public static relationMappings(): RelationMappings {
    return {
      files: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: `${DatabaseTableName.IMAGES}.${ImagesTableColumn.FILE_ID}`,
          to: `${DatabaseTableName.FILES}.${FilesTableColumn.ID}`,
        },
      },
    };
  }
}

export { ImageModel };
