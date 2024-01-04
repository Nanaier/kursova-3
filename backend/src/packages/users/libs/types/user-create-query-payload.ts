type UserCreateQueryPayload = {
  username: string;
  passwordSalt: string;
  passwordHash: string;
};

export { type UserCreateQueryPayload };
