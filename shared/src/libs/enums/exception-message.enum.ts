const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  EMAIL_ALREADY_EXISTS: 'User with this email already exists.',
  USER_WAS_DELETED: 'User was deleted.',
  FILE_UPLOAD_FAILED: 'File upload failed.',
  ARTIST_ALREADY_EXISTS: 'Artist with this name already exists.',
  GENRE_ALREADY_EXISTS: 'Genre with this name already exists.',
  NO_IMAGE_FOUND: 'No image was found.',
  NO_GENRE_FOUND: 'No genre was found.',
  NO_USER_PERMISSION: 'User doesn`t have a permission to perform the action.',
  USERNAME_ALREADY_EXISTS: 'User with this username already exists.',
  NO_TRACK_FOUND: 'No track was found.',
  NO_FILE_FOUND: 'No file was found.',
} as const;

export { ExceptionMessage };
