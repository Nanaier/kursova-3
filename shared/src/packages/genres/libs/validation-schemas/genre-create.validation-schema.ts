import joi from 'joi';

const genreCreate = joi.object<
  { genreName: string; genreDescription: string },
  true
>({
  genreName: joi.string().trim().required().messages({
    'any.required': 'Genre name is required.',
    'string.empty': 'Genre name input string should not be empty.',
  }),
  genreDescription: joi.string().trim().required().messages({
    'any.required': 'Genre description is required.',
    'string.empty': 'Genre description input string should not be empty.',
  }),
});

export { genreCreate };
