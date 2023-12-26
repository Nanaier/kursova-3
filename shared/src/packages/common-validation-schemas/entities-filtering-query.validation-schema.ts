import joi from 'joi';

import { type EntitiesFilteringDto } from '../../libs/types/types.js';

const entitiesFilteringQuery = joi.object<EntitiesFilteringDto, true>({
  query: joi.string(),
  page: joi.string(),
  pageSize: joi.string(),
  genreIds: joi.string(),
  artistIds: joi.string(),
  sort: joi.string(),
});

export { entitiesFilteringQuery };
