type ImageCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  isBasicImage: boolean;
  files: {
    id: number;
    url: string;
  };
};

export { type ImageCommonQueryResponse };
