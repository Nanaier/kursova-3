import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  GenresTableColumn,
  ImagesTableColumn,
} from '~/libs/packages/database/libs/enums/enums.js';

import { ImageModel } from '../images/images.js';

class GenreModel extends AbstractModel {
  public genreName!: string;
  
  public genreDescription!: string;

  public static override get tableName(): string {
    return DatabaseTableName.GENRES;
  }

  public static relationMappings(): RelationMappings {
    return {
      images: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DatabaseTableName.GENRES}.${GenresTableColumn.IMAGE_ID}`,
          to: `${DatabaseTableName.IMAGES}.${ImagesTableColumn.ID}`,
        },
      },
    };
  }
}

export { GenreModel };
