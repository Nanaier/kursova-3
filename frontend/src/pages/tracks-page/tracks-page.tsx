import { Button, RouterOutlet, Search } from '~/libs/components/components.js';
import { Header } from '~/libs/components/header/header.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useRef,
  useSearch,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as genreActions } from '~/slices/genres/genre.js';
import { actions as artistsActions } from '~/slices/artists/artists.js';
import { actions as trackActions } from '~/slices/tracks/track.js';

import { TrackList } from './components/track-list/track-list.js';
import styles from './styles.module.scss';
import { AutocompleteElement } from '~/libs/components/autocomplete/autocomplete.js';
import {
  ArtistGetAllItemResponseDto,
  GenreGetAllItemResponseDto,
  TrackCreateRequestDto,
} from 'shared/build/index.js';
import { IconColor } from '~/libs/enums/icon-color.enum.js';
import { AddTracksModal } from './components/add-tracks-modal/add-tracks-modal.js';
import { useAutocomplete } from '~/libs/components/autocomplete/use-autocomplete.js';
import { AddGenresModal } from '../personal-genre-page/components/add-genres-modal/add-genres-modal.js';

const TracksPage: React.FC = () => {
  // const [selectedGenreValues, setSelectedGenreValues] = useState<
  //   GenreGetAllItemResponseDto[]
  // >([]);

  // const [selectedArtistValues, setSelectedArtistValues] = useState<
  //   ArtistGetAllItemResponseDto[]
  // >([]);

  // const handleAutocompleteGenreChange = (values: any) => {
  //   setSelectedGenreValues(values);
  // };

  // const handleAutocompleteArtistChange = (values: any) => {
  //   setSelectedArtistValues(values);
  // };

  const [isAsc, setIsAsc] = useState(false);

  const handleButtonClick = () => {
    setIsAsc((prevIsMirrored) => !prevIsMirrored);
  };

  const dispatch = useAppDispatch();

  const dialogReference = useRef<HTMLDialogElement>(null);
  const genreDialogReference = useRef<HTMLDialogElement>(null);

  const handleOpen = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);

  const handleSubmit = useCallback(
    (payload: TrackCreateRequestDto) => {
      dispatch(trackActions.createTrack(payload)).then(() => {
        return dispatch(trackActions.setPage(1));
      });
    },
    [dispatch],
  );

  const { isAdmin, tracks, genres, artists, currentPage, itemsPerPage } =
    useAppSelector(({ genres, artists, tracks, auth }) => {
      return {
        isAdmin: auth.isAdmin,
        tracks: tracks.tracks,
        genres: genres.genres,
        artists: artists.artists,
        currentPage: tracks.currentPage,
        itemsPerPage: tracks.itemsPerPage,
      };
    });

  const handleOpenGenre = useCallback(() => {
    genreDialogReference.current?.showModal();
  }, [genreDialogReference]);

  const handleSubmitGenre = useCallback(
    (payload: { genreName: string; genreDescription: string }) => {
      if (isAdmin) {
        dispatch(genreActions.createGenre(payload)).then(() => {
          return dispatch(genreActions.getAllGenres());
        });
      }
    },
    [dispatch, isAdmin],
  );

  const {
    selectedValues: selectedGenreValues,
    AutocompleteProps: genreAutocompleteProps,
    queryParameter: genreIds,
  } = useAutocomplete<ArtistGetAllItemResponseDto | GenreGetAllItemResponseDto>(
    genres,
    'Genres',
    'genreIds',
  );

  const {
    selectedValues: selectedArtistValues,
    AutocompleteProps: artistAutocompleteProps,
    queryParameter: artistIds,
  } = useAutocomplete<ArtistGetAllItemResponseDto | GenreGetAllItemResponseDto>(
    artists,
    'Artists',
    'artistIds',
  );

  const { setFilter, filter } = useSearch();

  useEffect(() => {
    void dispatch(artistsActions.getAllArtists());
    void dispatch(genreActions.getAllGenres());
    void dispatch(
      trackActions.getAllTracks({
        query: filter,
        page: currentPage,
        pageSize: itemsPerPage,
        genreIds: genreIds,
        artistIds: artistIds,
        sort: isAsc ? 'asc' : 'desc',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    void dispatch(
      trackActions.getAllTracks({
        query: filter,
        page: currentPage,
        pageSize: itemsPerPage,
        genreIds: genreIds,
        artistIds: artistIds,
        sort: isAsc ? 'asc' : 'desc',
      }),
    );
  }, [
    filter,
    selectedArtistValues,
    selectedGenreValues,
    isAsc,
    currentPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (tracks.length === 0) {
      void dispatch(trackActions.setPage(1));
    }
  }, [tracks]);

  return (
    <Header>
      <div className={styles['body-container']}>
        <div className={styles['container-title']}>
          <p className={styles['page-title']}>Tracks</p>
          <div className={styles['container-buttons']}>
            {isAdmin && (
              <div className={styles['container-button']}>
                <Button
                  label="Create genre"
                  styleColor="orange"
                  style="primary"
                  onClick={handleOpenGenre}
                />
              </div>
            )}
            <div className={styles['container-button']}>
              <Button
                label="Create track"
                styleColor="orange"
                style="primary"
                onClick={handleOpen}
              />
            </div>
          </div>
        </div>
        <div className={styles['container']}>
          <div className={styles['search']}>
            <AutocompleteElement
              // data={genres}
              // label="Genres"
              // handleChange={handleAutocompleteGenreChange}
              {...genreAutocompleteProps}
              defaultValue={selectedGenreValues}
            />
            <Search onValueChange={setFilter} defaultValue={filter} />
            <AutocompleteElement
              // data={artists}
              // label="Artists"
              // handleChange={handleAutocompleteArtistChange}
              {...artistAutocompleteProps}
              defaultValue={selectedArtistValues}
            />
          </div>
          <Button
            style="icon-standard"
            onClick={handleButtonClick}
            label="Sort"
            isLabelVisuallyHidden
            iconName="sort"
            iconColor={IconColor.WHITE}
            iconHeight={30}
            iconWidth={30}
            isMirrored={isAsc}
          />
        </div>
        <TrackList />
        <RouterOutlet />

        <AddTracksModal ref={dialogReference} onSubmit={handleSubmit} />
        <AddGenresModal
          ref={genreDialogReference}
          onSubmit={handleSubmitGenre}
        />
      </div>
    </Header>
  );
};

export { TracksPage };
