import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import {
  ArtistsTableColumn,
  ImagesTableColumn,
} from '~/libs/packages/database/libs/enums/enums.js';

import { ImageModel } from '../images/image.model.js';

class ArtistModel extends AbstractModel {
  public artistName!: string;

  public artistUsername!: string;

  public description!: string;

  public static override get tableName(): string {
    return DatabaseTableName.ARTISTS;
  }

  public static relationMappings(): RelationMappings {
    return {
      images: {
        relation: Model.HasOneRelation,
        modelClass: ImageModel,
        join: {
          from: `${DatabaseTableName.ARTISTS}.${ArtistsTableColumn.IMAGE_ID}`,
          to: `${DatabaseTableName.IMAGES}.${ImagesTableColumn.ID}`,
        },
      },
    };
  }
}

export { ArtistModel };
