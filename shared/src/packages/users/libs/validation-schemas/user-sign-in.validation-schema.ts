import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  username: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.NAME_REQUIRED,
    'string.empty': UserValidationMessage.NAME_REQUIRED,
  }),
  password: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.PASSWORD_REQUIRED,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
  }),
});

export { userSignIn };
