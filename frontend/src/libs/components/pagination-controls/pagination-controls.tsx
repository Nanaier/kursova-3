import { IconColor } from '~/libs/enums/enums.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<Properties> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className={styles['paginationControls']}>
      <button
        className={styles['backward']}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage == 1}
      >
        <Icon name="back" color={IconColor.WHITE} width={30} height={20} />
      </button>

      <div className={styles['selected']}>{currentPage}</div>

      <button
        className={styles['forward']}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <Icon name="back" color={IconColor.WHITE} width={30} height={20} />
      </button>
    </div>
  );
};

export { PaginationControls };
