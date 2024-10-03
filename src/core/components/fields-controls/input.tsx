import { cn } from '@src/core/lib/utils'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Input } from '../ui/input'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export function InputController<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
({ name, control, defaultValue, disabled, rules, label, className, ...inputProps }: Omit<ControllerProps<TFieldValues, TName>, 'render'> & InputProps) {
  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className='w-full space-y-0'>
          {label != null &&
            <FormLabel className='m-0 font-semibold'>
              {label}
            </FormLabel>}
          <FormControl>
            <Input
              className={cn('m-0', className, { 'bg-error': invalid })}
              {...inputProps}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
