import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import bannerImage from '~/assets/img/taylor.jpeg';
import bannerImage1 from '~/assets/img/taylor_1.png';
import { Button, Loader, RouterOutlet } from '~/libs/components/components.js';
import { Header } from '~/libs/components/header/header.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useMatch,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as trackActions } from '~/slices/tracks/track.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { TrackEntry } from '../tracks-page/components/track-list/components/track-entry/track-entry.js';
import styles from './styles.module.scss';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { previewTracks, tracksDataStatus } = useAppSelector(({ tracks }) => {
    return {
      previewTracks: tracks.previewTracks,
      tracksDataStatus: tracks.tracksDataStatus,
    };
  });

  useEffect(() => {
    void dispatch(trackActions.getAllTracks({ query: '' }));
    void dispatch(authActions.isUserAdmin());
  }, [dispatch]);

  const handleNavigateToTracks = useCallback(() => {
    const redirectTo = AppRoute.TRACKS;
    dispatch(appActions.navigate(redirectTo));
  }, [dispatch]);

  const isBaseRootRoute = useMatch(AppRoute.ROOT);

  return (
    <Header>
      {tracksDataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <div className={styles['body-container']}>
          <Swiper
            navigation={true}
            className={styles['mySwiper']}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            centeredSlides={true}
            style={{
              width: '100%',
            }}
          >
            <SwiperSlide>
              <div className={styles['banner-container']}>
                <img
                  src={bannerImage}
                  alt="Banner"
                  className={styles['banner']}
                />
                <div className={styles['overlay']}>
                  <p className={styles['text']}>
                    Post of the appreciation for the current person of the year
                    - Taylor Swift
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={bannerImage1}
                alt="Banner"
                className={styles['banner']}
              />
            </SwiperSlide>
          </Swiper>

          {isBaseRootRoute && (
            <div className={styles['list']}>
              {previewTracks.map((entry) => {
                return <TrackEntry track={entry} key={entry.id} />;
              })}
            </div>
          )}
          <Button
            style="primary-contrast"
            onClick={handleNavigateToTracks}
            label="See more tracks"
          />
          <RouterOutlet />
        </div>
      )}
    </Header>
  );
};

export { MainPage };
