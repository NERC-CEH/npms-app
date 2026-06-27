/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from 'react-hook-form';
import { Select, SelectProps } from '@flumens';

type Props = { control: any; name: string } & Omit<SelectProps, 'onChange'>;

const ControlledSelect = ({ control, name, ...props }: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { ref, ...field }, fieldState }) => (
      <Select
        {...field}
        isInvalid={fieldState.invalid}
        errorMessage={fieldState.error?.message}
        {...props}
      />
    )}
  />
);

export default ControlledSelect;
