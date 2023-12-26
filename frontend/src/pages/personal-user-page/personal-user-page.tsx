import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import avatar from '~/assets/img/avatar-placeholder.png';
import { actions as trackActions } from '~/slices/tracks/track.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { Header } from '~/libs/components/header/header.js';

import styles from './styles.module.scss';
import { BackButtonWrapper } from '~/libs/components/back-button/back-button-wrapper.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { Button, Icon, Loader } from '~/libs/components/components.js';
import { TrackEntry } from '../tracks-page/components/track-list/components/track-entry/track-entry.js';
import { IconColor } from '~/libs/enums/icon-color.enum.js';

const PersonalUserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    user,
    isAdmin,
    latestLikedDataStatus,
    latestUploadedDataStatus,
    latestLiked,
    latestUploaded,
    currentPage,
  } = useAppSelector(({ tracks, auth }) => {
    return {
      user: auth.authenticatedUser,
      isAdmin: auth.isAdmin,
      latestLikedDataStatus: tracks.latestLikedDataStatus,
      latestUploadedDataStatus: tracks.latestUploadedDataStatus,
      latestLiked: tracks.latestLiked,
      latestUploaded: tracks.latestUploaded,
      currentPage: tracks.currentPage,
    };
  });

  const handleSignOut = useCallback(() => {
    void dispatch(authActions.signOut());
  }, [dispatch]);

  const handleBackButtonPress = useCallback(() => {
    navigate(-1);
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(trackActions.getLatestLiked()).then(() => {
      void dispatch(trackActions.getLatestUploaded());
    });
    void dispatch(authActions.isUserAdmin());
  }, [dispatch]);

  return (
    <Header>
      {latestLikedDataStatus === DataStatus.PENDING ||
      latestUploadedDataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <div>
          <BackButtonWrapper onGoBack={handleBackButtonPress} isVisible />
          <div className={styles['body-container']}>
            <div className={styles['artist']}>
              <div className={styles['image-wrapper']}>
                <img
                  className={styles['image']}
                  src={avatar}
                  alt="Avatar"
                  width={355}
                  height={355}
                />
              </div>
              <div className={styles['info']}>
                <div className={styles['username-container']}>
                  <p className={styles['title']}>{user?.username}</p>
                  {isAdmin && (
                    <Icon
                      name="crown"
                      color={IconColor.GOLDEN}
                      width={30}
                      height={30}
                    />
                  )}
                </div>

                <p className={styles['description']}>{user?.email}</p>

                <Button
                  label="Sign Out"
                  style="primary"
                  onClick={handleSignOut}
                />
              </div>
            </div>
            {latestLiked.length > 0 ? (
              <>
                <p className={styles['title']}>Latest liked tracks: </p>
                <div className={styles['container']}>
                  <div className={styles['list']}>
                    {latestLiked.map((entry) => {
                      return <TrackEntry track={entry} key={entry.id} />;
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className={styles['title']}>No tracks were liked yet.</p>
            )}

            {latestUploaded.length > 0 ? (
              <>
                <p className={styles['title']}>Latest uploaded tracks: </p>
                <div className={styles['container']}>
                  <div className={styles['list']}>
                    {latestUploaded.map((entry) => {
                      return <TrackEntry track={entry} key={entry.id} />;
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className={styles['title']}>No tracks were uploaded yet.</p>
            )}
          </div>
        </div>
      )}
    </Header>
  );
};

export { PersonalUserPage };
