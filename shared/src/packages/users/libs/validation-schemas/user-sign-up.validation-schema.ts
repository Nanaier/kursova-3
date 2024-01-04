import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  password: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.PASSWORD_REQUIRED,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
  }),
  username: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.NAME_REQUIRED,
    'string.empty': UserValidationMessage.NAME_REQUIRED,
  }),
});

export { userSignUp };
