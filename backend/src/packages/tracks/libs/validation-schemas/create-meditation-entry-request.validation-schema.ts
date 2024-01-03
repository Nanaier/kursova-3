import joi from 'joi';

import { ContentType } from '~/libs/enums/enums.js';

import { TrackEntryValidationMessage } from '../enums/enums.js';
import { type TrackCreateRequestDto } from '../types/types.js';

const createTrackEntry = joi.object<TrackCreateRequestDto>({
  title: joi
    .object({
      value: joi.string().required().messages({
        'any.required': TrackEntryValidationMessage.NAME_REQUIRED,
        'string.empty': TrackEntryValidationMessage.NAME_REQUIRED,
      }),
      mimetype: joi.string().valid(ContentType.TEXT).required().messages({
        'any.only': TrackEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required()
    .messages({
      'object.base': TrackEntryValidationMessage.NAME_REQUIRED,
    }),
  file: joi
    .object({
      mimetype: joi.string().valid(ContentType.MP3).required().messages({
        'any.only': TrackEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required()
    .messages({
      'object.base': TrackEntryValidationMessage.FILE_REQUIRED,
    }),
  genreId: joi
    .object({
      value: joi.string(),
      mimetype: joi.string().valid(ContentType.TEXT).required().messages({
        'any.only': TrackEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required(),
  yearOfPublication: joi
    .object({
      value: joi.string(),
      mimetype: joi.string().valid(ContentType.TEXT).required().messages({
        'any.only': TrackEntryValidationMessage.MPEG_REQUIRED,
      }),
    })
    .unknown(true)
    .required(),
});

export { createTrackEntry };
