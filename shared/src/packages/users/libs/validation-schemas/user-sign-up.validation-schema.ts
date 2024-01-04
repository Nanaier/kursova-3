import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  password: joi
    .string()
    .trim()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
  username: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.NAME_REQUIRED,
    'string.empty': UserValidationMessage.NAME_REQUIRED,
  }),
});

export { userSignUp };
