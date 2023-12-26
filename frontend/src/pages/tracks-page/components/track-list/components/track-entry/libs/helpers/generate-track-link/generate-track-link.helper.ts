import { AppQueryStringKey, AppRoute } from '~/libs/enums/enums.js';
import { getUrlWithQueryString } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

type Parameters = {
  timerDuration: number;
  trackId: number;
  query?: string;
  page?: number;
  pageSize?: number;
  genreIds?: string;
  artistIds?: string;
  isUserPage?: string | undefined;
};

const generateTrackLink = ({
  timerDuration,
  trackId,
  query,
  page,
  pageSize,
  genreIds,
  artistIds,
  isUserPage,
}: Parameters): string => {
  const path = AppRoute.TRACKS_$ID.replace(':id', String(trackId));
  const queryParams: Record<string, string> = {
    [AppQueryStringKey.TIMER_DURATION]: String(timerDuration),
    [AppQueryStringKey.QUERY]: String(query ?? ''),
    [AppQueryStringKey.PAGE]: String(page ?? ''),
    [AppQueryStringKey.PAGE_SIZE]: String(pageSize ?? ''),
    [AppQueryStringKey.GENRE_IDS]: String(genreIds ?? ''),
    [AppQueryStringKey.ARTIST_IDS]: String(artistIds ?? ''),
  };
  if (isUserPage !== undefined) {
    queryParams[AppQueryStringKey.IS_USER_PAGE] = String(isUserPage);
  }
  return getUrlWithQueryString(path as ValueOf<typeof AppRoute>, queryParams);
};

export { generateTrackLink };
