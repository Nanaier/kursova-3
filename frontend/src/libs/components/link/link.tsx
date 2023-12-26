import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: React.ReactNode;
  state?: any;
};

const Link: React.FC<Properties> = ({ children, to, state }) => {
  return (
    <NavLink className={styles['link'] as string} to={to} state={state}>
      {children}
    </NavLink>
  );
};

export { Link };
