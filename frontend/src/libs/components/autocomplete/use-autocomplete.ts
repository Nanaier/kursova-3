import { ChangeEvent } from 'react';
import { useSearchParams, useState, useEffect } from '~/libs/hooks/hooks.js';

const useAutocomplete = <T>(
  initialData: T[],
  label: string,
  queryParamName: string,
) => {
  const [selectedValues, setSelectedValues] = useState<T[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParameter = searchParams.get(queryParamName) ?? '';

  const handleChange = (event: ChangeEvent<{}> | null, values: T[]) => {
    setSelectedValues(values);

    const ids = values.map((value) => (value as any).id);
    setSearchParams(
      (previous) => {
        previous.set(queryParamName, ids.join(','));

        return previous;
      },
      { replace: true },
    );
  };

  const AutocompleteProps = {
    data: initialData,
    label,
    handleChange,
    value: selectedValues,
  };

  useEffect(() => {
    if (queryParameter) {
      const defaultValues: T[] = queryParameter.split(',').map((id) => {
        return (
          initialData.find((item) => (item as any).id === parseInt(id, 10)) ??
          []
        );
      }) as T[];
      setSelectedValues(defaultValues);
    }
  }, [queryParameter, initialData]);

  return { selectedValues, AutocompleteProps, queryParameter };
};

export { useAutocomplete };
