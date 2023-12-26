type UserAuthResponseDto = {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  avatarId: number | null;
};

export { type UserAuthResponseDto };
