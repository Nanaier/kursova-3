import { Autocomplete, Paper, TextField, styled } from '@mui/material';

import {
  Button,
  Input,
  InputFile,
  Modal,
} from '~/libs/components/components.js';
import {
  GenreGetAllItemResponseDto,
  TrackCreateForm,
} from 'shared/build/index.js';
import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants.js';
import { ContentType, DataStatus } from '~/libs/enums/enums.js';
import {
  forwardRef,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { type TrackCreateRequestDto } from '~/packages/tracks/tracks.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: TrackCreateRequestDto) => void;
};

const CustomPaper = (props: any) => {
  return (
    <Paper
      elevation={8}
      {...props}
      style={{
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '14px',
      }}
    />
  );
};

const Autocomplete1 = styled(Autocomplete)({
  '& .MuiAutocomplete-inputRoot': {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '14px',
    borderRadius: '10px',
    outline: 'none',
  },
}) as typeof Autocomplete;

const AddTracksModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ onSubmit }, reference) => {
  const AddTracksModalReference =
    reference as React.RefObject<HTMLDialogElement | null>;

  const [selectedGenres, setSelectedGenres] =
    useState<GenreGetAllItemResponseDto | null>(null);

  const { tracksDataStatus, genres } = useAppSelector(({ tracks, genres }) => {
    return {
      tracksDataStatus: tracks.tracksDataStatus,
      genres: genres.genres,
    };
  });

  const { control, errors, handleSubmit, reset } = useAppForm<TrackCreateForm>({
    defaultValues: {
      title: '',
      file: null,
    },
  });

  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;
  const isLoading = tracksDataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (tracksDataStatus === DataStatus.FULFILLED) {
      AddTracksModalReference.current?.close();
      reset();
    }
  }, [tracksDataStatus, reset, AddTracksModalReference]);

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ title, file }) => {
        onSubmit({
          title,
          file: file?.data as File,
          genreId: selectedGenres?.id ?? -1,
          yearOfPublication: new Date().getFullYear(),
        });
      })(event_);
    },
    [onSubmit, handleSubmit, selectedGenres],
  );
  return (
    <Modal title="Add track" ref={reference}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          control={control}
          errors={errors}
          label="Track title"
          name="title"
          placeholder="Enter track title"
        />
        <Autocomplete1
          id="genres-autocomplete"
          options={genres}
          disablePortal
          getOptionLabel={(option): string => {
            return option.genreName;
          }}
          isOptionEqualToValue={(option, value): boolean => {
            return option.genreName === value.genreName;
          }}
          onChange={(event, value) => setSelectedGenres(value)}
          placeholder="Genres"
          PaperComponent={CustomPaper}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select genres"
              variant="outlined"
              InputProps={{ ...params.InputProps }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    border: 'solid #5f636d 1px',
                    boxShadow: '0.1px 3px 3px #312f374d',
                  },
                },
              }}
            />
          )}
        />
        <InputFile
          control={control}
          errors={errors}
          name="file"
          fileTypeName="type"
          fileSizeName="size"
          label="Track audio file"
          description="Only MP3 extension is allowed"
          extensions={[ContentType.MP3]}
        />
        <Button
          type="submit"
          label="Submit"
          isLoading={isLoading}
          isDisabled={hasError}
        />
      </form>
    </Modal>
  );
};

const ForwardedAddTracksModal = forwardRef(AddTracksModal);

export { ForwardedAddTracksModal as AddTracksModal };
