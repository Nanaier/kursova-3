import { Button, Modal } from '~/libs/components/components.js';
import { AppRoute, IconColor } from '~/libs/enums/enums.js';
import { getFormattedTime } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type TrackCreateResponseDto } from '~/packages/tracks/tracks.js';
import { actions as appActions } from '~/slices/app/app.slice.js';
import { actions as trackActions } from '~/slices/tracks/track.js';

import { generateTrackLink } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  track: TrackCreateResponseDto;
};

function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const parsedParams: Record<string, string> = {};
  params.forEach((value, key) => {
    parsedParams[key] = value;
  });

  return parsedParams;
}

const TrackEntry: React.FC<Properties> = ({ track }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const { isAdmin, currentPage, itemsPerPage } = useAppSelector(
    ({ auth, tracks }) => {
      return {
        isAdmin: auth.isAdmin,
        currentPage: tracks.currentPage,
        itemsPerPage: tracks.itemsPerPage,
      };
    },
  );

  useEffect(() => {
    const audio = new Audio(track.fileUrl);
    audio.preload = 'metadata';

    const onMetadataLoaded = (): void => {
      setAudioDuration(audio.duration);
    };

    audio.addEventListener('loadedmetadata', onMetadataLoaded);

    return () => {
      audio.removeEventListener('loadedmetadata', onMetadataLoaded);
    };
  }, [track.fileUrl]);

  const handleStartSessionCalc = useCallback(
    (timerDuration: number) => {
      const pathParts = location.pathname.split('/');
      const genresIndex = pathParts.indexOf('genres');
      const artistsIndex = pathParts.indexOf('artists');
      const queries = parseQueryString(location.search);
      if (!location.pathname.includes('user')) {
        const redirectTo = generateTrackLink({
          timerDuration,
          trackId: track.id,
          query: queries['query'] ?? '',
          page: currentPage,
          pageSize: itemsPerPage,
          genreIds:
            queries['genreIds'] ??
            (location.pathname.includes('genres')
              ? (pathParts[genresIndex + 1] as string)
              : ''),
          artistIds:
            queries['artistIds'] ??
            (location.pathname.includes('artists')
              ? (pathParts[artistsIndex + 1] as string)
              : ''),
        });
        dispatch(appActions.navigate(redirectTo));
      } else {
        dispatch(
          appActions.navigate(
            generateTrackLink({
              timerDuration,
              trackId: track.id,
              isUserPage: '1',
            }),
          ),
        );
      }
    },
    [track.id, dispatch],
  );

  const modalReference = useRef<HTMLDialogElement>(null);

  const handleShow = useCallback((): void => {
    if (!modalReference.current?.open && isAdmin) {
      modalReference.current?.showModal();
    }
  }, [modalReference, isAdmin]);

  const handleStartSession = useCallback(() => {
    handleStartSessionCalc(audioDuration ?? Number(''));
  }, [handleStartSessionCalc, audioDuration]);

  const isTracksPage = location.pathname === AppRoute.TRACKS;

  const handleDeleteTrack = useCallback(() => {
    if (isAdmin && isTracksPage) {
      dispatch(trackActions.deleteTrack({ track }))
        .then(() => {
          const queries = parseQueryString(location.search);
          return dispatch(
            trackActions.getAllTracks({
              query: queries['query'] ?? '',
              page: queries['page']
                ? parseInt(queries['page'], 10)
                : currentPage,
              pageSize: queries['pageSize']
                ? parseInt(queries['pageSize'], 10)
                : itemsPerPage,
              genreIds: queries['genreIds'] ?? '',
              artistIds: queries['artistIds'] ?? '',
            }),
          );
        })
        .catch((error) => {
          console.error('Error deleting track:', error);
        });
    }
  }, [
    dispatch,
    isAdmin,
    isTracksPage,
    location.search,
    trackActions.deleteTrack,
  ]);

  return (
    <div className={styles['track']}>
      <img
        src={track.imageUrl}
        alt="Track entry"
        className={styles['background-image']}
        loading="lazy"
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{track.title}</h1>
          <h1 className={styles['artistName']}>{track.artistName}</h1>
          <span className={styles['duration']}>
            {audioDuration
              ? `${getFormattedTime(audioDuration, false)} min`
              : 'Loading...'}
          </span>
        </div>
        <Button
          style="play-button"
          onClick={handleStartSession}
          label="Play track"
          isLabelVisuallyHidden
          iconName="play"
          iconColor={IconColor.BLACK}
        />

        {isAdmin && isTracksPage && (
          <Button
            style="rounded-transparent"
            onClick={handleShow}
            label="Delete track"
            isLabelVisuallyHidden
            iconName="close"
            iconWidth={25}
            iconHeight={25}
            iconColor={IconColor.BLACK}
          />
        )}
        <Modal ref={modalReference} title={'Track deletion'}>
          <span>Are you sure you want to delete the track?</span>
          <Button onClick={handleDeleteTrack} label="Delete track" />
        </Modal>
      </div>
    </div>
  );
};

export { TrackEntry };
