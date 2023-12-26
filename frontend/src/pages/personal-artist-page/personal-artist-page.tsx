import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
  useParams,
} from '~/libs/hooks/hooks.js';
import { actions as artistsActions } from '~/slices/artists/artists.js';
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

const PersonalArtistPage: React.FC = () => {
  const { id: artistId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    artist,
    currentPage,
    itemsPerPage,
    artistDataStatus,
    tracksDataStatus,
  } = useAppSelector(({ artists, tracks }) => {
    return {
      artist: artists.artist,
      artistDataStatus: artists.artistDataStatus,
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
        artistIds: artistId as string,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    void dispatch(artistsActions.getArtistById({ id: artistId as string }));
    void dispatch(
      trackActions.getAllTracks({
        query: '',
        page: currentPage,
        pageSize: itemsPerPage,
        genreIds: '',
        artistIds: artistId as string,
        sort: 'desc',
      }),
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    void dispatch(trackActions.setPage(1));
  }, [artistId]);

  return (
    <Header>
      {tracksDataStatus === DataStatus.PENDING ||
      artistDataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <div>
          <BackButtonWrapper onGoBack={handleBackButtonPress} isVisible />
          <div className={styles['body-container']}>
            <div className={styles['artist']}>
              <div className={styles['image-wrapper']}>
                <img
                  className={styles['image']}
                  src={artist?.imageUrl}
                  alt="Track"
                  width={355}
                  height={355}
                />
              </div>
              <div className={styles['info']}>
                <p className={styles['title']}>{artist?.artistName}</p>
                <p className={styles['description']}>{artist?.description}</p>
              </div>
            </div>
            <p className={styles['title']}>Music by {artist?.artistName}: </p>
            <TrackList />
          </div>
        </div>
      )}
    </Header>
  );
};

export { PersonalArtistPage };
