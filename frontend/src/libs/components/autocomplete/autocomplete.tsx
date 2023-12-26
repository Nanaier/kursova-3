import { Autocomplete, Chip, TextField, styled, Paper } from '@mui/material';
import { ChangeEvent } from 'react';
import {
  GenreGetAllItemResponseDto,
  ArtistGetAllItemResponseDto,
} from 'shared/build/index.js';

type Properties<T> = {
  data: T[];
  label: string;
  handleChange: (event: ChangeEvent<{}> | null, values: T[]) => void;
  defaultValue: T[];
};

const CustomPaper = (props: any) => {
  return (
    <Paper
      elevation={8}
      {...props}
      style={{
        backgroundColor: '#302e36',
        color: 'white',
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '14px',
      }}
    />
  );
};

const Autocomplete1 = styled(Autocomplete)({
  '& .MuiAutocomplete-clearIndicator': {
    color: 'white',
    padding: '2px',
    border: 'none',
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: 'white',
    padding: '2px',
    border: 'none',
  },
  '& .MuiAutocomplete-inputRoot': {
    backgroundColor: '#302e36',
    color: 'white',
    border: 'none',
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '14px',
    borderRadius: '12px',
    outline: 'none',
  },
}) as typeof Autocomplete;

const getField = (option: any) => {
  if ('genreName' in option) {
    return option.genreName || '';
  } else if ('artistName' in option) {
    return option.artistName || '';
  }
};

const AutocompleteElement: React.FC<
  Properties<GenreGetAllItemResponseDto | ArtistGetAllItemResponseDto>
> = ({ data, label, handleChange, defaultValue }) => {
  return (
    <Autocomplete1
      multiple
      id="tags-standard"
      options={data}
      value={defaultValue.length === 0 ? [] : defaultValue}
      getOptionLabel={(option): string => {
        return getField(option) ? getField(option) : '';
      }}
      isOptionEqualToValue={(option, value): boolean => {
        return getField(option) === getField(value);
      }}
      onChange={(event, value) => {
        if (value !== null) handleChange(event, value);
      }}
      renderTags={(value, getTagProps) =>
        value.map(
          (
            option: GenreGetAllItemResponseDto | ArtistGetAllItemResponseDto,
            index: number,
          ) => (
            <Chip
              label={getField(option)}
              {...getTagProps({ index })}
              style={{
                backgroundColor: 'white',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: '14px',
              }}
            />
          ),
        )
      }
      PaperComponent={CustomPaper}
      renderInput={(params): JSX.Element => {
        return (
          <TextField
            {...params}
            variant="standard"
            className="input-search"
            placeholder={label}
            style={{
              backgroundColor: '#302e36',
              minHeight: '42px',
              padding: '10px 20px',
              color: 'white',
              border: 'none',
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              outline: 'none',
            }}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
          />
        );
      }}
    />
  );
};

export { AutocompleteElement };
