type UserCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  username: string;
  details?: {
    avatarId: number | null;
  };
};

export { type UserCommonQueryResponse };
