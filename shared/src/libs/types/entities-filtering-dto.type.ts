type EntitiesFilteringDto = {
  query: string;
  page: string;
  pageSize: string;
  genreIds: string;
  artistIds: string;
  sort: 'asc' | 'desc';
};

export { type EntitiesFilteringDto };
