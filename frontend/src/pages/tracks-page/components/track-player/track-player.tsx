import {
  AudioPlayer,
  BackButtonWrapper,
  Button,
  Link,
  Loader,
} from '~/libs/components/components.js';
import { Header } from '~/libs/components/header/header.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
  useParams,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as tracksActions } from '~/slices/tracks/track.js';

import { TRACK_NOT_FOUND_INDEX } from './libs/constants/constants.js';
import styles from './styles.module.scss';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { TrackGetAllItemResponseDto, ValueOf } from 'shared/build/index.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { generateTrackLink } from '../track-list/components/track-entry/libs/helpers/helpers.js';
import { IconColor } from '~/libs/enums/icon-color.enum.js';

const TrackPlayer: React.FC = () => {
  const { id: trackId } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const [trackIndex, setTrackIndex] = useState(-1);

  function parseQueryString(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const parsedParams: Record<string, string> = {};
    params.forEach((value, key) => {
      parsedParams[key] = value;
    });

    return parsedParams;
  }

  const { tracks, isLiked, tracksDataStatus, currentPage, itemsPerPage } =
    useAppSelector(({ tracks }) => {
      return {
        tracks: tracks.tracks,
        tracksDataStatus: tracks.tracksDataStatus,
        isLiked: tracks.isLiked,
        currentPage: tracks.currentPage,
        itemsPerPage: tracks.itemsPerPage,
      };
    });

  useEffect(() => {
    const queries = parseQueryString(location.search);
    if (!queries['isUserPage']) {
      if (queries['page'] && queries['pageSize']) {
        void dispatch(
          tracksActions.getAllTracks({
            query: (queries['query'] as string) ?? '',
            page: parseInt(queries['page'], 10) ?? -1,
            pageSize: parseInt(queries['pageSize'], 10) ?? 9,
            genreIds: queries['genreIds'] ?? '',
            artistIds: queries['artistIds'] ?? '',
          }),
        );
      }
    } else {
      dispatch(tracksActions.getLatestLiked()).then(() => {
        void dispatch(tracksActions.getLatestUploaded());
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const track = tracks.find((entry) => {
      return entry.id === Number(trackId);
    });
    setTrackIndex(track ? tracks.indexOf(track) : TRACK_NOT_FOUND_INDEX);
    if (track?.id)
      void dispatch(
        tracksActions.isLikedTrack({
          trackId: track.id,
        }),
      );
  }, [tracks, trackId]);

  const handleTrackIndex = useCallback(
    (index: number): void => {
      const queries = parseQueryString(location.search);
      setTrackIndex(index);
      const redirectTo = generateTrackLink({
        timerDuration: 0,
        query: (queries['query'] as string) ?? '',
        trackId: tracks[index]?.id as number,
        page: Number(queries['page'] as string) ?? currentPage,
        pageSize: Number(queries['pageSize'] as string) ?? itemsPerPage,
        genreIds: queries['genreIds'] ?? '',
        artistIds: queries['artistIds'] ?? '',
        isUserPage: queries['isUserPage'] ?? undefined,
      });

      dispatch(appActions.navigate(redirectTo));
      if (tracks[index]?.id)
        dispatch(
          tracksActions.isLikedTrack({
            trackId: (tracks[index] as TrackGetAllItemResponseDto).id,
          }),
        );
    },
    [dispatch, tracks],
  );

  const handleBackButtonPress = useCallback(() => {
    navigate(-1);
  }, [navigate, tracks]);

  const handleButtonClick = () => {
    if (tracks[trackIndex]?.id)
      dispatch(
        tracksActions.toggleTrack({
          trackId: tracks[trackIndex]?.id as number,
        }),
      );
  };

  const { title, artistName, fileUrl, imageUrl, artistId, genreName, genreId } =
    tracks[trackIndex] ?? {};

  return trackIndex === -1 ? (
    <Loader />
  ) : (
    <Header>
      <div className={styles['wrapper']}>
        <BackButtonWrapper onGoBack={handleBackButtonPress} isVisible />
        <div className={styles['track-player']}>
          <div className={styles['image-wrapper']}>
            <img
              className={styles['image']}
              src={imageUrl}
              alt="Track"
              width={355}
              height={355}
              loading="lazy"
            />
          </div>
          <div className={styles['container']}>
            <p className={styles['title']}>{title}</p>
            <Button
              style="rounded-transparent"
              onClick={handleButtonClick}
              label="Sort"
              isLabelVisuallyHidden
              iconName="heart"
              iconColor={isLiked ? IconColor.ORANGE : IconColor.WHITE}
              iconHeight={30}
              iconWidth={30}
            />
          </div>

          <div className={styles['container']}>
            <div>
              <Link
                to={
                  AppRoute.ARTISTS_$ID.replace(
                    ':id',
                    String(artistId),
                  ) as ValueOf<typeof AppRoute>
                }
                state={{ currentPage }}
              >
                <p className={styles['artistName']}>{artistName}</p>
              </Link>
            </div>
            <p className={styles['artistName']}>{' - '}</p>
            <div>
              <Link
                to={
                  AppRoute.GENRES_$ID.replace(
                    ':id',
                    String(genreId),
                  ) as ValueOf<typeof AppRoute>
                }
                state={{ currentPage }}
              >
                <p className={styles['artistName']}>{genreName}</p>
              </Link>
            </div>
          </div>
          {tracksDataStatus === DataStatus.PENDING && <Loader />}
          <AudioPlayer
            mediaUrl={fileUrl as string}
            timerDuration={null}
            trackIndex={trackIndex}
            onSetTrackIndex={handleTrackIndex}
            tracksCount={tracks.length}
          />
        </div>
      </div>
    </Header>
  );
};

export { TrackPlayer };
