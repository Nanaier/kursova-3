import { Loader, RouterOutlet } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { actions as tracksAction } from '~/slices/tracks/track.js';

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus, redirectTo } = useAppSelector(
    ({ auth, app }) => {
      return {
        authenticatedUser: auth.authenticatedUser,
        authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
        redirectTo: app.redirectTo,
      };
    },
  );

  useEffect(() => {
    dispatch(authActions.getAuthenticatedUser()).then(() => {
      dispatch(authActions.isUserAdmin());
    });
    // void dispatch(tracksAction.getAllTracks({ query: '', pageSize: -1 }));
  }, [dispatch]);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      dispatch(appActions.navigate(null));
    }
  }, [dispatch, navigate, redirectTo]);

  if (
    authenticatedUserDataStatus === DataStatus.PENDING ||
    authenticatedUserDataStatus === DataStatus.IDLE
  ) {
    return <Loader isOverflow />;
  }

  return <RouterOutlet />;
};

export { App };
