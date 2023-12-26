import { Loader } from '~/libs/components/components.js';
import { PaginationControls } from '~/libs/components/pagination-controls/pagination-controls.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as trackActions } from '~/slices/tracks/track.js';

import { TrackEntry } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {};

const TrackList: React.FC<Properties> = ({}) => {
  const dispatch = useAppDispatch();

  const { previewTracks, currentPage, totalPages, tracksDataStatus } =
    useAppSelector(({ tracks }) => {
      return {
        previewTracks: tracks.previewTracks,
        currentPage: tracks.currentPage,
        totalPages: tracks.totalPages,
        tracksDataStatus: tracks.tracksDataStatus,
      };
    });

  const handlePageChange = (page: number): void => {
    dispatch(trackActions.setPage(page));
  };

  return tracksDataStatus === DataStatus.PENDING ? (
    <Loader />
  ) : (
    <div className={getValidClassNames(styles['container'], styles['hidden'])}>
      <div className={styles['list']}>
        {previewTracks.map((entry) => {
          return <TrackEntry track={entry} key={entry.id} />;
        })}
      </div>
      {totalPages > 1 && (
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export { TrackList };
