import avatar from '~/assets/img/avatar-placeholder.png';
import logo from '~/assets/img/logo.svg';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

type Properties = {
  children: React.ReactNode;
};

const Header: React.FC<Properties> = ({ children }): JSX.Element => {
  return (
    <div>
      <header className={styles['header']}>
        <a className={styles['logo']} href="/">
          <picture className={styles['logo']}>
            <img
              src={logo}
              alt="SoundVault logo"
              height={'35px'}
              width={'35px'}
            />
          </picture>
          SoundVault
        </a>

        <Link to={AppRoute.USER}>
          <img src={avatar} alt="Avatar" className={styles['avatar']} />
        </Link>
      </header>
      <div className={styles['body']}>{children}</div>
    </div>
  );
};

export { Header };
