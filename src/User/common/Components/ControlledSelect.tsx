import { Controller } from 'react-hook-form';
import { Select, SelectProps } from '@flumens';

type Props = { control: any; name: string } & Omit<SelectProps, 'onChange'>;

const ControlledSelect = ({ control, name, ...props }: Props) => (
  <Controller
    control={control}
    name={name}
    // eslint-disable-next-line unused-imports/no-unused-vars
    render={({ field: { ref, ...field }, fieldState }) => {
      return (
        <Select
          {...field}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          {...props}
        />
      );
    }}
  />
);

export default ControlledSelect;
