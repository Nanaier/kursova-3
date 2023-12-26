type UserCreateQueryPayload = {
  email: string;
  username: string;
  passwordSalt: string;
  passwordHash: string;
};

export { type UserCreateQueryPayload };
