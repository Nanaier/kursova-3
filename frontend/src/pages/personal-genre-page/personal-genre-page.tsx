import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
  useParams,
} from '~/libs/hooks/hooks.js';
import { actions as genresActions } from '~/slices/genres/genre.js';
import { actions as trackActions } from '~/slices/tracks/track.js';
import { TrackList } from '../tracks-page/components/track-list/track-list.js';
import { Header } from '~/libs/components/header/header.js';

import styles from './styles.module.scss';
import { BackButtonWrapper } from '~/libs/components/back-button/back-button-wrapper.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { Loader } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const parsedParams: Record<string, string> = {};
  params.forEach((value, key) => {
    parsedParams[key] = value;
  });

  return parsedParams;
}

const PersonalGenrePage: React.FC = () => {
  const { id: genreId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    genre,
    currentPage,
    itemsPerPage,
    genreDataStatus,
    tracksDataStatus,
    tracks,
  } = useAppSelector(({ genres, tracks }) => {
    return {
      tracks: tracks.tracks,
      genre: genres.genre,
      genreDataStatus: genres.genreDataStatus,
      tracksDataStatus: tracks.tracksDataStatus,
      currentPage: tracks.currentPage,
      itemsPerPage: tracks.itemsPerPage,
    };
  });

  const handleBackButtonPress = useCallback(() => {
    const queries = parseQueryString(location.search);
    if (location.state && location.state.currentPage) {
      void dispatch(
        trackActions.getAllTracks({
          query: queries['query'] ?? '',
          page: location.state.currentPage ?? 1,
          pageSize: queries['pageSize']
            ? parseInt(queries['pageSize'], 10)
            : itemsPerPage,
          genreIds: queries['genreIds'] ?? '',
          artistIds: queries['artistIds'] ?? '',
        }),
      );
      void dispatch(trackActions.setPage(location.state.currentPage ?? 1));
      navigate(-1);
    } else {
      navigate(AppRoute.TRACKS);
    }
  }, [navigate]);

  useEffect(() => {
    void dispatch(
      trackActions.getAllTracks({
        query: '',
        genreIds: genreId as string,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    void dispatch(genresActions.getGenreById({ id: genreId as string }));
    void dispatch(
      trackActions.getAllTracks({
        query: '',
        page: currentPage,
        pageSize: itemsPerPage,
        genreIds: genreId as string,
        artistIds: '',
        sort: 'desc',
      }),
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    void dispatch(trackActions.setPage(1));
  }, [genreId]);

  return (
    <Header>
      {tracksDataStatus === DataStatus.PENDING ||
      genreDataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <div>
          <BackButtonWrapper onGoBack={handleBackButtonPress} isVisible />
          <div className={styles['body-container']}>
            <div className={styles['artist']}>
              <div className={styles['image-wrapper']}>
                <img
                  className={styles['image']}
                  src={genre?.imageUrl}
                  alt="Track"
                  width={355}
                  height={355}
                />
              </div>
              <div className={styles['info']}>
                <p className={styles['title']}>{genre?.genreName}</p>
                <p className={styles['description']}>
                  {genre?.genreDescription}
                </p>
              </div>
            </div>
            <p className={styles['title']}>
              Music in {genre?.genreName} genre:{' '}
            </p>
            <TrackList />
          </div>
        </div>
      )}
    </Header>
  );
};

export { PersonalGenrePage };
