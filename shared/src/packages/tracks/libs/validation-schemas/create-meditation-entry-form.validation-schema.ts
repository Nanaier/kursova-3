import joi from 'joi';

import { ContentType } from '~/libs/enums/enums.js';
import {
  FileUploadValidationMessage,
  FileUploadValidationRule,
} from '~/packages/files/files.js';

import { MeditationEntryValidationMessage } from '../enums/enums.js';
import { type TrackCreateForm } from '../types/types.js';

const createMeditationEntryForm = joi.object<TrackCreateForm, true>({
  title: joi.string().trim().required().messages({
    'any.required': MeditationEntryValidationMessage.NAME_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.NAME_REQUIRED,
  }),
  file: joi
    .object({
      type: joi.string().valid(ContentType.MP3).required().messages({
        'any.only': MeditationEntryValidationMessage.MPEG_REQUIRED,
      }),
      size: joi
        .number()
        .max(FileUploadValidationRule.MAXIMUM_FILE_SIZE)
        .required()
        .messages({
          'number.max': FileUploadValidationMessage.FILE_TOO_LARGE,
        }),
    })
    .required()
    .unknown(true)
    .messages({
      'object.base': MeditationEntryValidationMessage.FILE_REQUIRED,
    }),
  genreId: joi.number().required().messages({
    'any.required': MeditationEntryValidationMessage.NAME_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.NAME_REQUIRED,
  }),
  yearOfPublication: joi.number().required().messages({
    'any.required': MeditationEntryValidationMessage.NAME_REQUIRED,
    'string.empty': MeditationEntryValidationMessage.NAME_REQUIRED,
  }),
});

export { createMeditationEntryForm };
