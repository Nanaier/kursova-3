import { Button, Input, Modal } from '~/libs/components/components.js';
import {
  genreCreate as genreCreateValidationSchema,
} from 'shared/build/index.js';
import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  forwardRef,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: { genreName: string; genreDescription: string }) => void;
};

const AddGenresModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ onSubmit }, reference) => {
  const AddGenresModalReference =
    reference as React.RefObject<HTMLDialogElement | null>;

  const { genreDataStatus, genres } = useAppSelector(({ tracks, genres }) => {
    return {
      genreDataStatus: genres.genreDataStatus,
      genres: genres.genres,
    };
  });

  const { control, errors, handleSubmit, reset } = useAppForm<{
    genreName: string;
    genreDescription: string;
  }>({
    defaultValues: {
      genreName: '',
      genreDescription: '',
    },
    validationSchema: genreCreateValidationSchema,
  });

  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;
  const isLoading = genreDataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (genreDataStatus === DataStatus.FULFILLED) {
      AddGenresModalReference.current?.close();
      reset();
    }
  }, [genreDataStatus, reset, AddGenresModalReference]);

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ genreName, genreDescription }) => {
        onSubmit({
          genreName,
          genreDescription,
        });
      })(event_);
    },
    [onSubmit, handleSubmit],
  );
  return (
    <Modal title="Add genre" ref={reference}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          control={control}
          errors={errors}
          label="Track title"
          name="genreName"
          placeholder="Enter genre name"
        />
        <Input
          control={control}
          errors={errors}
          rowsCount={7}
          label="Track title"
          name="genreDescription"
          placeholder="Enter genre description"
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

const ForwardedAddTracksModal = forwardRef(AddGenresModal);

export { ForwardedAddTracksModal as AddGenresModal };
